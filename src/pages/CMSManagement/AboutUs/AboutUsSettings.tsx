import { useState } from "react";
import Header from "../../../components/Header/Header";
import { defaultAboutUsSettings } from "../cmsData";
import {
    SaveBar,
    SeoSection,
    TextAreaField,
    TextField,
    sectionClass,
    sectionTitleClass,
} from "../shared/CmsFormShared";

function AboutUsSettings() {
    const [settings, setSettings] = useState(defaultAboutUsSettings);
    const [timeline, setTimeline] = useState([
        { id: 1, date: "Sept 12, 2023", title: "Announcing one of the largest investment rounds...", description: "Investment milestone description.", displayOrder: 1 },
        { id: 2, date: "Sept 12, 2021", title: "Unveiling the first-ever White Paper...", description: "White paper launch description.", displayOrder: 2 },
        { id: 3, date: "Sept 05, 2019", title: "Buyback of Shares from BECO Capital", description: "Buyback announcement description.", displayOrder: 3 },
    ]);

    const update = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="About Us" showBack={false} onBackClick={() => {}} />

            <div className="mt-[20px]">
                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Hero Section</h3>
                    <div className="grid grid-cols-1 gap-[16px]">
                        <TextField label="Main Headline" value={settings.heroHeadline} onChange={(v) => update("heroHeadline", v)} required />
                        <TextAreaField label="Sub-headline" value={settings.heroSubheadline} onChange={(v) => update("heroSubheadline", v)} rows={2} />
                        <TextField label="Scrolling Banner Text" value={settings.bannerText} onChange={(v) => update("bannerText", v)} placeholder="★ UNLOCK YOUR POTENTIAL" />
                        <p className="text-[13px] text-[#707070]">Hero image gallery: upload 3 images (Image 1, Image 2, Image 3) — wire to media API when backend is ready.</p>
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Business Services Section</h3>
                    <div className="grid grid-cols-1 gap-[16px]">
                        <TextField label="Section Title" value={settings.businessSectionTitle} onChange={(v) => update("businessSectionTitle", v)} />
                        <TextAreaField label="Paragraph 1" value={settings.businessParagraph1} onChange={(v) => update("businessParagraph1", v)} />
                        <TextAreaField label="Paragraph 2" value={settings.businessParagraph2} onChange={(v) => update("businessParagraph2", v)} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                            <TextField label="Primary CTA Label" value={settings.businessCtaPrimaryLabel} onChange={(v) => update("businessCtaPrimaryLabel", v)} />
                            <TextField label="Primary CTA URL" value={settings.businessCtaPrimaryUrl} onChange={(v) => update("businessCtaPrimaryUrl", v)} />
                            <TextField label="Secondary CTA Label" value={settings.businessCtaSecondaryLabel} onChange={(v) => update("businessCtaSecondaryLabel", v)} />
                            <TextField label="Secondary CTA URL" value={settings.businessCtaSecondaryUrl} onChange={(v) => update("businessCtaSecondaryUrl", v)} />
                        </div>
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Statistics Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
                        <TextField label="Stat 1 Value" value={settings.stat1Value} onChange={(v) => update("stat1Value", v)} placeholder="100%" />
                        <TextAreaField label="Stat 1 Description" value={settings.stat1Description} onChange={(v) => update("stat1Description", v)} rows={2} />
                        <TextField label="Stat 2 Value" value={settings.stat2Value} onChange={(v) => update("stat2Value", v)} placeholder="90%" />
                        <TextAreaField label="Stat 2 Description" value={settings.stat2Description} onChange={(v) => update("stat2Description", v)} rows={2} />
                        <TextField label="Stat 3 Value" value={settings.stat3Value} onChange={(v) => update("stat3Value", v)} placeholder="10k+" />
                        <TextAreaField label="Stat 3 Description" value={settings.stat3Description} onChange={(v) => update("stat3Description", v)} rows={2} />
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Our Success Timeline</h3>
                    {timeline.map((entry, index) => (
                        <div key={entry.id} className="border border-[#EAEAEA] rounded-[10px] p-[16px] mb-[12px]">
                            <p className="text-[14px] font-[Bold] text-[#222] mb-[12px]">Entry {index + 1}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
                                <TextField label="Date" value={entry.date} onChange={(v) => setTimeline((prev) => prev.map((e) => (e.id === entry.id ? { ...e, date: v } : e)))} />
                                <TextField label="Title" value={entry.title} onChange={(v) => setTimeline((prev) => prev.map((e) => (e.id === entry.id ? { ...e, title: v } : e)))} />
                                <div className="md:col-span-2">
                                    <TextAreaField label="Description" value={entry.description} onChange={(v) => setTimeline((prev) => prev.map((e) => (e.id === entry.id ? { ...e, description: v } : e)))} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <p className="text-[13px] text-[#707070]">Featured property image: single image upload field — wire to media API when backend is ready.</p>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Call to Action Section</h3>
                    <div className="grid grid-cols-1 gap-[16px]">
                        <TextField label="Headline" value={settings.ctaHeadline} onChange={(v) => update("ctaHeadline", v)} />
                        <TextAreaField label="Sub-headline" value={settings.ctaSubheadline} onChange={(v) => update("ctaSubheadline", v)} rows={2} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                            <TextField label="Button Label" value={settings.ctaButtonLabel} onChange={(v) => update("ctaButtonLabel", v)} />
                            <TextField label="Button URL" value={settings.ctaButtonUrl} onChange={(v) => update("ctaButtonUrl", v)} />
                        </div>
                    </div>
                </div>

                <SeoSection seo={settings.seo} onChange={(seo) => update("seo", seo)} />
                <SaveBar onSave={() => console.log("Save About Us", { settings, timeline })} />
            </div>
        </div>
    );
}

export default AboutUsSettings;
