import { useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { NewProjectsIcon, OffPlanProjectsIcon, TickIcon } from "../../../../assets/icons";

const EditProjectStatus = () => {
    const projectStatusOptions = [
        { id: "new" as const, label: "New Projects", Icon: NewProjectsIcon },
        { id: "offplan" as const, label: "Off plan project", Icon: OffPlanProjectsIcon },
    ];
    const [status, setStatus] = useState<"new" | "offplan">("new");
    const onChange = (status: "new" | "offplan") => {
        setStatus(status);
    };

    const { quill, quillRef } = useQuill({
        theme: "snow",
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
            ],
        },
    });

    const descriptionHtmlRef = useRef<string>("");
    const imageInputRef = useRef<HTMLInputElement | null>(null);

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
        if (quill) {
            quill.on("text-change", () => {
                descriptionHtmlRef.current = quill.root.innerHTML;
            });

            // Add handler for the toolbar image button.
            // We insert the image as a base64 data URL so it works immediately without an upload backend.
            try {
                const toolbar = quill.getModule("toolbar") as any;
                toolbar?.addHandler?.("image", () => {
                    imageInputRef.current?.click();
                });
            } catch {
                // If toolbar module isn't available yet, ignore; Quill will still render toolbar.
            }
        }
    }, [quill]);

    useEffect(() => {
        const input = imageInputRef.current;
        if (!input) return;

        const onChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) insertImageFromFile(file);
            // Allow uploading the same file twice.
            target.value = "";
        };

        input.addEventListener("change", onChange);
        return () => input.removeEventListener("change", onChange);
    }, [quill]);
    const amenities = [
        "Balcony",
        "Central A/C",
        "Maids Room",
        "Pets Allowed",
        "View of Water",
        "Built in Wardrobes",
        "Kitchen Appliances",
        "Mezzanine",
        "Networked",
        "Private gym",
        "Private Jacuzzi",
    ];
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["Balcony"]);

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
        );
    };

    return (
        <div>
            <div className="bg-white p-[16px] md:p-[30px] border-b border-[rgba(34,34,34,0.10)]">
                <h3 className="text-[20px] font-[Bold] text-[#222] mb-[30px]">Project status</h3>
                <p className="text-[14px] font-[SemiBold] text-[#222] mb-[15px]">Select project status <span className="text-[#EA3934]">*</span></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                    {projectStatusOptions.map(({ id, label, Icon }) => {
                        const isActive = status === id;
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => onChange(id)}
                                className={`h-[115px] p-[20px_15px] rounded-[10px] border flex flex-col items-center justify-center gap-[10px] ${isActive
                                    ? "border-[rgba(8,50,174,0.30)] bg-[rgba(8,50,174,0.10)]"
                                    : "border-[rgba(34,34,34,0.10)] bg-white"
                                    }`}
                            >
                                <Icon width={50} height={50} fill={isActive ? "#0832AE" : "#222"} />
                                <span className={`text-[13px] font-[Medium] ${isActive ? "text-[#0832AE]" : "text-[#222]"}`}>
                                    {label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="rounded-[15px] bg-white  md:p-[30px] p-[16px]">
                <h3 className="text-[20px] font-[Bold] text-[#222] mb-[30px]">Project details</h3>
                <div className="flex flex-col gap-[30px]">
                    {/* project title */}
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                            Project Title <span className="text-[#EA3934]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter project title"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Regular] text-[#222] focus:outline-none"
                        />
                    </div>
                    {/* project address */}
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                            Project Address <span className="text-[#EA3934]">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Street name, Area / locality, City, State, Country"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Regular] text-[#222] focus:outline-none"
                        />
                    </div>


                    {/*Project description */}
                    <div>
                        {/* Label */}
                        <label className="text-[14px] font-[600] text-[#222] block mb-[8px]">
                            Project description <span className="text-[#EA3934]">*</span>
                        </label>

                        {/* Editor Container */}
                        <div className="h-[320px] border border-[rgba(34,34,34,0.10)] rounded-[12px] overflow-hidden bg-white">
                            <style>
                                {`
                                .custom-quill .ql-editor img {
                                    max-width: 100%;
                                    height: auto;
                                }
                            `}
                            </style>

                            {/* Editor */}
                            <div ref={quillRef} className="custom-quill h-[220px]" />
                        </div>
                    </div>

                    {/* Amenities  * */}
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[10px]">
                            Amenities <span className="text-[#EA3934]">*</span>
                        </label>
                        <div className="flex flex-wrap gap-[8px]">
                            {amenities.map((amenity) => {
                                const isActive = selectedAmenities.includes(amenity);
                                return (
                                    <button
                                        key={amenity}
                                        type="button"
                                        onClick={() => toggleAmenity(amenity)}
                                        className={`h-[39px] rounded-full px-[14px] border text-[13px] font-[Regular] inline-flex items-center gap-[6px] cursor-pointer ${isActive
                                            ? "bg-[#222] text-white border-[#222]"
                                            : "bg-white text-[#222] border-[rgba(34,34,34,0.10)]"
                                            }`}
                                    >
                                        <span
                                            className={`h-[15px] w-[15px] rounded-full border flex items-center justify-center ${isActive
                                                ? "bg-[#EA3934] border-[#EA3934]"
                                                : "bg-white border-[rgba(34,34,34,0.20)]"
                                                }`}
                                        >
                                            {isActive && <TickIcon width={8} height={7} fill="#fff" />}
                                        </span>
                                        {amenity}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/*  About the project */}
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[10px]">
                            About the project <span className="text-[#EA3934]">*</span>
                        </label>
                        <textarea
                            placeholder="Describe about the project"
                            rows={8}
                            className="w-full min-h-[220px] rounded-[10px] border border-[rgba(34,34,34,0.10)] p-[12px] text-[13px] font-[Regular] text-[#222] placeholder:text-[#A0A0A0] resize-none focus:outline-none"
                        />
                    </div>
                </div>
                {/* Hidden input for Quill image button */}
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                />
            </div>
            <div className="flex items-center justify-end gap-[10px] mt-[30px]">
                <button className="cursor-pointer h-[44px] rounded-[10px] px-[20px] border border-[#222]  text-[#222] text-[14px] font-[Bold] inline-flex items-center gap-[5px]">Discard</button>
                <button className="cursor-pointer h-[44px] rounded-[10px] px-[20px] bg-[#6A3CA8] text-[#FFF] text-[14px] font-[Bold] inline-flex items-center gap-[5px]">Save changes</button>
            </div>
        </div>
    );
};

export default EditProjectStatus;
