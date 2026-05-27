import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import {
    blogCategoriesSeed,
    blogPostsSeed,
    blogTagsSeed,
} from "../cmsData";
import {
    Dropdown,
    SaveBar,
    SeoSection,
    TextAreaField,
    TextField,
    Toggle,
    sectionClass,
    sectionTitleClass,
} from "../shared/CmsFormShared";

const STATUS_OPTIONS = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
];

function BlogDetailSettings() {
    const navigate = useNavigate();
    const initialPost = blogPostsSeed[0];
    const [title, setTitle] = useState(initialPost?.title ?? "");
    const [slug, setSlug] = useState(initialPost?.slug ?? "");
    const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
    const [content, setContent] = useState(initialPost?.content ?? "");
    const [coverImage, setCoverImage] = useState(initialPost?.coverImage ?? "");
    const [coverImagePreview, setCoverImagePreview] = useState(initialPost?.coverImage ?? "");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const objectUrlRef = useRef<string | null>(null);
    const [categoryId, setCategoryId] = useState(String(initialPost?.categoryId ?? 1));
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>(initialPost?.tagIds ?? [1]);
    const [authorName, setAuthorName] = useState(initialPost?.authorName ?? "Admin");
    const [readTime, setReadTime] = useState(initialPost?.readTime ?? "5 min read");
    const [publishDate, setPublishDate] = useState(initialPost?.publishDate ?? "2026-05-27");
    const [displayOrder, setDisplayOrder] = useState(initialPost?.displayOrder ?? 1);
    const [isFeatured, setIsFeatured] = useState(initialPost?.isFeatured ?? false);
    const [isPublished, setIsPublished] = useState(initialPost?.isPublished ?? true);
    const [seo, setSeo] = useState(initialPost?.seo ?? {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
    });

    const selectedTagsText = useMemo(() => {
        return selectedTagIds
            .map((tagId) => blogTagsSeed.find((tag) => tag.id === tagId)?.name)
            .filter(Boolean)
            .join(", ");
    }, [selectedTagIds]);

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="Blog Detail" showBack={true} onBackClick={() => navigate("/cmsblogs")} />

            <div className="mt-[20px]">
                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Primary Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <TextField label="Title" value={title} onChange={setTitle} required />
                        <TextField label="Slug" value={slug} onChange={setSlug} required />
                        <div className="md:col-span-2">
                            <TextAreaField label="Excerpt" value={excerpt} onChange={setExcerpt} rows={3} />
                        </div>
                        <div className="md:col-span-2">
                            <TextAreaField
                                label="Article Content (Rich Text / HTML)"
                                value={content}
                                onChange={setContent}
                                rows={14}
                                placeholder="Add heading, paragraphs, bullets, quotes, and links for blog detail screen..."
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Media & Metadata</h3>
                    <div className="border border-[#EAEAEA] rounded-[12px] p-[16px] mb-[16px]">
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[10px]">Cover Image Upload</label>
                        <div className="flex items-center gap-[12px] flex-wrap">
                            <div className="w-[120px] h-[80px] rounded-[8px] border border-[#EAEAEA] bg-[#F5F5F5] overflow-hidden flex items-center justify-center">
                                {coverImagePreview ? (
                                    <img src={coverImagePreview} alt="Cover preview" className="w-full h-full object-cover" />
                                ) : (
                                    <p className="text-[11px] text-[#707070] px-[8px] text-center">No image</p>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    if (objectUrlRef.current?.startsWith("blob:")) {
                                        URL.revokeObjectURL(objectUrlRef.current);
                                    }
                                    const objectUrl = URL.createObjectURL(file);
                                    objectUrlRef.current = objectUrl;
                                    setCoverImagePreview(objectUrl);
                                    setCoverImage(file.name);
                                    e.currentTarget.value = "";
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="h-[38px] px-[14px] rounded-[8px] bg-[#222] text-[#fff] text-[13px] font-[Medium] cursor-pointer"
                            >
                                Upload Image
                            </button>
                            {coverImagePreview && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (objectUrlRef.current?.startsWith("blob:")) {
                                            URL.revokeObjectURL(objectUrlRef.current);
                                        }
                                        objectUrlRef.current = null;
                                        setCoverImagePreview("");
                                        setCoverImage("");
                                    }}
                                    className="h-[38px] px-[14px] rounded-[8px] border border-[#EAEAEA] text-[#EA3934] text-[13px] font-[Medium] cursor-pointer"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <p className="text-[12px] text-[#707070] mt-[8px]">
                            Upload from your system. This is local preview for now; wire to media API for persistent storage.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <TextField label="Cover Image URL" value={coverImage} onChange={setCoverImage} placeholder="https://..." />
                        <Dropdown
                            label="Category"
                            value={categoryId}
                            options={blogCategoriesSeed.map((category) => ({
                                value: String(category.id),
                                label: category.name,
                            }))}
                            onChange={setCategoryId}
                        />
                        <TextField label="Author Name" value={authorName} onChange={setAuthorName} />
                        <TextField label="Estimated Read Time" value={readTime} onChange={setReadTime} placeholder="5 min read" />
                        <TextField label="Publish Date" value={publishDate} onChange={setPublishDate} type="date" />
                        <TextField label="Display Order" value={String(displayOrder)} onChange={(v) => setDisplayOrder(Number(v) || 1)} type="number" />
                        <div>
                            <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">Status</label>
                            <Dropdown
                                label=""
                                value={isPublished ? "published" : "draft"}
                                options={STATUS_OPTIONS}
                                onChange={(v) => setIsPublished(v === "published")}
                            />
                        </div>
                        <Toggle label="Featured Article" checked={isFeatured} onChange={setIsFeatured} />
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Tags</h3>
                    <p className="text-[13px] text-[#707070] mb-[10px]">
                        Click to include tags in the blog card and detail page.
                    </p>
                    <div className="flex flex-wrap gap-[8px]">
                        {blogTagsSeed.map((tag) => {
                            const active = selectedTagIds.includes(tag.id);
                            return (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() =>
                                        setSelectedTagIds((prev) =>
                                            active ? prev.filter((id) => id !== tag.id) : [...prev, tag.id]
                                        )
                                    }
                                    className={`px-[12px] py-[8px] rounded-[20px] text-[12px] font-[Medium] cursor-pointer border ${
                                        active ? "bg-[#6A3CA8] text-white border-[#6A3CA8]" : "bg-white text-[#222] border-[#EAEAEA]"
                                    }`}
                                >
                                    {tag.name}
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-[12px] text-[#707070] mt-[8px]">Selected: {selectedTagsText || "None"}</p>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Detail Page Blocks</h3>
                    <p className="text-[13px] text-[#707070]">
                        Manage these blocks from this post editor:
                        hero image, quote, gallery cards, related posts, and comments visibility.
                    </p>
                </div>

                <SeoSection seo={seo} onChange={setSeo} />
                <SaveBar
                    onSave={() =>
                        console.log("Save Blog Detail", {
                            title,
                            slug,
                            excerpt,
                            content,
                            coverImage,
                            categoryId,
                            selectedTagIds,
                            authorName,
                            readTime,
                            publishDate,
                            displayOrder,
                            isFeatured,
                            isPublished,
                            seo,
                        })
                    }
                />
            </div>
        </div>
    );
}

export default BlogDetailSettings;
