import { useEffect, useRef, useState } from "react";
import { DownArrowIcon } from "../../assets/icons";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { ReportPriorityBadge, ReportStatusBadge, ReportTypeBadge } from "./ReportBadges";
import {
    REPORT_PRIORITIES,
    REPORT_STATUSES,
    formatDate,
    formatLabel,
    reportsSeed,
    type InternalNote,
    type Report,
    type ReportPriority,
    type ReportStatus,
} from "./reportData";

const labelClass = "block text-[12px] font-[SemiBold] text-[#707070] mb-[4px]";
const valueClass = "text-[14px] font-[Medium] text-[#222]";
const sectionClass =
    "bg-white rounded-[12px] p-[20px] border border-[rgba(34,34,34,0.08)]";
const sectionTitleClass = "text-[16px] font-[Bold] text-[#222] mb-[16px]";
const inputClass =
    "h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none focus:border-[#6A3CA8]";
const textareaClass =
    "w-full rounded-[10px] border border-[#EAEAEA] px-[14px] py-[12px] text-[13px] resize-none focus:outline-none focus:border-[#6A3CA8]";

function AdminDropdown({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: readonly string[];
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                {label}
            </label>
            <div className="relative w-full" ref={ref}>
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-between gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] w-full bg-white cursor-pointer"
                >
                    <span className="text-[13px] font-[Medium] text-[#222] capitalize">
                        {formatLabel(value)}
                    </span>
                    <DownArrowIcon
                        className={`transition-transform ${open ? "rotate-180" : ""}`}
                        width={14}
                        height={14}
                    />
                </button>
                {open && (
                    <div className="absolute top-[50px] left-0 w-full bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 py-[8px] max-h-[220px] overflow-y-auto">
                        {options.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                    onChange(opt);
                                    setOpen(false);
                                }}
                                className={`w-full px-[14px] py-[10px] text-left text-[13px] font-[Medium] capitalize hover:bg-[#F5F5F5] ${value === opt ? "bg-[#F5F5F5] text-[#6A3CA8]" : "text-[#222]"}`}
                            >
                                {formatLabel(opt)}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div>
            <p className={labelClass}>{label}</p>
            <div className={valueClass}>{value}</div>
        </div>
    );
}

function ReportManagementDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const reportId = (location.state as { reportId?: string } | null)?.reportId;

    const seed = reportsSeed.find((r) => r.id === reportId) ?? reportsSeed[0];

    const [report, setReport] = useState<Report>({ ...seed });
    const [reviewNotes, setReviewNotes] = useState(seed.reviewNotes ?? "");
    const [actionTaken, setActionTaken] = useState(seed.actionTaken ?? "");
    const [resolutionNotes, setResolutionNotes] = useState(seed.resolution?.notes ?? "");
    const [newNote, setNewNote] = useState("");

    const addInternalNote = () => {
        const trimmed = newNote.trim();
        if (!trimmed) return;
        const note: InternalNote = {
            note: trimmed,
            addedBy: "Admin — Arun",
            addedAt: new Date().toISOString(),
        };
        setReport((prev) => ({
            ...prev,
            internalNotes: [note, ...prev.internalNotes],
            updatedAt: new Date().toISOString(),
        }));
        setNewNote("");
    };

    const saveAdminReview = () => {
        setReport((prev) => ({
            ...prev,
            reviewNotes,
            actionTaken,
            reviewedBy: "Admin — Arun",
            reviewedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }));
    };

    const saveResolution = () => {
        setReport((prev) => ({
            ...prev,
            status: "resolved",
            resolution: {
                status: "resolved",
                notes: resolutionNotes,
                resolvedBy: "Admin — Arun",
                resolvedAt: new Date().toISOString(),
            },
            updatedAt: new Date().toISOString(),
        }));
    };

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header
                title="Report Details"
                showBack
                onBackClick={() => navigate("/reportsmanagement")}
            />

            <div className="mt-[20px] flex flex-col gap-[20px]">
                <div className={sectionClass}>
                    <div className="flex flex-wrap items-start justify-between gap-[16px] mb-[20px]">
                        <div>
                            <p className="text-[12px] font-[Medium] text-[#707070]">Report ID</p>
                            <h2 className="text-[22px] font-[Bold] text-[#6A3CA8]">{report.id}</h2>
                            <p className="text-[12px] font-[Regular] text-[#707070] mt-[4px]">
                                Submitted {formatDate(report.createdAt)}
                                {report.updatedAt !== report.createdAt &&
                                    ` · Updated ${formatDate(report.updatedAt)}`}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-[10px]">
                            <ReportStatusBadge status={report.status} />
                            <ReportPriorityBadge priority={report.priority} />
                            <ReportTypeBadge type={report.reportType} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
                        <InfoRow label="Reporter email" value={report.reporterEmail} />
                        <InfoRow
                            label="User type"
                            value={<span className="capitalize">{report.userType}</span>}
                        />
                        <InfoRow label="Reason" value={report.reason} />
                        <InfoRow
                            label="Reported item"
                            value={
                                <span title={report.reportedItemId}>
                                    {report.reportedItemLabel}
                                </span>
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Description</h3>
                        <p className="text-[14px] font-[Regular] text-[#222] leading-relaxed whitespace-pre-wrap">
                            {report.description || "—"}
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>
                            Evidence ({report.attachments.length})
                        </h3>
                        {report.attachments.length === 0 ? (
                            <p className="text-[13px] text-[#707070]">No attachments provided.</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[12px]">
                                {report.attachments.map((url, i) => (
                                    <a
                                        key={url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-[10px] overflow-hidden border border-[#EAEAEA] aspect-[4/3] bg-[#F5F5F5]"
                                    >
                                        <img
                                            src={url}
                                            alt={`Evidence ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Admin review</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
                        <AdminDropdown
                            label="Status"
                            value={report.status}
                            options={REPORT_STATUSES}
                            onChange={(v) =>
                                setReport((prev) => ({
                                    ...prev,
                                    status: v as ReportStatus,
                                    updatedAt: new Date().toISOString(),
                                }))
                            }
                        />
                        <AdminDropdown
                            label="Priority"
                            value={report.priority}
                            options={REPORT_PRIORITIES}
                            onChange={(v) =>
                                setReport((prev) => ({
                                    ...prev,
                                    priority: v as ReportPriority,
                                    updatedAt: new Date().toISOString(),
                                }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-[16px] mb-[20px]">
                        <div>
                            <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                Review notes
                            </label>
                            <textarea
                                className={textareaClass}
                                rows={3}
                                value={reviewNotes}
                                onChange={(e) => setReviewNotes(e.target.value)}
                                placeholder="Notes from admin review..."
                            />
                        </div>
                        <div>
                            <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                Action taken
                            </label>
                            <textarea
                                className={textareaClass}
                                rows={2}
                                value={actionTaken}
                                onChange={(e) => setActionTaken(e.target.value)}
                                placeholder="Describe action taken on this report..."
                            />
                        </div>
                    </div>
                    {report.reviewedAt && (
                        <p className="text-[12px] text-[#707070] mb-[16px]">
                            Last reviewed by {report.reviewedBy} on {formatDate(report.reviewedAt)}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={saveAdminReview}
                        className="cursor-pointer inline-flex items-center justify-center rounded-full bg-[#6A3CA8] text-[#FFF] px-[20px] h-[40px] text-[13px] font-[SemiBold]"
                    >
                        Save review
                    </button>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Resolution</h3>
                    {report.resolution ? (
                        <div className="mb-[16px] p-[14px] rounded-[10px] bg-[#F0FFF4] border border-[rgba(0,166,99,0.2)]">
                            <p className="text-[13px] font-[SemiBold] text-[#00A663] capitalize mb-[6px]">
                                {report.resolution.status}
                            </p>
                            <p className="text-[13px] text-[#222]">{report.resolution.notes}</p>
                            <p className="text-[12px] text-[#707070] mt-[8px]">
                                Resolved by {report.resolution.resolvedBy} on{" "}
                                {formatDate(report.resolution.resolvedAt)}
                            </p>
                        </div>
                    ) : null}
                    <div className="mb-[16px]">
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                            Resolution notes
                        </label>
                        <textarea
                            className={textareaClass}
                            rows={3}
                            value={resolutionNotes}
                            onChange={(e) => setResolutionNotes(e.target.value)}
                            placeholder="Final resolution summary..."
                        />
                    </div>
                    <button
                        type="button"
                        onClick={saveResolution}
                        className="cursor-pointer inline-flex items-center justify-center rounded-full bg-[#00A663] text-[#FFF] px-[20px] h-[40px] text-[13px] font-[SemiBold]"
                    >
                        Mark as resolved
                    </button>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Internal notes</h3>
                    <div className="flex flex-col sm:flex-row gap-[10px] mb-[20px]">
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="Add an internal note (visible to admins only)..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addInternalNote()}
                        />
                        <button
                            type="button"
                            onClick={addInternalNote}
                            className="cursor-pointer shrink-0 inline-flex items-center justify-center rounded-full bg-[#6A3CA8] text-[#FFF] px-[20px] h-[44px] text-[13px] font-[SemiBold]"
                        >
                            Add note
                        </button>
                    </div>
                    {report.internalNotes.length === 0 ? (
                        <p className="text-[13px] text-[#707070]">No internal notes yet.</p>
                    ) : (
                        <ul className="flex flex-col gap-[12px]">
                            {report.internalNotes.map((n, i) => (
                                <li
                                    key={`${n.addedAt}-${i}`}
                                    className="p-[14px] rounded-[10px] bg-[#F5F5F5] border border-[rgba(34,34,34,0.06)]"
                                >
                                    <p className="text-[13px] font-[Regular] text-[#222]">{n.note}</p>
                                    <p className="text-[11px] font-[Medium] text-[#707070] mt-[6px]">
                                        {n.addedBy} · {formatDate(n.addedAt)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportManagementDetail;
