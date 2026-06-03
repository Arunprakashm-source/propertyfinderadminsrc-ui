import { useRef, useState, useEffect } from "react";
import { CalenderIcon, DownArrowIcon, LeftArrowIcon, RightArrowIcon } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import EditProject from "./EditProject/EditProject";
import AdditionalProject from "./AdditionalProject/AdditionalProject";

type ListingDetailTabId = "details" | "additional";

function ListingProjectDetail() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ListingDetailTabId>("details");
    const tabs: { id: ListingDetailTabId; label: string }[] = [
        { id: "details", label: "Project Details" },
        { id: "additional", label: "Additional Details" },
    ];


    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header
                title="Listing Project Detail"
                showBack={true}
                onBackClick={() => navigate(-1)}
            />

            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                <div className="rounded-t-[12px] border-b border-[rgba(34,34,34,0.08)] overflow-x-auto">
                    <div className="min-w-max flex items-center gap-[4px] mt-[8px]">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`cursor-pointer p-[16px_24px] border-b-2 text-[13px] font-[SemiBold] whitespace-nowrap transition-colors ${isActive ? "text-[#0832AE] border-[#0832AE]" : "text-[#222] border-transparent"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {activeTab === "details" && (
                    <>
                        <EditProject />
                    </>
                )}
                {activeTab === "additional" && (
                    <>
                        <AdditionalProject />
                    </>
                )}
            </div>
        </div>
    );
}

export default ListingProjectDetail;
