import { useState } from "react";
import { EditIcon, SearchIcon, TrashIcon } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import Pagenation from "../../../components/Pagenation/Pagenation";
import { useNavigate } from "react-router-dom";
import { defaultTeamPageSettings, teamMembersSeed } from "../cmsData";
import { SaveBar, SeoSection, TextAreaField, TextField, sectionClass, sectionTitleClass } from "../shared/CmsFormShared";
import profileimg from "../../../assets/img/profileless.png";

function TeamManagement() {
    const navigate = useNavigate();
    const [pageSettings, setPageSettings] = useState(defaultTeamPageSettings);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const paginatedRows = teamMembersSeed.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="Our Team" showBack={false} onBackClick={() => {}} />

            <div className="mt-[20px]">
                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Page Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <TextField label="Page Title" value={pageSettings.pageTitle} onChange={(v) => setPageSettings((p) => ({ ...p, pageTitle: v }))} required />
                        <TextField label="Items Per Page" value={String(pageSettings.itemsPerPage)} onChange={(v) => setPageSettings((p) => ({ ...p, itemsPerPage: Number(v) || 24 }))} type="number" />
                        <div className="md:col-span-2">
                            <TextAreaField label="Page Subtitle" value={pageSettings.pageSubtitle} onChange={(v) => setPageSettings((p) => ({ ...p, pageSubtitle: v }))} />
                        </div>
                    </div>
                    <SeoSection seo={pageSettings.seo} onChange={(seo) => setPageSettings((p) => ({ ...p, seo }))} />
                </div>

                <div className="p-[20px] bg-[#fff] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                    <div className="flex items-center justify-between mb-[30px] gap-[10px] flex-wrap">
                        <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[15px] px-[14px] h-[40px] w-full md:w-[280px]">
                            <SearchIcon className="text-[#707070] shrink-0" />
                            <input type="search" placeholder="Search by name or role" className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] focus:outline-none" />
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate("/cmsteamdetail")}
                            className="h-[40px] px-[18px] rounded-[10px] bg-[#6A3CA8] text-[#fff] text-[13px] font-[Bold] cursor-pointer"
                        >
                            + Add Team Member
                        </button>
                    </div>

                    <div className="overflow-x-auto w-full scrollbar-hide mb-[30px]">
                        <div className="min-w-[750px]">
                            <div className="rounded-[10px] border border-[rgba(34,34,34,0.08)] overflow-hidden bg-white">
                                <div className="grid grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr] gap-[20px] items-center px-[14px] py-[12px] bg-[#F5F5F5] border-b border-[rgba(34,34,34,0.08)]">
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Name</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Job Title</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Status</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Actions</p>
                                </div>
                                {paginatedRows.map((row) => (
                                    <div key={row.id} className="grid grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr] gap-[20px] items-center px-[14px] py-[14px] border-b border-[rgba(34,34,34,0.06)]">
                                        <div className="flex items-center gap-[10px]">
                                            <img src={row.profileImage || profileimg} alt={row.fullName} className="w-[36px] h-[36px] rounded-full object-cover" />
                                            <p className="text-[13px] font-[Medium] text-[#222]">{row.fullName}</p>
                                        </div>
                                        <p className="text-[13px] font-[Regular] text-[#707070]">{row.jobTitle}</p>
                                        <span className={`text-[12px] font-[Medium] px-[10px] py-[4px] rounded-full w-fit ${row.isActive ? "bg-[#E8F5EE] text-[#05A666]" : "bg-[#F5F5F5] text-[#707070]"}`}>
                                            {row.isActive ? "Active" : "Inactive"}
                                        </span>
                                        <div className="flex items-center gap-[10px]">
                                            <button type="button" onClick={() => navigate("/cmsteamdetail")} className="cursor-pointer">
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
                    <Pagenation currentPage={currentPage} totalPages={Math.ceil(teamMembersSeed.length / itemsPerPage)} onPageChange={setCurrentPage} />
                </div>

                <SaveBar onSave={() => console.log("Save Team Page", pageSettings)} />
            </div>
        </div>
    );
}

export default TeamManagement;
