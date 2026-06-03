import mainbg from "../../../assets/img/mainbg.png";
import profileimg from "../../../assets/img/profileless.png";
import { useEffect, useMemo, useRef, useState } from "react";
import { DownArrowIcon, EditIcon, EyeDarkIcon, LeftArrowIcon, LocationIcon, RightArrowIcon, SearchIcon, TrashIcon, } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import { Button } from "../../../components/Ui/Button";
import Pagenation from "../../../components/Pagenation/Pagenation";
import { useNavigate } from "react-router-dom";

type Row = {
    id: number;
    name: string;
    location: string;
    phone: string;
    email: string;
    price: string;
    publishedAt: string;
    status: string;
    image: string;
    agentname: string;
    authorizedagency: string[];
    agentImg: string;
};
const rowData: Row[] = [
    {
        id: 1,
        name: "Omniyat Bespoke | Villa",
        location: "Dubai",
        phone: "1234567890",
        email: "dubai@gmail.com",
        price: "AED 10,000,000",
        publishedAt: "01 June 2026",
        status: "Active",
        image: profileimg,
        agentname: "John Doe",
        agentImg: profileimg,
        authorizedagency: ["Emmar properties", "ALH Commercial", "Knight Frank", "ERA", "omniyat", "jbl"],
    },
    {
        id: 2,
        name: "Omniyat Bespoke | Villa",
        location: "Dubai",
        phone: "9898980909",
        email: "dubai@gmail.com",
        price: "AED 10,000,000",
        publishedAt: "01 June 2026",
        status: "Sold",
        image: profileimg,
        agentname: "John Doe",
        agentImg: profileimg,
        authorizedagency: ["Emmar properties", "ALH Commercial", "Knight Frank", "ERA", "omniyat"]

    },
    {
        id: 3,
        name: "Omniyat Bespoke | Villa",
        location: "Dubai",
        phone: "9898980909",
        email: "dubai@gmail.com",
        price: "AED 10,000,000",
        publishedAt: "01 June 2026",
        status: "Inactive",
        image: profileimg,
        agentname: "John Doe",
        agentImg: profileimg,
        authorizedagency: ["Emmar properties", "ALH Commercial", "Knight Frank", "ERA", "omniyat"]

    },
    {
        id: 4,
        name: "Omniyat Bespoke | Villa",
        location: "Dubai",
        phone: "9898980909",
        email: "dubai@gmail.com",
        price: "AED 10,000,000",
        publishedAt: "01 June 2026",
        status: "Active",
        image: profileimg,
        agentname: "John Doe",
        agentImg: profileimg,
        authorizedagency: ["Emmar properties", "ALH Commercial", "Knight Frank", "ERA", "omniyat"]

    },
    {
        id: 5,
        name: "Omniyat Bespoke | Villa",
        location: "Dubai",
        phone: "9898980909",
        email: "dubai@gmail.com",
        price: "AED 10,000,000",
        publishedAt: "01 June 2026",
        status: "Pending",
        image: profileimg,
        agentname: "John Doe",
        agentImg: profileimg,
        authorizedagency: ["Emmar properties", "ALH Commercial", "Knight Frank", "ERA", "omniyat"]
    },
    {
        id: 6,
        name: "Omniyat Bespoke | Villa",
        location: "Dubai",
        phone: "9898980909",
        email: "dubai@gmail.com",
        price: "AED 10,000,000",
        publishedAt: "01 June 2026",
        status: "Rented",
        image: profileimg,
        agentname: "John Doe",
        agentImg: profileimg,
        authorizedagency: ["Emmar properties", "ALH Commercial", "Knight Frank", "ERA", "omniyat"]

    },
];

type AvailableDeveloper = {
    id: number;
    developerName: string;
    developerTitle: string;
    developerAvatar: string;
};

const availableDevelopersSeed: AvailableDeveloper[] = [
    { id: 1, developerName: "Emaar Properties", developerTitle: "Leading Developer", developerAvatar: profileimg },
    { id: 2, developerName: "Damac Properties", developerTitle: "Premium Developer", developerAvatar: profileimg },
    { id: 3, developerName: "Nakheel", developerTitle: "Master Developer", developerAvatar: profileimg },
    { id: 4, developerName: "Meraas", developerTitle: "Lifestyle Developer", developerAvatar: profileimg },
    { id: 5, developerName: "Omniyat", developerTitle: "Luxury Developer", developerAvatar: profileimg },
];

type AvailableAgency = {
    id: number;
    agencyName: string;
    email: string;
    agencyAvatar: string;
};

const availableAgenciesSeed: AvailableAgency[] = [
    { id: 1, agencyName: "Emmar properties", email: "contact@emmar.com", agencyAvatar: profileimg },
    { id: 2, agencyName: "ALH Commercial", email: "info@alhcommercial.com", agencyAvatar: profileimg },
    { id: 3, agencyName: "Knight Frank", email: "hello@knightfrank.com", agencyAvatar: profileimg },
    { id: 4, agencyName: "ERA", email: "support@era.com", agencyAvatar: profileimg },
    { id: 5, agencyName: "omniyat", email: "contact@omniyat.com", agencyAvatar: profileimg },
    { id: 6, agencyName: "jbl", email: "info@jbl.com", agencyAvatar: profileimg },
];

const SORT_OPTIONS = [
    { name: "Newest", value: "newest" },
    { name: "Oldest", value: "oldest" },
    { name: "Price: Low to High", value: "price-asc" },
    { name: "Price: High to Low", value: "price-desc" },
] as const;

const parsePriceValue = (price: string) => {
    const digits = price.replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
};

const projectStatusBadgeClass =
    "rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] whitespace-nowrap";

const formatProjectStatusLabel = (status?: string) => {
    if (!status?.trim()) return "";
    const normalized = status.trim().toLowerCase();
    if (normalized === "active") return "Active";
    if (normalized === "inactive") return "Inactive";
    if (normalized === "sold") return "Sold";
    if (normalized === "rented") return "Rented";
    if (normalized === "pending") return "Pending";
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

function PropertyStatusBadge({ status }: { status?: string }) {
    const label = formatProjectStatusLabel(status);
    if (!label) return <span className="text-[12px] text-[#707070]">—</span>;

    const normalized = status!.trim().toLowerCase();

    if (normalized === "active") {
        return (
            <span
                className={`${projectStatusBadgeClass} bg-[#00A663] text-[#FFF]`}
            >
                {label}
            </span>
        );
    }
    if (normalized === "pending") {
        return (
            <span
                className={`${projectStatusBadgeClass} border border-[rgba(34,34,34,0.10)] bg-white text-[#222]`}
            >
                {label}
            </span>
        );
    }
    if (normalized === "sold") {
        return (
            <span
                className={`${projectStatusBadgeClass} border border-[#ea393459] bg-[#ea393414] text-[#ea3934]`}
            >
                {label}
            </span>
        );
    }
    if (normalized === "rented") {
        return (
            <span
                className={`${projectStatusBadgeClass} bg-[#8ACBD0] text-[#FFF]`}
            >
                {label}
            </span>
        );
    }
    if (normalized === "inactive") {
        return (
            <span
                className={`${projectStatusBadgeClass} bg-[#E80808] text-[#FFF]`}
            >
                {label}
            </span>
        );
    }

    return (
        <span
            className={`${projectStatusBadgeClass} border border-[rgba(34,34,34,0.10)] bg-[#F5F5F5] text-[#222]`}
        >
            {label}
        </span>
    );
}
const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const formatDisplayDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const monthTitle = (date: Date) =>
    `${date.toLocaleString("en-US", { month: "long" })}(${date.getFullYear()})`;

const VISIBLE_AGENCY_COUNT = 2;

const formatAuthorizedAgencies = (agencies: string[]) => {
    const visible = agencies.slice(0, VISIBLE_AGENCY_COUNT);
    const remaining = agencies.length - visible.length;
    return {
        visible,
        overflowLabel: remaining > 0 ? `+${remaining}` : null,
    };
};

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
function ListingProject() {
    const navigate = useNavigate()
    const [fromDate, setFromDate] = useState(new Date(2025, 11, 1));
    const [toDate, setToDate] = useState(new Date(2025, 11, 12));
    const [activeDatePicker, setActiveDatePicker] = useState<"from" | "to" | null>(null);
    const [displayMonth, setDisplayMonth] = useState(new Date(2026, 11, 1));
    const fromDateRef = useRef<HTMLDivElement>(null);
    const toDateRef = useRef<HTMLDivElement>(null);
    const locationDropdownRef = useRef<HTMLDivElement>(null);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("All locations");
    const locationOptions = ["All locations", "Dubai", "Norway", "SouthAfrica", "For Sale", "Denmark", "switzerland"];

    const [isDeveloperDropdownOpen, setIsDeveloperDropdownOpen] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState<AvailableDeveloper | null>(null);
    const [developerSearch, setDeveloperSearch] = useState("");
    const developerDropdownRef = useRef<HTMLDivElement>(null);

    const [isAgencyDropdownOpen, setIsAgencyDropdownOpen] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState<AvailableAgency | null>(null);
    const [agencySearch, setAgencySearch] = useState("");
    const agencyDropdownRef = useRef<HTMLDivElement>(null);

    const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]["value"]>("newest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const filteredDevelopers = useMemo(() => {
        const q = developerSearch.trim().toLowerCase();
        if (!q) return availableDevelopersSeed;
        return availableDevelopersSeed.filter(
            (d) =>
                d.developerName.toLowerCase().includes(q) ||
                d.developerTitle.toLowerCase().includes(q)
        );
    }, [developerSearch]);

    const filteredAgencies = useMemo(() => {
        const q = agencySearch.trim().toLowerCase();
        if (!q) return availableAgenciesSeed;
        return availableAgenciesSeed.filter(
            (a) =>
                a.agencyName.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q)
        );
    }, [agencySearch]);

    const selectedSortLabel =
        SORT_OPTIONS.find((item) => item.value === sortBy)?.name ?? "Newest";

    useEffect(() => {
        if (!isDeveloperDropdownOpen) return;
        const onDocMouseDown = (e: MouseEvent) => {
            if (developerDropdownRef.current?.contains(e.target as Node)) return;
            setIsDeveloperDropdownOpen(false);
        };
        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, [isDeveloperDropdownOpen]);

    useEffect(() => {
        if (!isAgencyDropdownOpen) return;
        const onDocMouseDown = (e: MouseEvent) => {
            if (agencyDropdownRef.current?.contains(e.target as Node)) return;
            setIsAgencyDropdownOpen(false);
        };
        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, [isAgencyDropdownOpen]);

    useEffect(() => {
        if (!isSortOpen) return;
        const onDocMouseDown = (e: MouseEvent) => {
            if (sortRef.current?.contains(e.target as Node)) return;
            setIsSortOpen(false);
        };
        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, [isSortOpen]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredRows = useMemo(() => {
        let rows = [...rowData];

        if (selectedAgency) {
            const agencyName = selectedAgency.agencyName.trim().toLowerCase();
            rows = rows.filter((row) =>
                row.authorizedagency.some(
                    (agency) => agency.trim().toLowerCase() === agencyName
                )
            );
        }

        rows.sort((a, b) => {
            switch (sortBy) {
                case "oldest":
                    return a.publishedAt.localeCompare(b.publishedAt);
                case "price-asc":
                    return parsePriceValue(a.price) - parsePriceValue(b.price);
                case "price-desc":
                    return parsePriceValue(b.price) - parsePriceValue(a.price);
                case "newest":
                default:
                    return b.publishedAt.localeCompare(a.publishedAt);
            }
        });

        return rows;
    }, [selectedAgency, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedAgency, sortBy, selectedDeveloper]);

    const paginatedRows = filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const calendarCells = getCalendarCells(displayMonth);

    const shiftMonth = (direction: -1 | 1) => {
        setDisplayMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
    };

    const openDatePicker = (type: "from" | "to") => {
        setActiveDatePicker((prev) => (prev === type ? null : type));
        const sourceDate = type === "from" ? fromDate : toDate;
        setDisplayMonth(new Date(sourceDate.getFullYear(), sourceDate.getMonth(), 1));
    };

    const selectDate = (day: number) => {
        const selectedDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
        if (activeDatePicker === "from") setFromDate(selectedDate);
        if (activeDatePicker === "to") setToDate(selectedDate);
        setActiveDatePicker(null);
    };

    const renderDatePicker = (type: "from" | "to", selectedDate: Date, side: "left" | "right") => (
        <div className="relative" ref={type === "from" ? fromDateRef : toDateRef}>
            <button
                type="button"
                onClick={() => openDatePicker(type)}
                className="cursor-pointer h-[33px] rounded-full bg-white px-[12px] text-[12px] font-[SemiBold] text-[#222] inline-flex items-center"
            >
                {formatDisplayDate(selectedDate)}
            </button>
            {activeDatePicker === type && (
                <div
                    className={`absolute ${side === "left" ? "md:right-0 " : "md:right-0 right-[-80px] "} top-[40px] z-20 h-[320px] w-[280px] rounded-[12px] bg-white p-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.12)]`}
                >
                    <div className="flex items-center justify-between mb-[16px]">
                        <button
                            type="button"
                            onClick={() => shiftMonth(-1)}
                            className="text-[16px] font-[SemiBold] text-[#222] px-[6px] rotate-180"
                        >
                            <LeftArrowIcon width={14} height={14} />
                        </button>
                        <p className="text-[16px] font-[Bold] text-[#222]">{monthTitle(displayMonth)}</p>
                        <button type="button" onClick={() => shiftMonth(1)} className="text-[16px] font-[SemiBold] text-[#222] px-[6px]">
                            <RightArrowIcon width={14} height={14} />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-y-[6px] text-center">
                        {weekDays.map((d, index) => (
                            <span key={`${type}-day-${d}-${index}`} className="text-[13px] font-[SemiBold] text-[#222]">
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
                                    onClick={() => selectDate(day)}
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
    );
    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            {/* Header */}
            <Header
                title="Listing Projects"
                showBack={false}
                onBackClick={() => { }}
            />

            {/* Content */}
            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                {/* Search and Add New Button */}
                <div className="flex flex-wrap items-center mb-[30px] gap-[10px]">
                    <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[15px] px-[14px] h-[40px]">
                        <SearchIcon className="text-[#707070] shrink-0" />
                        <input
                            type="search"
                            placeholder="Search here"
                            className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] focus:outline-none"
                        />
                    </div>
                    {/* developer dropdown */}
                    <div className="relative" ref={developerDropdownRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsDeveloperDropdownOpen((prev) => !prev);
                                setIsAgencyDropdownOpen(false);
                            }}
                            className="cursor-pointer  h-[40px] rounded-[15px] border border-[rgba(34,34,34,0.12)] px-[14px] text-left text-[14px] font-[Regular] flex items-center justify-between gap-[30px] bg-white"
                        >
                            <span className={selectedDeveloper ? "text-[#222] font-[Medium]" : "text-[#707070]"}>
                                {selectedDeveloper ? selectedDeveloper.developerName : "Select developer"}
                            </span>
                            <DownArrowIcon
                                width={11}
                                height={7}
                                className={`shrink-0 transition-transform ${isDeveloperDropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {isDeveloperDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full z-40 w-[250px] mt-[8px] rounded-[10px] bg-white py-[12px] shadow-[0_6px_18px_0_rgba(0,0,0,0.15)]">
                                <div className="px-[12px] mb-[10px]">
                                    <div className="flex items-center gap-[10px] h-[40px] rounded-[10px] px-[12px] bg-white shadow-[0_6px_18px_0_rgba(0,0,0,0.15)]">
                                        <SearchIcon className="text-[#707070] shrink-0" />
                                        <input
                                            type="search"
                                            value={developerSearch}
                                            onChange={(e) => setDeveloperSearch(e.target.value)}
                                            placeholder="Search developer"
                                            className="w-full bg-transparent text-[13px] font-[Regular] text-[#222] placeholder:text-[#94A3B8] focus:outline-none"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="max-h-[200px] overflow-y-auto px-[12px] scrollbar-hide">
                                    {filteredDevelopers.length === 0 ? (
                                        <p className="text-[12px] text-[#707070] py-[12px] text-center">
                                            No developers found
                                        </p>
                                    ) : (
                                        filteredDevelopers.map((developer) => (
                                            <button
                                                key={developer.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedDeveloper(developer);
                                                    setIsDeveloperDropdownOpen(false);
                                                    setDeveloperSearch("");
                                                }}
                                                className="w-full text-left flex gap-[12px] items-start py-[12px] border-b border-[rgba(34,34,34,0.08)] rounded-[6px] px-[4px] -mx-[4px] transition-colors"
                                            >
                                                <img
                                                    src={developer.developerAvatar}
                                                    alt=""
                                                    className="h-[40px] w-[40px] rounded-full object-cover shrink-0"
                                                />
                                                <div className="flex-1 min-w-0 pt-[2px]">
                                                    <p className="text-[12px] font-[Bold] text-[#222] leading-tight">
                                                        {developer.developerName}
                                                    </p>
                                                    <p className="text-[12px] font-[Regular] text-[#707070] mt-[4px] leading-tight">
                                                        {developer.developerTitle}
                                                    </p>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* agency dropdown */}
                    <div className="relative" ref={agencyDropdownRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsAgencyDropdownOpen((prev) => !prev);
                                setIsDeveloperDropdownOpen(false);
                            }}
                            className="cursor-pointer h-[40px] rounded-[15px] border border-[rgba(34,34,34,0.12)] px-[14px] text-left text-[14px] font-[Regular] flex items-center justify-between gap-[30px] bg-white"
                        >
                            <span className={selectedAgency ? "text-[#222] font-[Medium]" : "text-[#707070]"}>
                                {selectedAgency ? selectedAgency.agencyName : "Select agency"}
                            </span>
                            <DownArrowIcon
                                width={11}
                                height={7}
                                className={`shrink-0 transition-transform ${isAgencyDropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {isAgencyDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full z-40 w-[250px] mt-[8px] rounded-[10px] bg-white py-[12px] shadow-[0_6px_18px_0_rgba(0,0,0,0.15)]">
                                <div className="px-[12px] mb-[10px]">
                                    <div className="flex items-center gap-[10px] h-[40px] rounded-[10px] px-[12px] bg-white shadow-[0_6px_18px_0_rgba(0,0,0,0.15)]">
                                        <SearchIcon className="text-[#707070] shrink-0" />
                                        <input
                                            type="search"
                                            value={agencySearch}
                                            onChange={(e) => setAgencySearch(e.target.value)}
                                            placeholder="Search agency"
                                            className="w-full bg-transparent text-[13px] font-[Regular] text-[#222] placeholder:text-[#94A3B8] focus:outline-none"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="max-h-[200px] overflow-y-auto px-[12px] scrollbar-hide">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedAgency(null);
                                            setIsAgencyDropdownOpen(false);
                                            setAgencySearch("");
                                        }}
                                        className="w-full text-left py-[10px] text-[12px] font-[Medium] text-[#707070] border-b border-[rgba(34,34,34,0.08)]"
                                    >
                                        All agencies
                                    </button>
                                    {filteredAgencies.length === 0 ? (
                                        <p className="text-[12px] text-[#707070] py-[12px] text-center">
                                            No agency found
                                        </p>
                                    ) : (
                                        filteredAgencies.map((agency) => (
                                            <button
                                                key={agency.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedAgency(agency);
                                                    setIsAgencyDropdownOpen(false);
                                                    setAgencySearch("");
                                                }}
                                                className="w-full text-left flex gap-[12px] items-start py-[12px] border-b border-[rgba(34,34,34,0.08)] rounded-[6px] px-[4px] -mx-[4px] transition-colors"
                                            >
                                                <img
                                                    src={agency.agencyAvatar}
                                                    alt=""
                                                    className="h-[40px] w-[40px] rounded-full object-cover shrink-0"
                                                />
                                                <div className="flex-1 min-w-0 pt-[2px]">
                                                    <p className="text-[12px] font-[Bold] text-[#222] leading-tight">
                                                        {agency.agencyName}
                                                    </p>
                                                    <p className="text-[12px] font-[Regular] text-[#707070] mt-[4px] leading-tight truncate">
                                                        {agency.email}
                                                    </p>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sort by dropdown */}
                    <div className="relative flex items-center gap-[8px] ml-auto" ref={sortRef}>
                        <span className="text-[12px] font-[SemiBold] text-[#222] whitespace-nowrap">
                            Sort by:
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsSortOpen((o) => !o)}
                            className="h-[40px] min-w-[140px] rounded-[15px] border border-[rgba(34,34,34,0.12)] bg-white px-[14px] text-[14px] font-[Regular] text-[#222] inline-flex items-center justify-between gap-[8px] cursor-pointer"
                        >
                            <span className="truncate">{selectedSortLabel}</span>
                            <DownArrowIcon
                                width={11}
                                height={7}
                                className={`shrink-0 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {isSortOpen && (
                            <div className="absolute right-0 top-[48px] z-40 min-w-[200px] rounded-[10px] border border-[rgba(34,34,34,0.10)] bg-white py-[6px] shadow-[0_8px_20px_rgba(0,0,0,0.10)] max-h-[200px] overflow-y-auto">
                                {SORT_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            setSortBy(opt.value);
                                            setIsSortOpen(false);
                                        }}
                                        className={`w-full px-[14px] py-[9px] text-left text-[12px] font-[Medium] hover:bg-[#F5F5F5] ${sortBy === opt.value ? "text-[#0832AE]" : "text-[#222]"
                                            }`}
                                    >
                                        {opt.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
                {/* Date filter section */}
                <div className="p-[5px] mb-[10px] bg-[#F5F5F5] lg:rounded-full rounded-[10px] flex flex-col gap-[12px] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-[280px]" ref={locationDropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsLocationDropdownOpen((o) => !o)}
                            className="cursor-pointer h-[33px] w-full rounded-full bg-white px-[14px] flex items-center justify-between text-left text-[13px] font-[Regular] text-[#222]"
                        >
                            <span className={selectedLocation === "All locations" ? "text-[#707070]" : "text-[#222]"}>{selectedLocation}</span>
                            <DownArrowIcon className={`shrink-0 transition-transform ${isLocationDropdownOpen ? "rotate-180" : ""}`} width={11} height={7} />
                        </button>
                        {isLocationDropdownOpen && (
                            <div className="absolute left-0 right-0 top-[44px] z-20 max-h-[200px] overflow-y-auto bg-white border border-[rgba(34,34,34,0.10)] rounded-[10px] shadow-[0_6px_16px_rgba(0,0,0,0.12)] py-[6px]">
                                {locationOptions.map((loc) => (
                                    <button
                                        key={loc}
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            setSelectedLocation(loc);
                                            setIsLocationDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-[14px] py-[9px] text-[13px] font-[Medium] hover:bg-[#F5F5F5] ${selectedLocation === loc ? "text-[#EA3934] bg-[#FDF2F2]" : "text-[#222]"}`}
                                    >
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {/*Created date filter section*/}
                    <div className="flex flex-wrap items-center gap-[8px] text-[12px]">
                        <span className="text-[#222] font-[Regular] whitespace-nowrap md:block hidden">Created date:</span>
                        {/*From date */}
                        {renderDatePicker("from", fromDate, "left")}
                        <span className="text-[#707070]">to</span>
                        {/*To date */}
                        {renderDatePicker("to", toDate, "right")}
                    </div>
                </div>
                {/* Table */}
                <div className="overflow-x-auto w-full scrollbar-hide mb-[30px]">
                    <div className="min-w-[1150px]">
                        <div className="rounded-[10px] border border-[rgba(34,34,34,0.08)] overflow-hidden bg-white">
                            <div className="grid grid-cols-[1.3fr_1fr_1.3fr_1.1fr_1fr_1fr_1fr] gap-[30px] items-center px-[14px] py-[12px] bg-[#F5F5F5] border-b border-[rgba(34,34,34,0.08)]">
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Name</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Developer</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Authorized Agency</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Price</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Status</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Published At</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Actions</p>
                            </div>

                            <div>
                                {paginatedRows.map((row, idx) => {
                                    const { visible: visibleAgencies, overflowLabel } =
                                        formatAuthorizedAgencies(row.authorizedagency);

                                    return (
                                        <div
                                            key={row.id}
                                            className={`grid grid-cols-[1.3fr_1fr_1.3fr_1.1fr_1fr_1fr_1fr] gap-[30px] items-center px-[14px] py-[12px] ${idx !== paginatedRows.length - 1 ? "border-b border-[rgba(34,34,34,0.08)]" : ""}`}
                                        >
                                            <div className="flex items-center gap-[10px] min-w-0">
                                                <div className="h-[40px] w-[40px] shrink-0 overflow-hidden rounded-[12px] bg-[#F5F5F5]">
                                                    <img src={row.image} alt="" className="h-full w-full object-cover rounded-[8px]" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[12px] font-[SemiBold] text-[#222] leading-[1.2] mb-[4px] truncate">{row.name}</p>
                                                    <p className="text-[12px] text-[#707070] leading-[1.2] flex items-center gap-[5px] min-w-0">
                                                        <span className="inline-flex shrink-0">
                                                            <LocationIcon width={11} height={15} />
                                                        </span>
                                                        <span className="truncate">{row.location}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-[10px]">
                                                <img src={row.agentImg} alt="img" className="w-[40px] h-[40px] rounded-[12px] object-cover border border-[rgba(34,34,34,0.08)]" />
                                                <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.agentname}</p>
                                            </div>
                                            <div className="flex items-center gap-[6px] flex-wrap min-w-0">
                                                {visibleAgencies.map((agency) => (
                                                    <span
                                                        key={`${row.id}-${agency}`}
                                                        className="inline-flex items-center rounded-[4px] h-[20px] px-[7px] text-[12px] font-[SemiBold] border border-[rgba(34,34,34,0.10)] text-[#222] shrink-0"
                                                    >
                                                        {agency}
                                                    </span>
                                                ))}
                                                {overflowLabel && (
                                                    <span className="inline-flex items-center h-[20px] px-[4px] text-[12px] font-[SemiBold] text-[#707070] shrink-0">
                                                        {overflowLabel}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.price}</p>
                                            <p className="text-[12px] font-[Regular] text-[#222] truncate"><PropertyStatusBadge status={row.status} /></p>
                                            <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.publishedAt}</p>
                                            <div className="flex items-center justify-start gap-[10px]">
                                                <button onClick={() => navigate(`/listingprojectdetail`)} type="button" className="cursor-pointer p-[6px] " aria-label="View">
                                                    <EditIcon width={20} height={20} />
                                                </button>
                                                <button type="button" className="cursor-pointer p-[6px] " aria-label="Delete">
                                                    <TrashIcon width={20} height={20} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagenation */}
                <Pagenation
                    currentPage={currentPage}
                    totalItems={filteredRows.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ListingProject;   