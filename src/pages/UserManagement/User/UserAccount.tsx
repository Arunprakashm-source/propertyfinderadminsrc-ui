import { useCallback, useEffect, useState } from "react";
import { EditIcon, SearchIcon, TrashIcon } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import Pagenation from "../../../components/Pagenation/Pagenation";
import Loader from "../../../components/Loader/loader";
import { useNavigate } from "react-router-dom";
import { usersService } from "../../../services/usersService";
import { apiClient, getApiErrorMessage } from "../../../services/apiClient";
import type { AdminUserListItem } from "../../../types/api";
import profileless from "../../../assets/img/profileless.png";

const ITEMS_PER_PAGE = 10;
const SEARCH_DEBOUNCE_MS = 400;

const formatUserName = (user: AdminUserListItem) => {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email || "—";
};

const formatCountry = (user: AdminUserListItem) => {
  if (!user.country) return "—";
  if (typeof user.country === "string") return user.country;
  return user.country.name || user.country.code || "—";
};

function UserStatusBadge({ isActive }: { isActive?: boolean }) {
  if (isActive) {
    return (
      <span className="bg-[#00A663] rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] text-[#FFF]">
        Active
      </span>
    );
  }
  return (
    <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] text-[#FFF] bg-[#E80808]">
      Inactive
    </span>
  );
}

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

const resolveUserAvatarSrc = (
  user: AdminUserListItem,
  userImgBaseUrl: string
): string => {
  const raw = (user.profilePicture || "").trim();
  if (!raw || isPlaceholderProfilePicture(raw)) return profileless;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return raw;
  const base = (userImgBaseUrl || "").trim().replace(/\/+$/, "");
  if (!base) return profileless;
  return `${base}/${encodeURIComponent(raw)}`;
};

type SupportedUrlsResponse = {
  supportedUrls?: {
    userUrl?: {
      img?: string;
    };
  };
};

function UserAccount() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userImgBaseUrl, setUserImgBaseUrl] = useState("");

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
        setUserImgBaseUrl((data.supportedUrls?.userUrl?.img || "").trim());
      } catch {
        if (!mounted) return;
        setUserImgBaseUrl("");
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

  const loadUsers = useCallback(async (signal: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersService.listUsers({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch || undefined,
      });
      if (signal.aborted) return;
      setUsers(data.users ?? []);
      setTotalPages(Math.max(1, data.pagination?.totalPages ?? 1));
      setTotalUsers(data.pagination?.totalUsers ?? 0);
    } catch (err) {
      if (signal.aborted) return;
      setUsers([]);
      setTotalPages(1);
      setTotalUsers(0);
      setError(getApiErrorMessage(err, "Failed to load users"));
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    const controller = new AbortController();
    void loadUsers(controller.signal);
    return () => controller.abort();
  }, [loadUsers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewUser = (userId: string) => {
    navigate(`/useraccountdetail?id=${encodeURIComponent(userId)}`);
  };

  return (
    <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <Header
        title="UserAccount"
        showBack={false}
        onBackClick={() => {}}
      />

      <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
        <div className="flex items-center justify-between mb-[30px] gap-[10px]">
          <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[15px] px-[14px] h-[40px] w-full md:w-[280px]">
            <SearchIcon className="text-[#707070] shrink-0" />
            <input
              type="search"
              placeholder="Search here"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="mb-[20px] rounded-[10px] border border-[rgba(234,57,52,0.25)] bg-[#FFF5F5] px-[14px] py-[12px] text-[13px] font-[Medium] text-[#EA3934]">
            {error}
          </div>
        )}

        <div className="overflow-x-auto w-full scrollbar-hide mb-[30px]">
          <div className="min-w-[1250px]">
            <div className="rounded-[10px] border border-[rgba(34,34,34,0.08)] overflow-hidden bg-white">
              <div className="grid grid-cols-[1.3fr_1fr_1.3fr_1.1fr_0.8fr_1fr] gap-[30px] items-center px-[14px] py-[12px] bg-[#F5F5F5] border-b border-[rgba(34,34,34,0.08)]">
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
                ) : users.length === 0 ? (
                  <div className="px-[14px] py-[40px] text-center text-[13px] font-[Medium] text-[#707070]">
                    {debouncedSearch ? "No users match your search." : "No users found."}
                  </div>
                ) : (
                  users.map((row, idx) => {
                    const avatarSrc = resolveUserAvatarSrc(row, userImgBaseUrl);
                    return (
                    <div
                      key={row._id}
                      className={`grid grid-cols-[1.3fr_1fr_1.3fr_1.1fr_0.8fr_1fr] gap-[30px] items-center px-[14px] py-[12px] ${idx !== users.length - 1 ? "border-b border-[rgba(34,34,34,0.08)]" : ""}`}
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
                          {formatUserName(row)}
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
                      <UserStatusBadge isActive={row.isActive} />
                      <div className="flex items-center justify-start gap-[10px]">
                        <button
                          onClick={() => handleViewUser(row._id)}
                          type="button"
                          className="cursor-pointer p-[6px]"
                          aria-label="Edit user"
                        >
                          <EditIcon width={20} height={20} />
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer p-[6px] opacity-50 cursor-not-allowed"
                          aria-label="Delete user"
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
          totalItems={totalUsers}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default UserAccount;
