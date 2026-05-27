import { useState } from "react";
import Header from "../../../components/Header/Header";
import { legalDocumentsSeed } from "../cmsData";
import {
    Dropdown,
    SaveBar,
    TextAreaField,
    TextField,
    Toggle,
    sectionClass,
    sectionTitleClass,
} from "../shared/CmsFormShared";

const COUNTRY_OPTIONS = [
    { value: "UAE", label: "UAE" },
    { value: "SA", label: "Saudi Arabia" },
    { value: "EG", label: "Egypt" },
];

const LANGUAGE_OPTIONS = [
    { value: "EN", label: "English" },
    { value: "AR", label: "Arabic" },
    { value: "PT", label: "Portuguese" },
];

function LegalPagesSettings() {
    const [documents, setDocuments] = useState(legalDocumentsSeed);
    const [activeDocId, setActiveDocId] = useState(documents[0]?.id ?? "terms");
    const activeDoc = documents.find((d) => d.id === activeDocId) ?? documents[0];

    const updateDoc = <K extends keyof typeof activeDoc>(key: K, value: (typeof activeDoc)[K]) => {
        setDocuments((prev) => prev.map((d) => (d.id === activeDocId ? { ...d, [key]: value } : d)));
    };

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="Legal Pages" showBack={false} onBackClick={() => {}} />

            <div className="mt-[20px]">
                <div className="flex flex-wrap gap-[8px] mb-[20px]">
                    {documents.map((doc) => (
                        <button
                            key={doc.id}
                            type="button"
                            onClick={() => setActiveDocId(doc.id)}
                            className={`px-[16px] py-[10px] rounded-[10px] text-[13px] font-[Medium] cursor-pointer border ${activeDocId === doc.id ? "bg-[#6A3CA8] text-white border-[#6A3CA8]" : "bg-white text-[#222] border-[#EAEAEA]"}`}
                        >
                            {doc.tabLabel}
                        </button>
                    ))}
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>{activeDoc?.tabLabel} — Document Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[16px]">
                        <TextField label="Tab Label" value={activeDoc?.tabLabel ?? ""} onChange={(v) => updateDoc("tabLabel", v)} required />
                        <TextField label="Document Title" value={activeDoc?.documentTitle ?? ""} onChange={(v) => updateDoc("documentTitle", v)} required />
                        <Dropdown label="Country" value={activeDoc?.country ?? "UAE"} options={COUNTRY_OPTIONS} onChange={(v) => updateDoc("country", v)} />
                        <Dropdown label="Language" value={activeDoc?.language ?? "EN"} options={LANGUAGE_OPTIONS} onChange={(v) => updateDoc("language", v)} />
                        <TextField label="Display Order" value={String(activeDoc?.displayOrder ?? 1)} onChange={(v) => updateDoc("displayOrder", Number(v) || 1)} type="number" />
                        <Toggle label="Status" checked={activeDoc?.isActive ?? true} onChange={(v) => updateDoc("isActive", v)} />
                    </div>

                    <TextAreaField
                        label="Content Body (Rich Text / HTML)"
                        value={activeDoc?.content ?? ""}
                        onChange={(v) => updateDoc("content", v)}
                        rows={16}
                        placeholder="Enter legal document content with headings, paragraphs, bullet lists, and links..."
                    />
                    <p className="text-[13px] text-[#707070] mt-[8px]">
                        Supports headings, paragraphs, bullet lists, and hyperlinks. Integrate a WYSIWYG editor (e.g. TipTap, Quill) when backend is ready.
                    </p>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Contact Block (Terms page)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <TextField label="Support Email" value="support@propertyfinder.ae" onChange={() => {}} />
                        <TextField label="Contact Section Title" value="Contact us" onChange={() => {}} />
                    </div>
                </div>

                <SaveBar onSave={() => console.log("Save Legal Document", activeDoc)} />
            </div>
        </div>
    );
}

export default LegalPagesSettings;
