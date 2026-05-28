import profileless from "../../../assets/img/profileless.png";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DownArrowIcon,
  EditIcon,
  EyeDarkIcon,
  PlusUserIcon,
  SearchIcon,
  TrashIcon,
} from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import Pagenation from "../../../components/Pagenation/Pagenation";
import Loader from "../../../components/Loader/loader";
import { useNavigate } from "react-router-dom";
import InviteDeveloperModal from "./InviteDevModal";
import { developersService } from "../../../services/developersService";
import { apiClient, getApiErrorMessage } from "../../../services/apiClient";
import type { AdminDeveloperListItem, SupportedUrlsResponse } from "../../../types/api";

const tableGrid = "grid-cols-[1.3fr_1fr_1.3fr_1.1fr_1fr_1fr]";
const ITEMS_PER_PAGE = 10;
const SEARCH_DEBOUNCE_MS = 400;

const sortOptions = [
  "All",
  "Active",
  "Inactive",
  "Approval Pending",
  "Approval Declined",
  "Invited",
  "Invitation Expired",
] as const;

type SortOption = (typeof sortOptions)[number];

export type AgentStatusLabel =
  | "Approval pending"
  | "Active"
  | "Inactive"
  | "Approval Declined"
  | "Invited"
  | "Invitation Expired";

const SORT_TO_API: Record<SortOption, string | undefined> = {
  All: undefined,
  Active: "active",
  Inactive: "inactive",
  "Approval Pending": "pending",
  "Approval Declined": "declined",
  Invited: "invited",
  "Invitation Expired": "expired",
};

const isPlaceholderProfilePicture = (
  filename: string | null | undefined
): boolean => {
  if (!filename || !String(filename).trim()) return true;
  const lower = String(filename).trim().toLowerCase();
  if (lower.includes("profileless.png") || lower.includes("profiless.png")) {
    return true;
  }
  const base = lower.split(/[/\\?#]/).pop() ?? "";
  return base === "profileless.png" || base === "profiless.png";
};

const resolveDeveloperAvatarSrc = (
  developer: AdminDeveloperListItem,
  developerImgBaseUrl: string
): string => {
  const raw = (developer.profilePicture || developer.logo || "").trim();
  if (!raw || isPlaceholderProfilePicture(raw)) return profileless;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return raw;
  const base = (developerImgBaseUrl || "").trim().replace(/\/+$/, "");
  if (!base) {
    const fromApi = (developer.profilePictureUrl || "").trim();
    return fromApi || profileless;
  }
  return `${base}/${encodeURIComponent(raw)}`;
};

const formatCountry = (developer: AdminDeveloperListItem) => {
  if (!developer.nationality) return "—";
  if (typeof developer.nationality === "string") return developer.nationality;
  return developer.nationality.name || developer.nationality.code || "—";
};

const getDeveloperStatusLabel = (
  developer: AdminDeveloperListItem
): AgentStatusLabel => {
  const inv = String(developer.invitationStatus || "").toLowerCase();

  if (inv === "pending") return "Invited";
  if (inv === "expired") return "Invitation Expired";
  if (inv === "declined") return "Approval Declined";

  if (inv === "accepted") {
    if (!developer.isVerified) return "Approval pending";
    if (developer.isActive) return "Active";
    return "Inactive";
  }

  return "Inactive";
};

function StatusBadge({ status }: { status: AgentStatusLabel }) {
  if (status === "Approval pending") {
    return (
      <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center border border-[rgba(34,34,34,0.10)] bg-white p-[6px_10px] text-[12px] font-[SemiBold] text-[#222]">
        Approval pending
      </span>
    );
  }
  if (status === "Active") {
    return (
      <span className="bg-[#00A663] rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] text-[#FFF]">
        Active
      </span>
    );
  }
  if (status === "Approval Declined") {
    return (
      <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center border border-[#ea393459] p-[6px_10px] text-[12px] font-[SemiBold] text-[#ea3934] bg-[#ea393414]">
        Approval Declined
      </span>
    );
  }
  if (status === "Invited") {
    return (
      <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] text-[#FFF] bg-[#8ACBD0]">
        Invited
      </span>
    );
  }
  if (status === "Invitation Expired") {
    return (
      <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] text-[#FFF] bg-[#FF6B35]">
        Invitation Expired
      </span>
    );
  }
  return (
    <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] text-[#FFF] bg-[#E80808]">
      Inactive
    </span>
  );
}

function DeveloperAccount() {
  const navigate = useNavigate();
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedSort, setSelectedSort] = useState<SortOption>("All");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isInviteDeveloperModalOpen, setIsInviteDeveloperModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [developers, setDevelopers] = useState<AdminDeveloperListItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDevelopers, setTotalDevelopers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [developerImgBaseUrl, setDeveloperImgBaseUrl] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const loadSupportedUrls = async () => {
      try {
        const data = await apiClient.get<SupportedUrlsResponse>(
          "/master-data?types=supportedurls",
          { signal: controller.signal }
        );
        if (!mounted) return;
        setDeveloperImgBaseUrl((data.supportedUrls?.developerUrl?.img || "").trim());
      } catch {
        if (!mounted) return;
        setDeveloperImgBaseUrl("");
      }
    };

    void loadSupportedUrls();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setCurrentPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadDevelopers = useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);
      setError(null);
      try {
        const data = await developersService.listDevelopers({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: debouncedSearch || undefined,
          sortBy: SORT_TO_API[selectedSort],
        });
        if (signal.aborted) return;
        setDevelopers(data.developers ?? []);
        setTotalPages(Math.max(1, data.pagination?.totalPages ?? 1));
        setTotalDevelopers(data.pagination?.totalDevelopers ?? 0);
      } catch (err) {
        if (signal.aborted) return;
        setDevelopers([]);
        setTotalPages(1);
        setTotalDevelopers(0);
        setError(getApiErrorMessage(err, "Failed to load developers"));
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [currentPage, debouncedSearch, selectedSort]
  );

  useEffect(() => {
    const controller = new AbortController();
    void loadDevelopers(controller.signal);
    return () => controller.abort();
  }, [loadDevelopers]);

  const handleSortDropdown = (option: SortOption) => {
    setSelectedSort(option);
    setCurrentPage(1);
    setIsSortDropdownOpen(false);
  };

  return (
    <>
      <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <Header
          title="DeveloperAccount"
          showBack={false}
          onBackClick={() => {}}
        />

        <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
          <div className="flex md:flex-row flex-col items-center justify-between mb-[30px] gap-[10px]">
            <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[15px] px-[14px] h-[37px] w-full md:w-[280px]">
              <SearchIcon className="text-[#707070] shrink-0" />
              <input
                type="search"
                placeholder="Search here"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap md:items-center gap-[10px]">
              <div className="flex md:items-center gap-[8px] shrink-0">
                <div className="relative" ref={sortDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsSortDropdownOpen((open) => !open)}
                    className="flex items-center justify-between gap-[8px] border border-[rgba(34,34,34,0.10)] bg-white rounded-full px-[14px] h-[37px] cursor-pointer w-[120px]"
                  >
                    <span className="text-[#222] text-[12px] font-[SemiBold] truncate">
                      {selectedSort}
                    </span>
                    <DownArrowIcon
                      className={`transition-transform duration-200 ${isSortDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isSortDropdownOpen && (
                    <div className="absolute left-0 top-[44px] w-full min-w-[180px] bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] py-[8px] z-20 flex flex-col">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSortDropdown(option);
                          }}
                          className={`px-[16px] py-[10px] text-left text-[13px] font-[Medium] cursor-pointer hover:bg-[#F5F5F5] transition-colors ${
                            selectedSort === option
                              ? "text-[#3182CE] bg-[#F5F5F5]"
                              : "text-[#222]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsInviteDeveloperModalOpen(true)}
                  className="cursor-pointer inline-flex items-center justify-center gap-[6px] rounded-full bg-[#6A3CA8] text-[#FFF] px-[15px] h-[37px] text-[12px] font-[SemiBold] shrink-0"
                >
                  <PlusUserIcon width={16} height={16} className="text-white" />
                  Invite Developer
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-[20px] rounded-[10px] border border-[rgba(234,57,52,0.25)] bg-[#FFF5F5] px-[14px] py-[12px] text-[13px] font-[Medium] text-[#EA3934]">
              {error}
            </div>
          )}

          <div className="overflow-x-auto w-full scrollbar-hide mb-[30px]">
            <div className="min-w-[1150px]">
              <div className="rounded-[10px] border border-[rgba(34,34,34,0.08)] overflow-hidden bg-white">
                <div
                  className={`grid ${tableGrid} gap-[30px] items-center px-[14px] py-[12px] bg-[#F5F5F5] border-b border-[rgba(34,34,34,0.08)]`}
                >
                  <p className="text-[14px] font-[SemiBold] text-[#222]">Name</p>
                  <p className="text-[14px] font-[SemiBold] text-[#222]">Phone</p>
                  <p className="text-[14px] font-[SemiBold] text-[#222]">Email</p>
                  <p className="text-[14px] font-[SemiBold] text-[#222]">Country</p>
                  <p className="text-[14px] font-[SemiBold] text-[#222]">Status</p>
                  <p className="text-[14px] font-[SemiBold] text-[#222]">Actions</p>
                </div>

                <div>
                  {loading ? (
                    <div className="px-[14px] py-[30px]">
                      <Loader size={80} />
                    </div>
                  ) : developers.length === 0 ? (
                    <div className="px-[14px] py-[40px] text-center text-[13px] font-[Medium] text-[#707070]">
                      {debouncedSearch
                        ? "No developers match your search."
                        : "No developers found."}
                    </div>
                  ) : (
                    developers.map((row, idx) => {
                      const avatarSrc = resolveDeveloperAvatarSrc(
                        row,
                        developerImgBaseUrl
                      );
                      const statusLabel = getDeveloperStatusLabel(row);
                      return (
                        <div
                          key={row._id}
                          className={`grid ${tableGrid} gap-[30px] items-center px-[14px] py-[12px] ${idx !== developers.length - 1 ? "border-b border-[rgba(34,34,34,0.08)]" : ""}`}
                        >
                          <div className="flex items-center gap-[10px]">
                            <img
                              src={avatarSrc}
                              alt=""
                              className="w-[40px] h-[40px] rounded-[12px] object-cover border border-[rgba(34,34,34,0.08)]"
                              onError={(e) => {
                                e.currentTarget.src = profileless;
                              }}
                            />
                            <p className="text-[12px] font-[Regular] text-[#222] truncate">
                              {row.name || "—"}
                            </p>
                          </div>
                          <p className="text-[12px] font-[Regular] text-[#222] truncate">
                            {row.phoneNumber || "—"}
                          </p>
                          <p className="text-[12px] font-[Regular] text-[#222] truncate">
                            {row.email || "—"}
                          </p>
                          <p className="text-[12px] font-[Regular] text-[#222] truncate">
                            {formatCountry(row)}
                          </p>
                          <StatusBadge status={statusLabel} />
                          <div className="flex items-center justify-start gap-[10px]">
                            <button
                              onClick={() =>
                                navigate(
                                  `/developeraccountview?id=${encodeURIComponent(row._id)}`
                                )
                              }
                              type="button"
                              className="cursor-pointer p-[6px]"
                              aria-label="View"
                            >
                              <EyeDarkIcon width={20} height={20} />
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/developeraccountdetail?id=${encodeURIComponent(row._id)}`
                                )
                              }
                              type="button"
                              className="cursor-pointer p-[6px]"
                              aria-label="Edit"
                            >
                              <EditIcon width={20} height={20} />
                            </button>
                            <button
                              type="button"
                              className="cursor-pointer p-[6px] opacity-50 cursor-not-allowed"
                              aria-label="Delete"
                              disabled
                              title="Delete will be wired in a later step"
                            >
                              <TrashIcon width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalDevelopers}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <InviteDeveloperModal
        isOpen={isInviteDeveloperModalOpen}
        onClose={() => setIsInviteDeveloperModalOpen(false)}
      />
    </>
  );
}

export default DeveloperAccount;
