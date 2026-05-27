import { useRef, useState, useEffect } from "react";
import { CalenderIcon, DownArrowIcon, LeftArrowIcon, RightArrowIcon } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import ProjectMedia from "./Projectcomponents/ProjectMedia";
import ProjectPricePay from "./Projectcomponents/ProjectPricePay";
import ProjectLocation from "./Projectcomponents/ProjectLocation";
import ProjectUnitDetails from "./Projectcomponents/ProjectUnitDetails";

const inputClass =
    "h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none";
const textareaClass =
    "w-full rounded-[10px] border border-[#EAEAEA] px-[14px] py-[12px] text-[13px] resize-none focus:outline-none";
const labelClass = "block text-[14px] font-[SemiBold] text-[#222] mb-[8px]";
const sectionClass = "bg-white rounded-[12px] p-[20px] border border-[#EAEAEA]";
const sectionTitleClass = "text-[18px] font-[Bold] text-[#222] mb-[20px]";

function Toggle({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between border border-[#EAEAEA] rounded-[10px] px-[14px] h-[44px]">
            <span className="text-[13px] font-[Medium] text-[#222]">{label}</span>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${checked ? "bg-[#6A3CA8]" : "bg-[#D1D5DB]"}`}
            >
                <span
                    className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${checked ? "left-[22px]" : "left-[2px]"}`}
                />
            </button>
        </div>
    );
}

function Dropdown({
    label,
    value,
    options,
    onChange,
    formatLabel,
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
    formatLabel?: (v: string) => string;
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

    const display = formatLabel ? formatLabel(value) : value;

    return (
        <div>
            <label className={labelClass}>{label}</label>
            <div className="relative w-full" ref={ref}>
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-between gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] w-full bg-white cursor-pointer select-none"
                >
                    <h4 className="text-[13px] font-[Medium] text-[#222] truncate">{display}</h4>
                    <DownArrowIcon
                        className={`mt-[2px] transition-transform ${open ? "rotate-180" : ""}`}
                        width={14}
                        height={14}
                    />
                </div>
                {open && (
                    <div className="absolute top-[50px] left-0 w-full bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 overflow-hidden py-[8px] max-h-[220px] overflow-y-auto">
                        {options.map((opt) => (
                            <div
                                key={opt}
                                className={`flex items-center px-[14px] py-[10px] cursor-pointer hover:bg-[#F5F5F5] ${value === opt ? "bg-[#F5F5F5]" : ""}`}
                                onClick={() => {
                                    onChange(opt);
                                    setOpen(false);
                                }}
                            >
                                <span className="text-[13px] font-[Medium] text-[#222]">
                                    {formatLabel ? formatLabel(opt) : opt}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const formatEnumLabel = (v: string) =>
    v
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const formatDisplayDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const monthTitle = (date: Date) =>
    `${date.toLocaleString("en-US", { month: "long" })}(${date.getFullYear()})`;

const getCalendarCells = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells: Array<number | null> = [];

    for (let i = 0; i < firstDayIndex; i += 1) cells.push(null);
    for (let day = 1; day <= totalDays; day += 1) cells.push(day);
    while (cells.length < 42) cells.push(null);
    return cells;
};

const parseDateString = (dateStr: string): Date => {
    if (!dateStr.trim()) return new Date();
    const parsed = new Date(dateStr);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

type PermitDatePickerType = "issued" | "expiry";

function ListingProjectDetail() {
    const navigate = useNavigate();

    const [isDldRegistered, setIsDldRegistered] = useState(false);

    const [projectType, setProjectType] = useState("off-plan");
    const [completionStatus, setCompletionStatus] = useState("off-plan");
    const [progressStatus, setProgressStatus] = useState("project-announced");
    const [launchCurrency, setLaunchCurrency] = useState("AED");

    const [permitIssuedDate, setPermitIssuedDate] = useState("");
    const [permitExpiryDate, setPermitExpiryDate] = useState("");
    const [activeDatePicker, setActiveDatePicker] = useState<PermitDatePickerType | null>(null);
    const [displayMonth, setDisplayMonth] = useState(() => new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);

    const calendarCells = getCalendarCells(displayMonth);

    const shiftMonth = (direction: -1 | 1) => {
        setDisplayMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
    };

    const openDatePicker = (type: PermitDatePickerType) => {
        const isActive = activeDatePicker === type;
        setActiveDatePicker(isActive ? null : type);
        if (!isActive) {
            const sourceDate = parseDateString(type === "issued" ? permitIssuedDate : permitExpiryDate);
            setDisplayMonth(new Date(sourceDate.getFullYear(), sourceDate.getMonth(), 1));
        }
    };

    const selectPermitDate = (type: PermitDatePickerType, day: number) => {
        const selectedDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
        const formatted = formatDisplayDate(selectedDate);
        if (type === "issued") setPermitIssuedDate(formatted);
        else setPermitExpiryDate(formatted);
        setActiveDatePicker(null);
    };

    useEffect(() => {
        if (!activeDatePicker) return;
        const onDocMouseDown = (e: MouseEvent) => {
            if (datePickerRef.current?.contains(e.target as Node)) return;
            setActiveDatePicker(null);
        };
        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, [activeDatePicker]);

    const renderPermitDatePicker = (
        type: PermitDatePickerType,
        label: string,
        dateValue: string
    ) => {
        const selectedDate = parseDateString(dateValue);
        const isActive = activeDatePicker === type;

        return (
            <div>
                <label className={labelClass}>{label}</label>
                <div className="relative w-full" ref={isActive ? datePickerRef : undefined}>
                    <input
                        type="text"
                        readOnly
                        value={dateValue}
                        onClick={() => openDatePicker(type)}
                        placeholder="Select"
                        className={`${inputClass} pr-[40px] cursor-pointer`}
                    />
                    <button
                        type="button"
                        aria-label={`Open calendar for ${label}`}
                        onClick={() => openDatePicker(type)}
                        className="absolute right-[12px] top-1/2 -translate-y-1/2 cursor-pointer p-[4px]"
                    >
                        <CalenderIcon width={14} height={14} />
                    </button>
                    {isActive && (
                        <div className="absolute md:left-0 right-0 top-[48px] z-30 h-[320px] w-[280px] rounded-[12px] bg-white p-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                            <div className="flex items-center justify-between mb-[16px]">
                                <button
                                    type="button"
                                    onClick={() => shiftMonth(-1)}
                                    className="text-[16px] font-[SemiBold] text-[#222] px-[6px] rotate-180"
                                >
                                    <LeftArrowIcon width={14} height={14} />
                                </button>
                                <p className="text-[16px] font-[Bold] text-[#222]">{monthTitle(displayMonth)}</p>
                                <button
                                    type="button"
                                    onClick={() => shiftMonth(1)}
                                    className="text-[16px] font-[SemiBold] text-[#222] px-[6px]"
                                >
                                    <RightArrowIcon width={14} height={14} />
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-y-[6px] text-center">
                                {weekDays.map((d, index) => (
                                    <span
                                        key={`${type}-day-${d}-${index}`}
                                        className="text-[13px] font-[SemiBold] text-[#222]"
                                    >
                                        {d}
                                    </span>
                                ))}
                                {calendarCells.map((day, idx) => {
                                    if (!day) {
                                        return (
                                            <span
                                                key={`${type}-blank-${idx}`}
                                                className="h-[30px] w-[30px] mx-auto rounded-full border border-[rgba(34,34,34,0.10)] bg-[#FAFAFA]"
                                            />
                                        );
                                    }
                                    const isSelected =
                                        selectedDate.getDate() === day &&
                                        selectedDate.getMonth() === displayMonth.getMonth() &&
                                        selectedDate.getFullYear() === displayMonth.getFullYear();
                                    return (
                                        <button
                                            key={`${type}-${day}-${idx}`}
                                            type="button"
                                            onClick={() => selectPermitDate(type, day)}
                                            className={`h-[30px] w-[30px] mx-auto rounded-full text-[12px] font-[SemiBold] border transition-colors ${isSelected
                                                ? "bg-[#EA3934] text-white border-[#EA3934]"
                                                : "text-[#707070] border-[rgba(34,34,34,0.10)] hover:bg-[#F2F2F2]"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header
                title="Listing Project Detail"
                showBack={true}
                onBackClick={() => navigate(-1)}
            />

            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                <div className="space-y-[25px]">

                    {/* ─── Core Info ──────────────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Core Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
                            <div>
                                <label className={labelClass}>Project Name *</label>
                                <input type="text" placeholder="Enter project name" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Slug</label>
                                <input type="text" placeholder="project-slug" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Developer *</label>
                                <input type="text" placeholder="Developer ID or name" className={inputClass} />
                            </div>
                            <div className="md:col-span-2 xl:col-span-3">
                                <label className={labelClass}>Description</label>
                                <textarea
                                    placeholder="Enter description (max 5000 characters)"
                                    className={`${textareaClass} h-[120px]`}
                                />
                            </div>
                            <div className="md:col-span-2 xl:col-span-3">
                                <label className={labelClass}>About Project</label>
                                <textarea
                                    placeholder="Enter about project (max 5000 characters)"
                                    className={`${textareaClass} h-[120px]`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ─── Project Classification ─────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Project Classification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]">
                            <Dropdown
                                label="Project Type *"
                                value={projectType}
                                options={["off-plan", "ready"]}
                                onChange={setProjectType}
                                formatLabel={formatEnumLabel}
                            />
                            <Dropdown
                                label="Completion Status"
                                value={completionStatus}
                                options={["off-plan", "under-construction", "ready"]}
                                onChange={setCompletionStatus}
                                formatLabel={formatEnumLabel}
                            />
                            <div>
                                <label className={labelClass}>Construction Progress (%)</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    placeholder="0"
                                    className={inputClass}
                                />
                            </div>
                            <Dropdown
                                label="Progress Status"
                                value={progressStatus}
                                options={[
                                    "project-announced",
                                    "booking-open",
                                    "construction-started",
                                    "finished",
                                ]}
                                onChange={setProgressStatus}
                                formatLabel={formatEnumLabel}
                            />
                        </div>
                    </div>

                    {/* ─── Pricing ────────────────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]">
                            <div>
                                <label className={labelClass}>Launch Price (Starting From)</label>
                                <input type="number" placeholder="1500000" className={inputClass} />
                            </div>
                            <Dropdown
                                label="Currency"
                                value={launchCurrency}
                                options={["AED", "USD", "INR", "EUR"]}
                                onChange={setLaunchCurrency}
                            />
                            <div>
                                <label className={labelClass}>Government Fees (%)</label>
                                <input type="number" placeholder="4" className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* ─── Media ──────────────────────────────────────────── */}
                    <ProjectMedia />
                    <ProjectPricePay />
                    <ProjectUnitDetails />
                    <ProjectLocation />


                    {/* ─── DLD Registration ───────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>DLD Registration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
                            <Toggle
                                label="DLD Registered"
                                checked={isDldRegistered}
                                onChange={setIsDldRegistered}
                            />
                            <div>
                                <label className={labelClass}>DLD Registration Number</label>
                                <input type="text" placeholder="Registration number" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Permit Number</label>
                                <input type="text" placeholder="Permit number" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Permit URL</label>
                                <input type="url" placeholder="https://..." className={inputClass} />
                            </div>
                            {renderPermitDatePicker("issued", "Permit Issued Date", permitIssuedDate)}
                            {renderPermitDatePicker("expiry", "Permit Expiry Date", permitExpiryDate)}
                        </div>
                    </div>

                    {/* ─── Unit Counts (cached) ───────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Unit Counts</h3>
                        <p className="text-[12px] text-[#707070] mb-[16px]">
                            Auto-computed from project units (read-only)
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
                            {[
                                { label: "Total Units", key: "totalUnits" },
                                { label: "Available Units", key: "availableUnits" },
                                { label: "Sold Units", key: "soldUnits" },
                                { label: "Reserved Units", key: "reservedUnits" },
                            ].map(({ label }) => (
                                <div key={label}>
                                    <label className={labelClass}>{label}</label>
                                    <input
                                        type="number"
                                        readOnly
                                        defaultValue={0}
                                        className={`${inputClass} bg-[#F9F9F9] cursor-not-allowed`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ─── SEO ────────────────────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>SEO</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                            <div>
                                <label className={labelClass}>Meta Title</label>
                                <input type="text" placeholder="Enter meta title" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Meta Keywords</label>
                                <input
                                    type="text"
                                    placeholder="keyword1, keyword2, keyword3"
                                    className={inputClass}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Meta Description</label>
                                <textarea
                                    placeholder="Enter meta description"
                                    className={`${textareaClass} h-[100px]`}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ListingProjectDetail;
