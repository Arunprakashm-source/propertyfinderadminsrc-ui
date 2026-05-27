import { useEffect, useRef, useState } from "react";
import { DownArrowIcon } from "../../../assets/icons";
import profileimg from "../../../assets/img/profileless.png";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const inputClass =
    "h-[44px] w-full rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none";
const textareaClass =
    "w-full rounded-[10px] border border-[#EAEAEA] px-[14px] py-[12px] text-[13px] resize-none focus:outline-none";
const labelClass = "block text-[14px] font-[SemiBold] text-[#222] mb-[8px]";
const sectionClass = "bg-white rounded-[12px] p-[20px] border border-[#EAEAEA]";
const sectionTitleClass = "text-[18px] font-[Bold] text-[#222] mb-[20px]";

const CATEGORY_OPTIONS = ["basic", "safety", "outdoor", "indoor", "luxury", "other"] as const;

const formatEnumLabel = (v: string) =>
    v.charAt(0).toUpperCase() + v.slice(1);

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
        <div>
            <label className={labelClass}>{label}</label>
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
    options: readonly string[];
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

function MediaUploadBlock({
    title,
    description,
    previewSrc,
    onUpload,
    onDelete,
}: {
    title: string;
    description: string;
    previewSrc: string | null;
    onUpload: (file: File) => void;
    onDelete: () => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="border border-[#EAEAEA] rounded-[12px] p-[20px]">
            <div className="flex items-center justify-between flex-wrap gap-[20px]">
                <div className="flex items-center gap-[16px]">
                    <div className="w-[72px] h-[72px] rounded-[12px] overflow-hidden border border-[#EAEAEA] shrink-0 bg-[#F5F5F5] flex items-center justify-center">
                        <img
                            src={previewSrc || profileimg}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="text-[16px] font-[Bold] text-[#222]">{title}</h4>
                        <p className="text-[13px] font-[Regular] text-[#707070] mt-[4px]">{description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-[12px] flex-wrap">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onUpload(file);
                            e.currentTarget.value = "";
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-[42px] px-[18px] rounded-[10px] bg-[#222] text-[#fff] text-[14px] font-[Medium] cursor-pointer"
                    >
                        Upload
                    </button>
                    {previewSrc && (
                        <button
                            type="button"
                            onClick={onDelete}
                            className="h-[42px] px-[18px] rounded-[10px] border border-[#EAEAEA] text-[#EA3934] text-[14px] font-[Medium] cursor-pointer"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function ListingAmenitiesDetail() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState<string>("basic");
    const [iconUrl, setIconUrl] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [displayOrder, setDisplayOrder] = useState(0);

    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const iconBlobRef = useRef<string | null>(null);
    const imageBlobRef = useRef<string | null>(null);

    const revokeBlob = (url: string | null) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
    };

    useEffect(() => {
        return () => {
            revokeBlob(iconBlobRef.current);
            revokeBlob(imageBlobRef.current);
        };
    }, []);

    const handleIconUpload = (file: File) => {
        revokeBlob(iconBlobRef.current);
        const url = URL.createObjectURL(file);
        iconBlobRef.current = url;
        setIconPreview(url);
    };

    const handleImageUpload = (file: File) => {
        revokeBlob(imageBlobRef.current);
        const url = URL.createObjectURL(file);
        imageBlobRef.current = url;
        setImagePreview(url);
    };

    const handleDeleteIcon = () => {
        revokeBlob(iconBlobRef.current);
        iconBlobRef.current = null;
        setIconPreview(null);
    };

    const handleDeleteImage = () => {
        revokeBlob(imageBlobRef.current);
        imageBlobRef.current = null;
        setImagePreview(null);
    };

    const handleNameChange = (value: string) => {
        setName(value);
        if (!slug.trim()) {
            setSlug(
                value
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")
            );
        }
    };

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header
                title="Listing Amenity Detail"
                showBack={true}
                onBackClick={() => navigate(-1)}
            />

            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                <div className="space-y-[25px]">

                    {/* ─── Basic Information ─────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
                            <div>
                                <label className={labelClass}>
                                    Name <span className="text-[#EA3934]">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="Enter amenity name"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    Slug <span className="text-[#EA3934]">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().trim())}
                                    placeholder="amenity-slug"
                                    className={inputClass}
                                />
                            </div>
                            <Dropdown
                                label="Category"
                                value={category}
                                options={CATEGORY_OPTIONS}
                                onChange={setCategory}
                                formatLabel={formatEnumLabel}
                            />
                            <div className="md:col-span-2 xl:col-span-3">
                                <label className={labelClass}>Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                                    placeholder="Enter description (max 500 characters)"
                                    className={`${textareaClass} h-[120px]`}
                                />
                                <p className="text-[12px] text-[#707070] mt-[6px] text-right">
                                    {description.length}/500
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ─── Icon & Image ───────────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Icon & Image</h3>
                        <div className="space-y-[20px]">
                            <div>
                                <label className={labelClass}>Icon URL</label>
                                <input
                                    type="url"
                                    value={iconUrl}
                                    onChange={(e) => setIconUrl(e.target.value)}
                                    placeholder="https://... or upload below"
                                    className={inputClass}
                                />
                            </div>
                            <MediaUploadBlock
                                title="Icon"
                                description="Upload amenity icon image"
                                previewSrc={iconPreview || iconUrl || null}
                                onUpload={handleIconUpload}
                                onDelete={handleDeleteIcon}
                            />
                            <MediaUploadBlock
                                title="Image"
                                description="Upload amenity image"
                                previewSrc={imagePreview}
                                onUpload={handleImageUpload}
                                onDelete={handleDeleteImage}
                            />
                        </div>
                    </div>

                    {/* ─── Display ────────────────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Display</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                            <Toggle label="Active" checked={isActive} onChange={setIsActive} />
                            <div>
                                <label className={labelClass}>Display Order</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={displayOrder}
                                    onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)}
                                    placeholder="0"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ─── Usage Statistics ───────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Usage Statistics</h3>
                        <p className="text-[12px] text-[#707070] mb-[16px]">
                            Auto-tracked usage count (read-only)
                        </p>
                        <div className="max-w-[240px]">
                            <label className={labelClass}>Usage Count</label>
                            <input
                                type="number"
                                readOnly
                                defaultValue={0}
                                className={`${inputClass} bg-[#F9F9F9] cursor-not-allowed`}
                            />
                        </div>
                    </div>

                    {/* ─── Timestamps ─────────────────────────────────────── */}
                    <div className={sectionClass}>
                        <h3 className={sectionTitleClass}>Timestamps</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                            <div>
                                <label className={labelClass}>Created At</label>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder="—"
                                    className={`${inputClass} bg-[#F9F9F9] cursor-not-allowed`}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Updated At</label>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder="—"
                                    className={`${inputClass} bg-[#F9F9F9] cursor-not-allowed`}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ListingAmenitiesDetail;
