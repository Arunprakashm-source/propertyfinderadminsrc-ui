import { useMemo, useState } from "react";
import { EditIcon, SearchIcon, TrashIcon } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import Pagenation from "../../../components/Pagenation/Pagenation";
import { useNavigate } from "react-router-dom";
import {
    blogCategoriesSeed,
    blogPostsSeed,
    defaultBlogPageSettings,
} from "../cmsData";
import {
    SaveBar,
    SeoSection,
    TextAreaField,
    TextField,
    Toggle,
    sectionClass,
    sectionTitleClass,
} from "../shared/CmsFormShared";

function BlogManagement() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(defaultBlogPageSettings);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPosts = useMemo(() => {
        return blogPostsSeed.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const itemsPerPage = 5;
    const paginatedRows = filteredPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="Blog Management" showBack={false} onBackClick={() => { }} />

            <div className="mt-[20px]">
                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Blog Overview Page Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <TextField label="Page Title" value={settings.pageTitle} onChange={(v) => setSettings((p) => ({ ...p, pageTitle: v }))} />
                        <TextAreaField label="Page Subtitle" value={settings.pageSubtitle} onChange={(v) => setSettings((p) => ({ ...p, pageSubtitle: v }))} rows={2} />
                        <TextField label="Featured Section Title" value={settings.featuredSectionTitle} onChange={(v) => setSettings((p) => ({ ...p, featuredSectionTitle: v }))} />
                        <TextField label="Featured Section Subtitle" value={settings.featuredSectionSubtitle} onChange={(v) => setSettings((p) => ({ ...p, featuredSectionSubtitle: v }))} />
                        <TextField label="Items Per Page" value={String(settings.itemsPerPage)} onChange={(v) => setSettings((p) => ({ ...p, itemsPerPage: Number(v) || 15 }))} type="number" />
                        <Toggle label="Show Search Bar" checked={settings.showSearch} onChange={(v) => setSettings((p) => ({ ...p, showSearch: v }))} />
                        <Toggle label="Show Category Filters" checked={settings.showCategoryFilters} onChange={(v) => setSettings((p) => ({ ...p, showCategoryFilters: v }))} />
                        <Toggle label="Show Recent Posts Sidebar" checked={settings.showRecentPostsSidebar} onChange={(v) => setSettings((p) => ({ ...p, showRecentPostsSidebar: v }))} />
                        <Toggle label="Enable Comments" checked={settings.enableComments} onChange={(v) => setSettings((p) => ({ ...p, enableComments: v }))} />
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Taxonomy</h3>
                    <p className="text-[13px] text-[#707070] mb-[8px]">
                        Categories: {blogCategoriesSeed.map((c) => c.name).join(", ")}
                    </p>
                </div>

                <div className="p-[20px] bg-[#fff] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px] mb-[20px]">
                    <div className="flex items-center justify-between mb-[30px] gap-[10px] flex-wrap">
                        <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[15px] px-[14px] h-[40px] w-full md:w-[280px]">
                            <SearchIcon className="text-[#707070] shrink-0" />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search blog title"
                                className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] focus:outline-none"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate("/cmsblogdetail")}
                            className="h-[40px] px-[18px] rounded-[10px] bg-[#6A3CA8] text-[#fff] text-[13px] font-[Bold] cursor-pointer"
                        >
                            + Add Blog Post
                        </button>
                    </div>

                    <div className="overflow-x-auto w-full scrollbar-hide mb-[30px]">
                        <div className="min-w-[850px]">
                            <div className="rounded-[10px] border border-[rgba(34,34,34,0.08)] overflow-hidden bg-white">
                                <div className="grid grid-cols-[1.8fr_1fr_1fr_0.8fr_0.8fr] gap-[16px] items-center px-[14px] py-[12px] bg-[#F5F5F5] border-b border-[rgba(34,34,34,0.08)]">
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Title</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Category</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Publish Date</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Status</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Actions</p>
                                </div>
                                {paginatedRows.map((post) => (
                                    <div key={post.id} className="grid grid-cols-[1.8fr_1fr_1fr_0.8fr_0.8fr] gap-[16px] items-center px-[14px] py-[14px] border-b border-[rgba(34,34,34,0.06)]">
                                        <p className="text-[13px] font-[Medium] text-[#222]">{post.title}</p>
                                        <p className="text-[13px] text-[#707070]">{blogCategoriesSeed.find((c) => c.id === post.categoryId)?.name ?? "-"}</p>
                                        <p className="text-[13px] text-[#707070]">{post.publishDate}</p>
                                        <span className={`text-[12px] font-[Medium] px-[10px] py-[4px] rounded-full w-fit ${post.isPublished ? "bg-[#E8F5EE] text-[#05A666]" : "bg-[#FFF2F2] text-[#EA3934]"}`}>
                                            {post.isPublished ? "Published" : "Draft"}
                                        </span>
                                        <div className="flex items-center gap-[10px]">
                                            <button type="button" onClick={() => navigate("/cmsblogdetail")} className="cursor-pointer">
                                                <EditIcon />
                                            </button>
                                            <button type="button" className="cursor-pointer">
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Pagenation
                        currentPage={currentPage}
                        totalPages={Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage))}
                        onPageChange={setCurrentPage}
                    />
                </div>

                <SeoSection seo={settings.seo} onChange={(seo) => setSettings((p) => ({ ...p, seo }))} />
                <SaveBar onSave={() => console.log("Save Blog Settings", settings)} />
            </div>
        </div>
    );
}

export default BlogManagement;
