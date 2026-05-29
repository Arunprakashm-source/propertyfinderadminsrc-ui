import { useEffect, useState } from "react";
import { CancelIcon, DownArrowIcon } from "../../../assets/icons";
import Loader from "../../../components/Loader/loader";
import { useToast } from "../../../context/ToastContext";
import { getApiErrorMessage } from "../../../services/apiClient";
import { agenciesService } from "../../../services/agenciesService";
import { agentsService } from "../../../services/agentsService";
import type { AgencyDropdownItem, AgentTypeOption } from "../../../types/api";

interface InviteAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSuccess?: () => void;
  defaultAgencyId?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

export default function InviteAgentModal({
  isOpen,
  onClose,
  onInviteSuccess,
  defaultAgencyId = "",
}: InviteAgentModalProps) {
  const { push } = useToast();
  const [agencies, setAgencies] = useState<AgencyDropdownItem[]>([]);
  const [agentTypes, setAgentTypes] = useState<AgentTypeOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [agencyId, setAgencyId] = useState("");
  const [agentType, setAgentType] = useState("agent");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setAgencyId("");
      setAgentType("agent");
      setFullName("");
      setEmail("");
      setIsSubmitting(false);
      return;
    }

    let mounted = true;
    const controller = new AbortController();

    const loadOptions = async () => {
      setLoadingOptions(true);
      try {
        const [agencyRes, typesRes] = await Promise.all([
          agenciesService.listAgenciesForDropdown(undefined, controller.signal),
          agentsService.getAgentTypes(controller.signal),
        ]);
        if (!mounted) return;
        setAgencies(agencyRes.agencies || []);
        const types = typesRes.agentTypes || [];
        setAgentTypes(types);
        setAgentType(types[0]?.value || "agent");
        setAgencyId(defaultAgencyId || "");
      } catch (error) {
        if (!mounted) return;
        push({
          type: "error",
          title: "Failed to load options",
          description: getApiErrorMessage(error, "Could not load agency or agent type options."),
        });
      } finally {
        if (mounted) setLoadingOptions(false);
      }
    };

    void loadOptions();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [isOpen, defaultAgencyId, push]);

  if (!isOpen) return null;

  const handleInvite = async () => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!agencyId) {
      push({ type: "error", title: "Agency required", description: "Please select an agency." });
      return;
    }
    if (!trimmedEmail) {
      push({ type: "error", title: "Missing email", description: "Please enter agent email." });
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      push({ type: "error", title: "Invalid email", description: "Please enter a valid email address." });
      return;
    }
    try {
      setIsSubmitting(true);
      await agentsService.inviteAgent({
        agencyId,
        email: trimmedEmail,
        fullName: trimmedName || undefined,
        agentType: agentType || "agent",
      });
      push({ type: "success", title: "Invitation sent", description: "Agent invitation sent successfully." });
      onClose();
      onInviteSuccess?.();
    } catch (error) {
      push({
        type: "error",
        title: "Could not send invitation",
        description: getApiErrorMessage(error, "Invitation could not be sent."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center md:items-center items-end z-[9999]"
      onMouseDown={(event) => {
        if (!isSubmitting && event.target === event.currentTarget) onClose();
      }}
    >
      {(isSubmitting || loadingOptions) && (
        <div className="absolute inset-0 z-[10000] flex items-center justify-center bg-black/50">
          <Loader size={56} margin={0} />
        </div>
      )}
      <div className="relative bg-white w-full md:max-w-[480px] rounded-t-[15px] md:rounded-[15px] max-h-[90vh] flex flex-col overflow-hidden">
        <div className="shrink-0 flex justify-end p-[20px_20px_0px_20px]">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="cursor-pointer h-[40px] w-[40px] rounded-[12px] border border-[rgba(34,34,34,0.10)] bg-white flex items-center justify-center disabled:opacity-50"
          >
            <CancelIcon width={14} height={14} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-[0px_20px] md:p-[0px_50px]">
          <h2 className="text-center text-[20px] font-[Bold] text-[#222] leading-[1]">Invite Agent</h2>
          <div className="flex flex-col gap-[20px] mt-[35px]">
            <div>
              <label className="text-[14px] font-[Bold] text-[#222] block mb-[6px]">Agency</label>
              <div className="relative">
                <select
                  value={agencyId}
                  onChange={(e) => setAgencyId(e.target.value)}
                  disabled={isSubmitting || loadingOptions}
                  className="h-[44px] w-full appearance-none rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] pr-[36px] text-[14px] font-[Medium] text-[#222] focus:outline-none bg-white"
                >
                  <option value="">Select agency</option>
                  {agencies.map((agency) => (
                    <option key={agency._id} value={agency._id}>
                      {agency.agencyName || agency.email || agency._id}
                    </option>
                  ))}
                </select>
                <DownArrowIcon
                  className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2"
                  width={14}
                  height={14}
                />
              </div>
            </div>
            <div>
              <label className="text-[14px] font-[Bold] text-[#222] block mb-[6px]">Agent type</label>
              <div className="relative">
                <select
                  value={agentType}
                  onChange={(e) => setAgentType(e.target.value)}
                  disabled={isSubmitting || loadingOptions}
                  className="h-[44px] w-full appearance-none rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] pr-[36px] text-[14px] font-[Medium] text-[#222] focus:outline-none bg-white"
                >
                  {agentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <DownArrowIcon
                  className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2"
                  width={14}
                  height={14}
                />
              </div>
            </div>
            <div>
              <label className="text-[14px] font-[Bold] text-[#222] block mb-[6px]">Agent name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
                placeholder="Enter agent name"
                className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[14px]"
              />
            </div>
            <div>
              <label className="text-[14px] font-[Bold] text-[#222] block mb-[6px]">Agent email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                placeholder="Enter agent email address"
                className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[14px]"
              />
            </div>
          </div>
        </div>
        <div className="shrink-0 p-[20px_20px_20px_20px] md:p-[30px_50px_60px_50px]">
          <button
            type="button"
            onClick={() => void handleInvite()}
            disabled={isSubmitting || loadingOptions}
            className="h-[44px] w-full rounded-[10px] bg-[#6A3CA8] text-white text-[14px] font-[Bold] disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
