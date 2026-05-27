import { useMemo, useRef, useState } from "react";
import { DownArrowIcon, EyeDarkIcon, SearchIcon } from "../../assets/icons";
import Header from "../../components/Header/Header";
import Pagenation from "../../components/Pagenation/Pagenation";
import { useNavigate } from "react-router-dom";
import { ReportPriorityBadge, ReportStatusBadge, ReportTypeBadge } from "./ReportBadges";
import {
    REPORT_PRIORITIES,
    REPORT_STATUSES,
    REPORT_TYPES,
    USER_TYPES,
    formatDate,
    formatLabel,
    reportsSeed,
    type Report,
    type ReportPriority,
    type ReportStatus,
    type ReportType,
    type UserType,
} from "./reportData";

const tableGrid =
    "grid-cols-[0.9fr_1.2fr_0.8fr_1.1fr_0.7fr_0.9fr_0.8fr_1fr_0.7fr]";

type StatCard = { label: string; value: number; accent: string };

function FilterDropdown<T extends string>({
    label,
    value,
    options,
    allLabel,
    onChange,
}: {
    label: string;
    value: T | "all";
    options: readonly T[];
    allLabel: string;
    onChange: (v: T | "all") => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const display = value === "all" ? allLabel : formatLabel(value);

    return (
        <div className="relative shrink-0" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between gap-[8px] border border-[rgba(34,34,34,0.10)] bg-white rounded-full px-[14px] h-[37px] cursor-pointer min-w-[130px]"
            >
                <span className="text-[#222] text-[12px] font-[SemiBold] truncate">
                    {label}: {display}
                </span>
                <DownArrowIcon className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute left-0 top-[44px] w-full min-w-[180px] bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] py-[8px] z-20 flex flex-col max-h-[240px] overflow-y-auto">
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onChange("all");
                            setOpen(false);
                        }}
                        className={`px-[16px] py-[10px] text-left text-[13px] font-[Medium] cursor-pointer hover:bg-[#F5F5F5] ${value === "all" ? "text-[#6A3CA8] bg-[#F5F5F5]" : "text-[#222]"}`}
                    >
                        {allLabel}
                    </button>
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                onChange(opt);
                                setOpen(false);
                            }}
                            className={`px-[16px] py-[10px] text-left text-[13px] font-[Medium] cursor-pointer hover:bg-[#F5F5F5] capitalize ${value === opt ? "text-[#6A3CA8] bg-[#F5F5F5]" : "text-[#222]"}`}
                        >
                            {formatLabel(opt)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatCards({ reports }: { reports: Report[] }) {
    const stats: StatCard[] = [
        {
            label: "Pending",
            value: reports.filter((r) => r.status === "pending").length,
            accent: "#707070",
        },
        {
            label: "Under Review",
            value: reports.filter((r) => r.status === "under-review").length,
            accent: "#F59E0B",
        },
        {
            label: "Resolved",
            value: reports.filter((r) => r.status === "resolved").length,
            accent: "#00A663",
        },
        {
            label: "Urgent Open",
            value: reports.filter(
                (r) =>
                    r.priority === "urgent" &&
                    !["resolved", "rejected"].includes(r.status)
            ).length,
            accent: "#EA3934",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[14px] mb-[24px]">
            {stats.map((s) => (
                <div
                    key={s.label}
                    className="rounded-[12px] border border-[rgba(34,34,34,0.08)] bg-white p-[16px] flex flex-col gap-[6px]"
                >
                    <p className="text-[12px] font-[Medium] text-[#707070]">{s.label}</p>
                    <p className="text-[28px] font-[Bold] leading-none" style={{ color: s.accent }}>
                        {s.value}
                    </p>
                </div>
            ))}
        </div>
    );
}

function ReportManagement() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");
    const [priorityFilter, setPriorityFilter] = useState<ReportPriority | "all">("all");
    const [typeFilter, setTypeFilter] = useState<ReportType | "all">("all");
    const [userTypeFilter, setUserTypeFilter] = useState<UserType | "all">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredReports = useMemo(() => {
        const q = search.trim().toLowerCase();
        return reportsSeed.filter((r) => {
            if (statusFilter !== "all" && r.status !== statusFilter) return false;
            if (priorityFilter !== "all" && r.priority !== priorityFilter) return false;
            if (typeFilter !== "all" && r.reportType !== typeFilter) return false;
            if (userTypeFilter !== "all" && r.userType !== userTypeFilter) return false;
            if (!q) return true;
            return (
                r.id.toLowerCase().includes(q) ||
                r.reporterEmail.toLowerCase().includes(q) ||
                r.reason.toLowerCase().includes(q) ||
                r.reportedItemLabel.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q)
            );
        });
    }, [search, statusFilter, priorityFilter, typeFilter, userTypeFilter]);

    const paginatedRows = filteredReports.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const resetPageOnFilter = () => setCurrentPage(1);

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header
                title="Reports Management"
                showBack={false}
                onBackClick={() => {}}
            />

            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                <StatCards reports={reportsSeed} />

                <div className="flex flex-col gap-[14px] mb-[24px]">
                    <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[15px] px-[14px] h-[40px] w-full md:w-[320px]">
                        <SearchIcon className="text-[#707070] shrink-0" />
                        <input
                            type="search"
                            placeholder="Search by ID, email, reason, item..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                resetPageOnFilter();
                            }}
                            className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-[10px]">
                        <FilterDropdown
                            label="Status"
                            value={statusFilter}
                            options={REPORT_STATUSES}
                            allLabel="All statuses"
                            onChange={(v) => {
                                setStatusFilter(v);
                                resetPageOnFilter();
                            }}
                        />
                        <FilterDropdown
                            label="Priority"
                            value={priorityFilter}
                            options={REPORT_PRIORITIES}
                            allLabel="All priorities"
                            onChange={(v) => {
                                setPriorityFilter(v);
                                resetPageOnFilter();
                            }}
                        />
                        <FilterDropdown
                            label="Type"
                            value={typeFilter}
                            options={REPORT_TYPES}
                            allLabel="All types"
                            onChange={(v) => {
                                setTypeFilter(v);
                                resetPageOnFilter();
                            }}
                        />
                        <FilterDropdown
                            label="User"
                            value={userTypeFilter}
                            options={USER_TYPES}
                            allLabel="All user types"
                            onChange={(v) => {
                                setUserTypeFilter(v);
                                resetPageOnFilter();
                            }}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full scrollbar-hide mb-[30px]">
                    <div className="min-w-[1280px]">
                        <div className="rounded-[10px] border border-[rgba(34,34,34,0.08)] overflow-hidden bg-white">
                            <div
                                className={`grid ${tableGrid} gap-[16px] items-center px-[14px] py-[12px] bg-[#F5F5F5] border-b border-[rgba(34,34,34,0.08)]`}
                            >
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Report ID</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Reporter</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Type</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Reported Item</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">User Type</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Reason</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Status</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Priority</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Actions</p>
                            </div>

                            <div>
                                {paginatedRows.length === 0 ? (
                                    <div className="px-[14px] py-[40px] text-center">
                                        <p className="text-[14px] font-[Medium] text-[#707070]">
                                            No reports match your filters.
                                        </p>
                                    </div>
                                ) : (
                                    paginatedRows.map((row, idx) => (
                                        <div
                                            key={row.id}
                                            className={`grid ${tableGrid} gap-[16px] items-center px-[14px] py-[12px] ${idx !== paginatedRows.length - 1 ? "border-b border-[rgba(34,34,34,0.08)]" : ""}`}
                                        >
                                            <div>
                                                <p className="text-[12px] font-[SemiBold] text-[#6A3CA8]">
                                                    {row.id}
                                                </p>
                                                <p className="text-[11px] font-[Regular] text-[#707070] mt-[2px]">
                                                    {formatDate(row.createdAt)}
                                                </p>
                                            </div>
                                            <p className="text-[12px] font-[Regular] text-[#222] truncate">
                                                {row.reporterEmail}
                                            </p>
                                            <ReportTypeBadge type={row.reportType} />
                                            <p
                                                className="text-[12px] font-[Regular] text-[#222] truncate"
                                                title={row.reportedItemLabel}
                                            >
                                                {row.reportedItemLabel}
                                            </p>
                                            <p className="text-[12px] font-[Regular] text-[#222] capitalize">
                                                {row.userType}
                                            </p>
                                            <p
                                                className="text-[12px] font-[Regular] text-[#222] truncate"
                                                title={row.reason}
                                            >
                                                {row.reason}
                                            </p>
                                            <ReportStatusBadge status={row.status} />
                                            <ReportPriorityBadge priority={row.priority} />
                                            <div className="flex items-center justify-start gap-[10px]">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(`/reportsmanagementdetail`, {
                                                            state: { reportId: row.id },
                                                        })
                                                    }
                                                    className="cursor-pointer p-[6px]"
                                                    aria-label="View report"
                                                >
                                                    <EyeDarkIcon width={20} height={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Pagenation
                    currentPage={currentPage}
                    totalItems={filteredReports.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ReportManagement;
