import { useState } from "react";
import Header from "../../../components/Header/Header";
import { contactSubmissionsSeed, defaultContactPageSettings, officeLocationsSeed } from "../cmsData";
import {
    SaveBar,
    SeoSection,
    TextAreaField,
    TextField,
    Toggle,
    sectionClass,
    sectionTitleClass,
} from "../shared/CmsFormShared";

function ContactUsSettings() {
    const [settings, setSettings] = useState(defaultContactPageSettings);
    const [formSubjects, setFormSubjects] = useState(["General Inquiry", "Partnership", "Support", "Feedback"]);
    const [locations] = useState(officeLocationsSeed);
    const [submissions] = useState(contactSubmissionsSeed);

    const update = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="Contact Us" showBack={false} onBackClick={() => {}} />

            <div className="mt-[20px]">
                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Hero Section</h3>
                    <div className="grid grid-cols-1 gap-[16px]">
                        <TextField label="Hero Title" value={settings.heroTitle} onChange={(v) => update("heroTitle", v)} required />
                        <TextAreaField label="Hero Subtitle" value={settings.heroSubtitle} onChange={(v) => update("heroSubtitle", v)} />
                        <p className="text-[13px] text-[#707070]">Hero background image upload — wire to media API when backend is ready.</p>
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Main Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <TextField label="Section Title" value={settings.sectionTitle} onChange={(v) => update("sectionTitle", v)} />
                        <TextField label="Section Subtext" value={settings.sectionSubtext} onChange={(v) => update("sectionSubtext", v)} />
                        <TextField label="Email" value={settings.email} onChange={(v) => update("email", v)} type="email" required />
                        <TextField label="Phone" value={settings.phone} onChange={(v) => update("phone", v)} required />
                        <div className="md:col-span-2">
                            <TextAreaField label="Office Address" value={settings.officeAddress} onChange={(v) => update("officeAddress", v)} />
                        </div>
                        <TextField label="Map URL" value={settings.mapUrl} onChange={(v) => update("mapUrl", v)} />
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <TextField label="Facebook URL" value={settings.facebookUrl} onChange={(v) => update("facebookUrl", v)} />
                        <TextField label="Instagram URL" value={settings.instagramUrl} onChange={(v) => update("instagramUrl", v)} />
                        <TextField label="X (Twitter) URL" value={settings.twitterUrl} onChange={(v) => update("twitterUrl", v)} />
                        <TextField label="LinkedIn URL" value={settings.linkedinUrl} onChange={(v) => update("linkedinUrl", v)} />
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Contact Form — Subject Options</h3>
                    <p className="text-[13px] text-[#707070] mb-[12px]">These appear in the Subject dropdown on the user-side contact form.</p>
                    {formSubjects.map((subject, index) => (
                        <div key={index} className="flex gap-[10px] mb-[10px]">
                            <input
                                value={subject}
                                onChange={(e) => setFormSubjects((prev) => prev.map((s, i) => (i === index ? e.target.value : s)))}
                                className="h-[44px] flex-1 rounded-[10px] border border-[#EAEAEA] px-[14px] text-[13px] focus:outline-none"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setFormSubjects((prev) => [...prev, "New Subject"])}
                        className="text-[13px] font-[Bold] text-[#6A3CA8] cursor-pointer"
                    >
                        + Add Subject
                    </button>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Other Office Locations</h3>
                    {locations.map((loc) => (
                        <div key={loc.id} className="border border-[#EAEAEA] rounded-[10px] p-[16px] mb-[12px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
                                <TextField label="City" value={loc.city} onChange={() => {}} />
                                <TextField label="Country" value={loc.country} onChange={() => {}} />
                                <TextField label="Location Type" value={loc.locationType} onChange={() => {}} placeholder="Tech hub" />
                                <TextField label="Phone" value={loc.phone} onChange={() => {}} />
                                <TextField label="Email" value={loc.email} onChange={() => {}} />
                                <TextField label="Map URL" value={loc.mapUrl} onChange={() => {}} />
                                <div className="md:col-span-2">
                                    <TextAreaField label="Full Address" value={loc.address} onChange={() => {}} />
                                </div>
                                <Toggle label="Status" checked={loc.isActive} onChange={() => {}} />
                            </div>
                        </div>
                    ))}
                    <button type="button" className="text-[13px] font-[Bold] text-[#6A3CA8] cursor-pointer">+ Add Location</button>
                </div>

                <div className="p-[20px] bg-[#fff] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px] mb-[20px]">
                    <h3 className={sectionTitleClass}>Form Submissions (Read-only)</h3>
                    <div className="overflow-x-auto">
                        <div className="min-w-[800px]">
                            <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr_1.5fr] gap-[16px] px-[14px] py-[12px] bg-[#F5F5F5] rounded-t-[10px] border border-[rgba(34,34,34,0.08)]">
                                <p className="text-[13px] font-[SemiBold]">Name</p>
                                <p className="text-[13px] font-[SemiBold]">Email</p>
                                <p className="text-[13px] font-[SemiBold]">Phone</p>
                                <p className="text-[13px] font-[SemiBold]">Subject</p>
                                <p className="text-[13px] font-[SemiBold]">Comments</p>
                            </div>
                            {submissions.map((sub) => (
                                <div key={sub.id} className="grid grid-cols-[1fr_1.2fr_1fr_1fr_1.5fr] gap-[16px] px-[14px] py-[12px] border border-t-0 border-[rgba(34,34,34,0.08)]">
                                    <p className="text-[13px]">{sub.name}</p>
                                    <p className="text-[13px]">{sub.email}</p>
                                    <p className="text-[13px]">{sub.phone}</p>
                                    <p className="text-[13px]">{sub.subject}</p>
                                    <p className="text-[13px] truncate">{sub.comments}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <SeoSection seo={settings.seo} onChange={(seo) => update("seo", seo)} />
                <SaveBar onSave={() => console.log("Save Contact Us", { settings, formSubjects })} />
            </div>
        </div>
    );
}

export default ContactUsSettings;
