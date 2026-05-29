import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DownArrowIcon } from "../../../assets/icons";
import profileimg from "../../../assets/img/profileless.png";
import Header from "../../../components/Header/Header";
import Loader from "../../../components/Loader/loader";
import { agentsService } from "../../../services/agentsService";
import { getApiErrorMessage, isAbortError } from "../../../services/apiClient";
import { useToast } from "../../../context/ToastContext";
import type { AdminAgentDetail, AgentTypeOption, JobTitleOption } from "../../../types/api";

const formatAgentType = (value?: string) => {
  if (!value) return "—";
  if (value === "superagent") return "Super Agent";
  return "Agent";
};

const AgentAccView = () => {
  const navigate = useNavigate();
  const { push } = useToast();
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("id")?.trim() || "";

  const [agent, setAgent] = useState<AdminAgentDetail | null>(null);
  const [agentImgBaseUrl, setAgentImgBaseUrl] = useState("");
  const [agentTypes, setAgentTypes] = useState<AgentTypeOption[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitleOption[]>([]);
  const [reviewAgentType, setReviewAgentType] = useState("agent");
  const [reviewSpecializationId, setReviewSpecializationId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<"approve" | "decline" | null>(null);
  const [isAgentTypeOpen, setIsAgentTypeOpen] = useState(false);
  const [isJobTitleOpen, setIsJobTitleOpen] = useState(false);
  const agentTypeRef = useRef<HTMLDivElement>(null);
  const jobTitleRef = useRef<HTMLDivElement>(null);

  const formatDateTime = (value?: string | null) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const resolveAgentAvatarSrc = (raw?: string | null, explicitUrl?: string | null): string => {
    const value = (raw || "").trim();
    if (value && /^https?:\/\//i.test(value)) return value;
    const direct = (explicitUrl || "").trim();
    if (direct && /^https?:\/\//i.test(direct)) return direct;
    if (!value || value.toLowerCase().includes("profileless.png")) return profileimg;
    const base = (agentImgBaseUrl || "").trim().replace(/\/+$/, "");
    if (!base) return profileimg;
    return `${base}/${encodeURIComponent(value)}`;
  };

  const canReview = useMemo(
    () =>
      String(agent?.invitationStatus || "").toLowerCase() === "accepted" &&
      !Boolean(agent?.isVerified),
    [agent?.invitationStatus, agent?.isVerified]
  );

  const statusText = useMemo(() => {
    const invitation = String(agent?.invitationStatus || "").toLowerCase();
    if (agent?.isVerified) return "Approved";
    if (invitation === "declined") return "Declined";
    if (invitation === "accepted") return "Pending Approval";
    if (invitation === "pending") return "Invited";
    if (invitation === "expired") return "Invitation Expired";
    return "—";
  }, [agent?.invitationStatus, agent?.isVerified]);

  const isDeclined = useMemo(
    () => String(agent?.invitationStatus || "").toLowerCase() === "declined",
    [agent?.invitationStatus]
  );

  const yesNo = (value?: boolean) => (value ? "Yes" : "No");
  const onOff = (value?: boolean) => (value ? "On" : "Off");

  const reviewAgentTypeLabel = useMemo(() => {
    const match = agentTypes.find((t) => t.value === reviewAgentType);
    return match?.name || formatAgentType(reviewAgentType);
  }, [agentTypes, reviewAgentType]);

  const reviewJobTitleLabel = useMemo(() => {
    const match = jobTitles.find((j) => j._id === reviewSpecializationId);
    return match?.title || "Select job title";
  }, [jobTitles, reviewSpecializationId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (agentTypeRef.current && !agentTypeRef.current.contains(event.target as Node)) {
        setIsAgentTypeOpen(false);
      }
      if (jobTitleRef.current && !jobTitleRef.current.contains(event.target as Node)) {
        setIsJobTitleOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const loadData = async () => {
      if (!agentId) {
        setError("Missing agent id in URL.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [details, urls, types, titles] = await Promise.all([
          agentsService.getAgentById(agentId, controller.signal),
          agentsService.getSupportedUrls(controller.signal),
          agentsService.getAgentTypes(controller.signal),
          agentsService.listJobTitles(controller.signal),
        ]);
        if (!mounted) return;
        const nextAgent = details.agent || null;
        setAgent(nextAgent);
        setAgentImgBaseUrl((urls.supportedUrls?.agentUrl?.img || "").trim());
        setAgentTypes(types.agentTypes ?? []);
        setJobTitles(titles);
        setReviewAgentType(nextAgent?.agentType || "agent");
        setReviewSpecializationId(
          nextAgent?.specialization?._id || titles[0]?._id || ""
        );
      } catch (err) {
        if (!mounted || isAbortError(err)) return;
        setError(getApiErrorMessage(err, "Failed to load agent details"));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void loadData();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [agentId]);

  const handleReviewAction = async (action: "approve" | "decline") => {
    if (!agentId) return;
    if (action === "approve" && !reviewSpecializationId) {
      push({
        type: "error",
        title: "Job title required",
        description: "Select a job title before approving this agent.",
      });
      return;
    }
    try {
      setActionLoading(action);
      const data = await agentsService.verifyAgent(agentId, {
        action,
        specializationId: action === "approve" ? reviewSpecializationId : undefined,
        agentType: action === "approve" ? reviewAgentType : undefined,
      });
      const updated = data.agent;
      if (updated) setAgent((prev) => ({ ...(prev || {}), ...updated }));
      push({
        type: "success",
        title: action === "approve" ? "Agent approved" : "Agent declined",
        description:
          action === "approve"
            ? "Agent verification approved successfully."
            : "Agent verification declined successfully.",
      });
      navigate("/agentaccount");
    } catch (err) {
      push({
        type: "error",
        title: "Action failed",
        description: getApiErrorMessage(err, "Unable to update agent verification status."),
      });
    } finally {
      setActionLoading(null);
    }
  };

  const row = (label: string, value: ReactNode) => (
    <div
      key={label}
      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 p-[10px_0px] border-b border-[rgba(34,34,34,0.08)] last:border-b-0 text-[14px]"
    >
      <span className="text-[14px] text-[#222] font-[Regular] shrink-0">{label}</span>
      <div className="text-[14px] text-[#222] font-[Bold] min-w-0 sm:text-right sm:max-w-[min(100%,280px)] break-all">
        {value}
      </div>
    </div>
  );

  const stats = agent?.statistics;

  return (
    <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8 flex flex-col gap-[20px]">
      <Header title="Agent View" showBack={true} onBackClick={() => navigate(-1)} />

      {loading ? (
        <div className="rounded-[15px] bg-white min-h-[60vh] flex items-center justify-center">
          <Loader size={80} />
        </div>
      ) : (
        <>
          {error && (
            <div className="rounded-[10px] border border-[rgba(234,57,52,0.25)] bg-[#FFF5F5] px-[14px] py-[12px] text-[13px] font-[Medium] text-[#EA3934]">
              {error}
            </div>
          )}
          <div className="rounded-[15px] bg-white overflow-hidden min-w-0 p-[20px]">
            <h2 className="text-[18px] md:text-[20px] font-[Bold] text-[#222] leading-tight mb-6">
              Agent View
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="shrink-0">
                <div className="h-[210px] w-[210px] shrink-0 overflow-hidden rounded-[12px]">
                  <img
                    src={resolveAgentAvatarSrc(agent?.profilePicture, agent?.profilePictureUrl)}
                    alt={agent?.fullName || "Agent"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = profileimg;
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                {row("Full Name", agent?.fullName || "—")}
                {row("Email address", agent?.email || "—")}
                {row("Phone number", agent?.phoneNumber || "—")}
                {row("WhatsApp", agent?.whatsappNumber || "—")}
                {row("Country", agent?.nationality?.name || agent?.nationality?.code || "—")}
                {row("Agent Type", formatAgentType(agent?.agentType))}
                {row("Job Title", agent?.specialization?.title || "—")}
                {row("Experience", agent?.experience != null ? String(agent.experience) : "—")}
                {row("Broker License", agent?.brokerLicenseNumber || "—")}
                {row("Agency", agent?.agency?.agencyName || "—")}
                {row("Agent Verified", yesNo(agent?.isVerified))}
                {row("Agent Status", agent?.isActive ? "Active" : "Inactive")}
                {row("Email Notification", onOff(agent?.preferences?.notificationSettings?.email))}
                {row("Push Notification", onOff(agent?.preferences?.notificationSettings?.push))}
                {row("Invitation Status", <span className="capitalize">{agent?.invitationStatus || "—"}</span>)}
                {row("Verification Status", statusText)}
                {row("About Me", <span className="break-words">{agent?.aboutMe || agent?.description || "—"}</span>)}
                {row("Active Listings", stats?.activeListings ?? 0)}
                {row("Total Listings", stats?.totalListings ?? 0)}
                {row("Total Inquiries", stats?.totalInquiries ?? 0)}
                {row("New Inquiries", stats?.newInquiries ?? 0)}
                {row("Total Deals", stats?.totalDeals ?? 0)}
                {row("Created At", formatDateTime(agent?.createdAt))}
                {row("Last Login", formatDateTime(agent?.lastLogin))}
                {row("Last Active At", formatDateTime(agent?.lastActiveAt))}
                {row("Login Attempts", agent?.loginAttempts ?? 0)}
              </div>
            </div>
          </div>

          <div className="rounded-[15px] md:p-[22px] p-[20px] min-w-0 flex justify-end flex-wrap gap-[20px] bg-white">
            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 w-full">
              {isDeclined ? (
                <div className="rounded-[10px] border border-[rgba(234,57,52,0.35)] bg-[rgba(234,57,52,0.08)] px-[16px] py-[16px] text-center w-full md:w-auto min-w-[180px]">
                  <p className="text-[14px] font-[Bold] text-[#EA3934]">Approval declined</p>
                </div>
              ) : (
                <>
                  {canReview && (
                    <div className="flex flex-wrap gap-3 w-full md:w-auto mb-2 md:mb-0">
                      <div className="relative min-w-[160px]" ref={jobTitleRef}>
                        <button
                          type="button"
                          onClick={() => setIsJobTitleOpen((o) => !o)}
                          className="flex w-full items-center justify-between gap-2 border border-[rgba(34,34,34,0.10)] rounded-full px-[14px] h-[38px] text-[12px] font-[SemiBold] text-[#222] bg-white"
                        >
                          <span className="truncate">{reviewJobTitleLabel}</span>
                          <DownArrowIcon className={`shrink-0 ${isJobTitleOpen ? "rotate-180" : ""}`} width={12} height={12} />
                        </button>
                        {isJobTitleOpen && (
                          <div className="absolute bottom-[44px] left-0 right-0 max-h-[200px] overflow-y-auto bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg z-20 py-2">
                            {jobTitles.map((title) => (
                              <button
                                key={title._id}
                                type="button"
                                className="w-full text-left px-3 py-2 text-[12px] hover:bg-[#F5F5F5]"
                                onClick={() => {
                                  setReviewSpecializationId(title._id);
                                  setIsJobTitleOpen(false);
                                }}
                              >
                                {title.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative min-w-[140px]" ref={agentTypeRef}>
                        <button
                          type="button"
                          onClick={() => setIsAgentTypeOpen((o) => !o)}
                          className="flex w-full items-center justify-between gap-2 border border-[rgba(34,34,34,0.10)] rounded-full px-[14px] h-[38px] text-[12px] font-[SemiBold] text-[#222] bg-white"
                        >
                          <span>{reviewAgentTypeLabel}</span>
                          <DownArrowIcon className={`shrink-0 ${isAgentTypeOpen ? "rotate-180" : ""}`} width={12} height={12} />
                        </button>
                        {isAgentTypeOpen && (
                          <div className="absolute bottom-[44px] left-0 right-0 bg-white border border-[#EAEAEA] rounded-[10px] shadow-lg z-20 py-2">
                            {(agentTypes.length
                              ? agentTypes
                              : [
                                  { name: "Agent", value: "agent" },
                                  { name: "Super Agent", value: "superagent" },
                                ]
                            ).map((type) => (
                              <button
                                key={type.value}
                                type="button"
                                className="w-full text-left px-3 py-2 text-[12px] hover:bg-[#F5F5F5]"
                                onClick={() => {
                                  setReviewAgentType(type.value);
                                  setIsAgentTypeOpen(false);
                                }}
                              >
                                {type.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    disabled={!canReview || actionLoading !== null}
                    onClick={() => void handleReviewAction("approve")}
                    className="cursor-pointer inline-flex items-center justify-center gap-[6px] rounded-full bg-[#6A3CA8] px-[14px] h-[38px] md:w-[120px] w-full text-[12px] font-[SemiBold] text-[#FFF] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "approve" ? "Approving..." : "Approved"}
                  </button>
                  <button
                    type="button"
                    disabled={!canReview || actionLoading !== null}
                    onClick={() => void handleReviewAction("decline")}
                    className="cursor-pointer inline-flex items-center justify-center gap-[6px] rounded-full bg-[#222222] px-[14px] h-[38px] md:w-[120px] w-full text-[12px] font-[SemiBold] text-[#FFF] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "decline" ? "Declining..." : "Declined"}
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentAccView;
