import profileimg from "../../../assets/img/profileless.png";
import type { Country } from "../../../data/countries";
import { countries } from "../../../data/countries";
import React, { useRef, useState, useEffect } from "react";
import { DownArrowIcon, SearchIcon, VerifiedIcon, } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import ImageSection from "./propertycomponents/ImageSection";
import OtherDetails from "./propertycomponents/OtherDetails";
import PropertyLocation from "./propertycomponents/PropertyLocation";
import { propertiesService } from "../../../services/propertiesService";
import type {
    ListingTypeMasterItem,
    NamedValueMasterItem,
    PropertyTypeMasterItem,
} from "../../../types/api";
import "quill/dist/quill.snow.css";

const COMPLETION_STATUS_OPTIONS = [
    { name: "Ready", value: "ready" },
    { name: "Off-plan", value: "off-plan" },
];

function ListingPropertyDetail() {
    const navigate = useNavigate();
    // Property Status Toggle States
    const [isPropertyActive, setIsPropertyActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const [isPetFriendly, setIsPetFriendly] = useState(false);
    const [maidRoomAvailable, setMaidRoomAvailable] = useState(false);
    const [listingTypeOptions, setListingTypeOptions] = useState<ListingTypeMasterItem[]>([]);
    const [propertyTypeOptions, setPropertyTypeOptions] = useState<PropertyTypeMasterItem[]>([]);
    const [furnishedStatusOptions, setFurnishedStatusOptions] = useState<NamedValueMasterItem[]>([]);

    const [isListingTypeDropdownOpen, setIsListingTypeDropdownOpen] = useState(false);
    const [selectedListingTypeId, setSelectedListingTypeId] = useState("");

    const [isPropertyTypeDropdownOpen, setIsPropertyTypeDropdownOpen] = useState(false);
    const [selectedPropertyTypeId, setSelectedPropertyTypeId] = useState("");

    const [isCompletionStatusDropdownOpen, setIsCompletionStatusDropdownOpen] = useState(false);
    const [selectedCompletionStatus, setSelectedCompletionStatus] = useState("ready");

    const [isFurnishedStatusDropdownOpen, setIsFurnishedStatusDropdownOpen] = useState(false);
    const [selectedFurnishedStatus, setSelectedFurnishedStatus] = useState("");

    // Currency
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("AED");

    const listingTypeDropdownRef = useRef<HTMLDivElement>(null);
    const propertyTypeDropdownRef = useRef<HTMLDivElement>(null);
    const completionStatusDropdownRef = useRef<HTMLDivElement>(null);
    const furnishedStatusDropdownRef = useRef<HTMLDivElement>(null);
    const currencyDropdownRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<HTMLDivElement | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [description, setDescription] = useState("");
    const [quill, setQuill] = useState<any>(null);

    const selectedListingTypeLabel =
        listingTypeOptions.find((item) => item._id === selectedListingTypeId)?.name?.trim() ||
        "Select listing type";
    const selectedPropertyTypeLabel =
        propertyTypeOptions.find((item) => item._id === selectedPropertyTypeId)?.name?.trim() ||
        "Select property type";
    const selectedFurnishedStatusLabel =
        furnishedStatusOptions.find((item) => item.value === selectedFurnishedStatus)?.name ||
        "Select furnished status";
    const selectedCompletionStatusLabel =
        COMPLETION_STATUS_OPTIONS.find((item) => item.value === selectedCompletionStatus)?.name ||
        "Select completion status";

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        propertiesService
            .getPropertyClassificationMasterData(controller.signal)
            .then(({ listingTypes, propertyTypes, furnishedStatus }) => {
                if (!mounted) return;
                setListingTypeOptions(listingTypes);
                setPropertyTypeOptions(propertyTypes);
                setFurnishedStatusOptions(furnishedStatus);
                setSelectedListingTypeId((prev) => prev || listingTypes[0]?._id || "");
                setSelectedPropertyTypeId((prev) => prev || propertyTypes[0]?._id || "");
                setSelectedFurnishedStatus((prev) => prev || furnishedStatus[0]?.value || "");
            })
            .catch(() => {
                if (!mounted) return;
                setListingTypeOptions([]);
                setPropertyTypeOptions([]);
                setFurnishedStatusOptions([]);
            });

        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        let instance: any = null;

        const initQuill = async () => {
            if (!quillRef.current) return;
            try {
                const { default: Quill } = await import("quill");
                if (!mounted || !quillRef.current) return;

                instance = new Quill(quillRef.current, {
                    theme: "snow",
                    modules: {
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ["bold", "italic", "underline"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link"],
                            ["clean"],
                        ],
                    },
                });
                setQuill(instance);
            } catch {
                setQuill(null);
            }
        };

        void initQuill();

        return () => {
            mounted = false;
            setQuill(null);
            instance = null;
        };
    }, []);

    const insertImageFromFile = (file: File) => {
        if (!quill) return;
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = () => {
            const range = quill.getSelection(true);
            const index = range ? range.index : quill.getLength();
            const src = String(reader.result);
            quill.insertEmbed(index, "image", src, "user");
            quill.setSelection(index + 1, 0, "user");
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (!quill) return;

        if (description && quill.root.innerHTML !== description) {
            quill.root.innerHTML = description;
        }

        const onTextChange = () => {
            setDescription(quill.root.innerHTML);
        };
        quill.on("text-change", onTextChange);

        try {
            const toolbar = quill.getModule("toolbar");
            toolbar?.addHandler?.("image", () => {
                imageInputRef.current?.click();
            });
        } catch {
            // toolbar module may not be ready yet
        }

        return () => {
            quill.off("text-change", onTextChange);
        };
    }, [quill, description]);

    useEffect(() => {
        const input = imageInputRef.current;
        if (!input) return;

        const onChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) insertImageFromFile(file);
            target.value = "";
        };

        input.addEventListener("change", onChange);
        return () => input.removeEventListener("change", onChange);
    }, [quill]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                listingTypeDropdownRef.current &&
                !listingTypeDropdownRef.current.contains(event.target as Node)
            ) {
                setIsListingTypeDropdownOpen(false);
            }
            if (
                propertyTypeDropdownRef.current &&
                !propertyTypeDropdownRef.current.contains(event.target as Node)
            ) {
                setIsPropertyTypeDropdownOpen(false);
            }
            if (
                completionStatusDropdownRef.current &&
                !completionStatusDropdownRef.current.contains(event.target as Node)
            ) {
                setIsCompletionStatusDropdownOpen(false);
            }
            if (
                furnishedStatusDropdownRef.current &&
                !furnishedStatusDropdownRef.current.contains(event.target as Node)
            ) {
                setIsFurnishedStatusDropdownOpen(false);
            }
            if (
                currencyDropdownRef.current &&
                !currencyDropdownRef.current.contains(event.target as Node)
            ) {
                setIsCurrencyDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">

            {/* Header */}
            <Header
                title="Listing Property Detail"
                showBack={true}
                onBackClick={() => navigate(-1)}
            />

            {/* Main Content */}
            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">

                {/* Grid */}

                <div className="space-y-[25px]">

                    {/* ================= Basic Information ================= */}

                    <div className="bg-white rounded-[12px] p-[20px] border border-[#EAEAEA]">
                        <h3 className="text-[18px] font-[Bold] text-[#222] mb-[20px]">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
                            {/* Title */}
                            <div className="md:col-span-2 xl:col-span-3">
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Property Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Property Title"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                            {/* Slug */}
                            {/* <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Slug
                                </label>

                                <input
                                    type="text"
                                    placeholder="property-slug"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div> */}

                            {/* Meta Title */}
                            {/* <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Meta Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Meta Title"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div> */}

                            {/* Description */}
                            <div className="md:col-span-2 xl:col-span-3">
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Description
                                </label>

                                <div className="h-[320px] border border-[rgba(34,34,34,0.10)] rounded-[12px] overflow-hidden bg-white">
                                    <style>
                                        {`
                                            .custom-quill .ql-editor img {
                                                max-width: 100%;
                                                height: auto;
                                            }
                                        `}
                                    </style>
                                    <div ref={quillRef} className="custom-quill h-[220px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= Property Classification ================= */}
                    <div className="bg-white rounded-[12px] p-[20px] border border-[#EAEAEA]">
                        <h3 className="text-[18px] font-[Bold] text-[#222] mb-[20px]">
                            Property Classification
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]">

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Listing Type
                                </label>

                                <div className="relative w-full" ref={listingTypeDropdownRef}>
                                    <div onClick={() => setIsListingTypeDropdownOpen(!isListingTypeDropdownOpen)} className="flex items-center justify-between gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] w-full bg-white cursor-pointer select-none" >
                                        <h4 className="text-[13px] font-[Medium] text-[#222] truncate">
                                            {selectedListingTypeLabel}
                                        </h4>
                                        <DownArrowIcon className={`mt-[2px] transition-transform ${isListingTypeDropdownOpen ? "rotate-180" : ""}`} width={14} height={14} />
                                    </div>

                                    {isListingTypeDropdownOpen && (
                                        <div className="absolute top-[50px] left-0 w-full bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 overflow-hidden py-[8px] max-h-[220px] overflow-y-auto">
                                            {listingTypeOptions.length === 0 ? (
                                                <p className="px-[14px] py-[10px] text-[13px] text-[#707070]">
                                                    No listing types
                                                </p>
                                            ) : (
                                                listingTypeOptions.map((type) => (
                                                    <div
                                                        key={type._id}
                                                        className={`flex items-center px-[14px] py-[10px] cursor-pointer hover:bg-[#F5F5F5] ${selectedListingTypeId === type._id ? "bg-[#F5F5F5]" : ""}`}
                                                        onClick={() => {
                                                            setSelectedListingTypeId(type._id);
                                                            setIsListingTypeDropdownOpen(false);
                                                        }}
                                                    >
                                                        <span className="text-[13px] font-[Medium] text-[#222]">
                                                            {type.name || "—"}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Property Type
                                </label>

                                <div className="relative w-full" ref={propertyTypeDropdownRef} >
                                    <div onClick={() => setIsPropertyTypeDropdownOpen(!isPropertyTypeDropdownOpen)} className="flex items-center justify-between gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] w-full bg-white cursor-pointer select-none" >
                                        <h4 className="text-[13px] font-[Medium] text-[#222] truncate">
                                            {selectedPropertyTypeLabel}
                                        </h4>
                                        <DownArrowIcon className={`mt-[2px] transition-transform ${isPropertyTypeDropdownOpen ? "rotate-180" : ""}`} width={14} height={14} />
                                    </div>

                                    {isPropertyTypeDropdownOpen && (
                                        <div className="absolute top-[50px] left-0 w-full bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 overflow-hidden py-[8px] max-h-[220px] overflow-y-auto">
                                            {propertyTypeOptions.length === 0 ? (
                                                <p className="px-[14px] py-[10px] text-[13px] text-[#707070]">
                                                    No property types
                                                </p>
                                            ) : (
                                                propertyTypeOptions.map((type) => (
                                                    <div
                                                        key={type._id}
                                                        className={`flex items-center px-[14px] py-[10px] cursor-pointer hover:bg-[#F5F5F5] ${selectedPropertyTypeId === type._id ? "bg-[#F5F5F5]" : ""}`}
                                                        onClick={() => {
                                                            setSelectedPropertyTypeId(type._id);
                                                            setIsPropertyTypeDropdownOpen(false);
                                                        }}
                                                    >
                                                        <span className="text-[13px] font-[Medium] text-[#222]">
                                                            {type.name || "—"}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Completion Status
                                </label>

                                <div className="relative w-full" ref={completionStatusDropdownRef}>
                                    {/* Selected */}
                                    <div className="flex items-center justify-between gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] w-full bg-white cursor-pointer select-none" onClick={() => setIsCompletionStatusDropdownOpen(!isCompletionStatusDropdownOpen)}>
                                        <h4 className="text-[13px] font-[Medium] text-[#222] truncate">
                                            {selectedCompletionStatusLabel}
                                        </h4>

                                        <DownArrowIcon className={`mt-[2px] transition-transform ${isCompletionStatusDropdownOpen ? "rotate-180" : ""}`} width={14} height={14} />
                                    </div>

                                    {isCompletionStatusDropdownOpen && (
                                        <div className="absolute top-[50px] left-0 w-full bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 overflow-hidden py-[8px]">
                                            {COMPLETION_STATUS_OPTIONS.map((option) => (
                                                <div
                                                    key={option.value}
                                                    className={`flex items-center px-[14px] py-[10px] cursor-pointer hover:bg-[#F5F5F5] ${selectedCompletionStatus === option.value ? "bg-[#F5F5F5]" : ""}`}
                                                    onClick={() => {
                                                        setSelectedCompletionStatus(option.value);
                                                        setIsCompletionStatusDropdownOpen(false);
                                                    }}
                                                >
                                                    <span className="text-[13px] font-[Medium] text-[#222]">
                                                        {option.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Furnished Status
                                </label>

                                <div className="relative w-full" ref={furnishedStatusDropdownRef}>
                                    {/* Selected */}
                                    <div className="flex items-center justify-between gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] w-full bg-white cursor-pointer select-none" onClick={() => setIsFurnishedStatusDropdownOpen(!isFurnishedStatusDropdownOpen)}>
                                        <h4 className="text-[13px] font-[Medium] text-[#222] truncate">
                                            {selectedFurnishedStatusLabel}
                                        </h4>

                                        <DownArrowIcon className={`mt-[2px] transition-transform ${isFurnishedStatusDropdownOpen ? "rotate-180" : ""}`} width={14} height={14} />
                                    </div>

                                    {isFurnishedStatusDropdownOpen && (
                                        <div className="absolute top-[50px] left-0 w-full bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 overflow-hidden py-[8px] max-h-[220px] overflow-y-auto">
                                            {furnishedStatusOptions.length === 0 ? (
                                                <p className="px-[14px] py-[10px] text-[13px] text-[#707070]">
                                                    No furnished options
                                                </p>
                                            ) : (
                                                furnishedStatusOptions.map((option) => (
                                                    <div
                                                        key={option.value}
                                                        className={`flex items-center px-[14px] py-[10px] cursor-pointer hover:bg-[#F5F5F5] ${selectedFurnishedStatus === option.value ? "bg-[#F5F5F5]" : ""}`}
                                                        onClick={() => {
                                                            setSelectedFurnishedStatus(option.value);
                                                            setIsFurnishedStatusDropdownOpen(false);
                                                        }}
                                                    >
                                                        <span className="text-[13px] font-[Medium] text-[#222]">
                                                            {option.name}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ================= Property Details ================= */}
                    <div className="bg-white rounded-[12px] p-[20px] border border-[#EAEAEA]">
                        <h3 className="text-[18px] font-[Bold] text-[#222] mb-[20px]">
                            Property Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]">

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Bedrooms
                                </label>

                                <input
                                    type="number"
                                    placeholder="2"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                                <label className="mt-[8px] inline-flex items-center gap-[8px] cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={maidRoomAvailable}
                                        onChange={(event) => setMaidRoomAvailable(event.target.checked)}
                                        className="h-[13px] w-[13px] rounded border border-[rgba(34,34,34,0.20)]"
                                    />
                                    <span className="text-[12px] font-[Regular] text-[#707070]">Maid bedroom is available</span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Bathrooms
                                </label>

                                <input
                                    type="number"
                                    placeholder="2"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Area SQM
                                </label>

                                <input
                                    type="number"
                                    placeholder="1500"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Area SQFT
                                </label>

                                <input
                                    type="number"
                                    placeholder="1800"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                        </div>
                    </div>

                    {/* ================= Pricing ================= */}
                    <div className="bg-white rounded-[12px] p-[20px] border border-[#EAEAEA]">
                        <h3 className="text-[18px] font-[Bold] text-[#222] mb-[20px]">
                            Pricing
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]">

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    placeholder="250000"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Currency
                                </label>

                                <div
                                    className="relative w-full"
                                    ref={currencyDropdownRef}
                                >
                                    {/* Selected */}
                                    <div className="flex items-center justify-between gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] w-full bg-white cursor-pointer select-none" onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}>
                                        <h4 className="text-[13px] font-[Medium] text-[#222] truncate">
                                            {selectedCurrency}
                                        </h4>

                                        <DownArrowIcon className={`mt-[2px] transition-transform ${isCurrencyDropdownOpen ? "rotate-180" : ""}`} width={14} height={14} />
                                    </div>

                                    {/* Dropdown */}
                                    {isCurrencyDropdownOpen && (
                                        <div className="absolute top-[50px] left-0 w-full bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 overflow-hidden py-[8px]">
                                            {["AED"].map((type) => (
                                                <div
                                                    key={type} className={`flex items-center px-[14px] py-[10px] cursor-pointer hover:bg-[#F5F5F5] ${selectedCurrency === type ? "bg-[#F5F5F5]" : ""}`}
                                                    onClick={() => {
                                                        setSelectedCurrency(type);
                                                        setIsCurrencyDropdownOpen(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <span className="text-[13px] font-[Medium] text-[#222]">
                                                        {type}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Maintenance Fees
                                </label>

                                <input
                                    type="number"
                                    placeholder="500"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Service Charges
                                </label>

                                <input
                                    type="number"
                                    placeholder="200"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                        </div>
                    </div>

                    {/* ================= Property Status ================= */}
                    <div className="bg-white rounded-[12px] p-[20px] border border-[#EAEAEA]">
                        <h3 className="text-[18px] font-[Bold] text-[#222] mb-[20px]">
                            Property Status
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]">

                            {/* Property Active */}
                            <div className="flex items-center justify-between border border-[#EAEAEA] rounded-[10px] px-[14px] h-[44px]">
                                <span className="text-[13px] font-[Medium] text-[#222]">
                                    Property Active
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setIsPropertyActive(!isPropertyActive)}
                                    className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isPropertyActive ? "bg-[#6A3CA8]" : "bg-[#D1D5DB]"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${isPropertyActive ? "left-[22px]" : "left-[2px]"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Featured */}
                            <div className="flex items-center justify-between border border-[#EAEAEA] rounded-[10px] px-[14px] h-[44px]">
                                <span className="text-[13px] font-[Medium] text-[#222]">
                                    Featured
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setIsFeatured(!isFeatured)}
                                    className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isFeatured ? "bg-[#6A3CA8]" : "bg-[#D1D5DB]"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${isFeatured ? "left-[22px]" : "left-[2px]"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Verified */}
                            <div className="flex items-center justify-between border border-[#EAEAEA] rounded-[10px] px-[14px] h-[44px]">
                                <span className="text-[13px] font-[Medium] text-[#222]">
                                    Verified
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setIsVerified(!isVerified)}
                                    className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isVerified ? "bg-[#6A3CA8]" : "bg-[#D1D5DB]"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${isVerified ? "left-[22px]" : "left-[2px]"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Pet Friendly */}
                            <div className="flex items-center justify-between border border-[#EAEAEA] rounded-[10px] px-[14px] h-[44px]">
                                <span className="text-[13px] font-[Medium] text-[#222]">
                                    Pet Friendly
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setIsPetFriendly(!isPetFriendly)}
                                    className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isPetFriendly ? "bg-[#6A3CA8]" : "bg-[#D1D5DB]"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${isPetFriendly ? "left-[22px]" : "left-[2px]"
                                            }`}
                                    />
                                </button>
                            </div>

                        </div>
                    </div>
                    {/* ================= Location ================= */}
                    <div className="bg-white rounded-[12px] p-[20px] border border-[#EAEAEA]">
                        <h3 className="text-[18px] font-[Bold] text-[#222] mb-[20px]">
                            Location
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">

                            <div className="md:col-span-2 xl:col-span-3">
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Full Address
                                </label>

                                <textarea
                                    placeholder="Enter Full Address"
                                    className="w-full h-[120px] rounded-[10px] border border-[#EAEAEA] px-[14px] py-[12px] text-[13px] resize-none focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    City
                                </label>

                                <input
                                    type="text"
                                    placeholder="Dubai"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Zone
                                </label>

                                <input
                                    type="text"
                                    placeholder="Business Bay"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                                    Building
                                </label>

                                <input
                                    type="text"
                                    placeholder="Tower A"
                                    className="h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                                />
                            </div>

                        </div>
                    </div>


                    <ImageSection />
                    <OtherDetails />
                    <PropertyLocation />
                </div>
            </div>
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
            />
        </div>
    );
}

export default ListingPropertyDetail;