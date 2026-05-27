import { useState } from "react";
import Header from "../../../components/Header/Header";
import { SITEMAP_CATEGORIES, sitemapSectionsSeed } from "../cmsData";
import {
    Dropdown,
    SaveBar,
    TextField,
    Toggle,
    sectionClass,
    sectionTitleClass,
} from "../shared/CmsFormShared";

function SitemapSettings() {
    const [sections, setSections] = useState(sitemapSectionsSeed);
    const [selectedSectionId, setSelectedSectionId] = useState(sections[0]?.id ?? 1);
    const selectedSection = sections.find((s) => s.id === selectedSectionId) ?? sections[0];

    const updateSection = (field: string, value: string | boolean) => {
        setSections((prev) =>
            prev.map((s) => (s.id === selectedSectionId ? { ...s, [field]: value } : s))
        );
    };

    const updateLink = (linkId: number, field: string, value: string | number) => {
        setSections((prev) =>
            prev.map((s) =>
                s.id === selectedSectionId
                    ? { ...s, links: s.links.map((l) => (l.id === linkId ? { ...l, [field]: value } : l)) }
                    : s
            )
        );
    };

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="Sitemap" showBack={false} onBackClick={() => {}} />

            <div className="mt-[20px]">
                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Page Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <Dropdown
                            label="Category Tab"
                            value={selectedSection?.categoryId ?? "buy"}
                            options={SITEMAP_CATEGORIES.map((c) => ({ value: c.id, label: c.label }))}
                            onChange={(v) => updateSection("categoryId", v)}
                        />
                        <TextField
                            label="Location"
                            value={selectedSection?.location ?? ""}
                            onChange={(v) => updateSection("location", v)}
                            placeholder="Umm Al Quwain"
                        />
                        <div className="md:col-span-2">
                            <TextField
                                label="Section Title"
                                value={selectedSection?.title ?? ""}
                                onChange={(v) => updateSection("title", v)}
                            />
                        </div>
                        <Toggle
                            label="Section Status"
                            checked={selectedSection?.isActive ?? true}
                            onChange={(v) => updateSection("isActive", v)}
                        />
                    </div>
                    <p className="text-[13px] text-[#707070] mt-[12px]">
                        User-side page title format: &quot;For [Category] properties sitemap in [Location]&quot;
                    </p>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Sitemap Links (3-column layout)</h3>
                    {selectedSection?.links.map((link) => (
                        <div key={link.id} className="border border-[#EAEAEA] rounded-[10px] p-[14px] mb-[10px]">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-[12px]">
                                <TextField label="Link Label" value={link.label} onChange={(v) => updateLink(link.id, "label", v)} />
                                <TextField label="URL" value={link.url} onChange={(v) => updateLink(link.id, "url", v)} />
                                <Dropdown
                                    label="Column"
                                    value={String(link.column)}
                                    options={[
                                        { value: "1", label: "Column 1" },
                                        { value: "2", label: "Column 2" },
                                        { value: "3", label: "Column 3" },
                                    ]}
                                    onChange={(v) => updateLink(link.id, "column", Number(v))}
                                />
                                <TextField
                                    label="Display Order"
                                    value={String(link.displayOrder)}
                                    onChange={(v) => updateLink(link.id, "displayOrder", Number(v) || 0)}
                                    type="number"
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" className="text-[13px] font-[Bold] text-[#6A3CA8] cursor-pointer">+ Add Link</button>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Sections List</h3>
                    <div className="flex flex-wrap gap-[8px]">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => setSelectedSectionId(s.id)}
                                className={`px-[14px] py-[8px] rounded-[8px] text-[13px] font-[Medium] cursor-pointer ${selectedSectionId === s.id ? "bg-[#6A3CA8] text-white" : "bg-[#F5F5F5] text-[#222]"}`}
                            >
                                {s.title} — {SITEMAP_CATEGORIES.find((c) => c.id === s.categoryId)?.label}
                            </button>
                        ))}
                        <button type="button" className="px-[14px] py-[8px] rounded-[8px] text-[13px] font-[Bold] text-[#6A3CA8] border border-[#6A3CA8] cursor-pointer">
                            + Add Section
                        </button>
                    </div>
                </div>

                <SaveBar onSave={() => console.log("Save Sitemap", sections)} />
            </div>
        </div>
    );
}

export default SitemapSettings;
