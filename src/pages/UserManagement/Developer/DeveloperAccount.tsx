import mainbg from "../../../assets/img/mainbg.png";
import profileimg from "../../../assets/img/profileless.png";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { DownArrowIcon, EditIcon, EyeDarkIcon, PlusUserIcon, SearchIcon, TrashIcon, } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import { Button } from "../../../components/Ui/Button";
import Pagenation from "../../../components/Pagenation/Pagenation";
import { useNavigate } from "react-router-dom";
import InviteDeveloperModal from "./InviteDevModal";


const tableGrid = "grid-cols-[1.3fr_1fr_1.3fr_1.1fr_1fr_1fr]";
type Row = {
    id: number;
    name: string;
    phone: string;
    email: string;
    country: string;
    image: string;
    status: AgentStatusLabel;
};
const rowData: Row[] = [
    {
        id: 1,
        name: "Omniyat Bespoke | Villa",
        phone: "1234567890",
        email: "dubai@gmail.com",
        country: "UAE",
        image: profileimg,
        status: "Approval pending",
    },
    {
        id: 2,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "Norway",
        image: profileimg,
        status: "Active",
    },
    {
        id: 3,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "SouthAfrica",
        image: profileimg,
        status: "Inactive",
    },
    {
        id: 4,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "India",
        image: profileimg,
        status: "Approval Declined",
    },
    {
        id: 5,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "Denmark",
        image: profileimg,
        status: "Active",
    },
    {
        id: 6,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "switzerland",
        image: profileimg,
        status: "Inactive",
    },
];
const sortOptions = ["All", "Active", "Inactive", "Approved Request"];
export type AgentStatusLabel = "Approval pending" | "Active" | "Inactive" | "Approval Declined";

function StatusBadge({ status }: { status: AgentStatusLabel }) {
    if (status === "Approval pending") {
        return (
            <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center border border-[rgba(34,34,34,0.10)] bg-white p-[6px_10px] text-[12px] font-[SemiBold] text-[#222]">
                Approval pending
            </span>
        );
    }
    if (status === "Active") {
        return (
            <span className="bg-[#00A663] rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] text-[#FFF]">
                Active
            </span>
        );
    }
    if (status === "Approval Declined") {
        return (
            <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center border border-[#ea393459] p-[6px_10px] text-[12px] font-[SemiBold] text-[#ea3934] bg-[#ea393414]">
                Approval Declined
            </span>
        );
    }
    return (
        <span className="rounded-[5px] h-[25px] w-fit text-center flex items-center justify-center p-[6px_10px] text-[12px] font-[SemiBold] text-[#FFF] bg-[#E80808]">
            Inactive
        </span>
    );
}
function DeveloperAccount() {
    const [selectedSort, setSelectedSort] = useState("All");
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const sortDropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()
    const [isInviteDeveloperModalOpen, setIsInviteDeveloperModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedRows = rowData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSortDropdown = (option: string) => {
        setSelectedSort(option);
        setIsSortDropdownOpen(false);
    }
    const handleSortDropdownClick = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    }
    return (
        <>
            <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Header
                    title="DeveloperAccount"
                    showBack={false}
                    onBackClick={() => { }}
                />

                {/* Content */}
                <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                    {/* Search and Add New Button */}
                    <div className="flex md:flex-row flex-col  items-center justify-between mb-[30px] gap-[10px]">
                        <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[15px] px-[14px] h-[37px] w-full md:w-[280px]">
                            <SearchIcon className="text-[#707070] shrink-0" />
                            <input
                                type="search"
                                placeholder="Search here"
                                className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-wrap md:items-center gap-[10px]">
                            <div className="flex md:items-center gap-[8px] shrink-0">
                                <div className="relative" ref={sortDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={handleSortDropdownClick}
                                        className="flex items-center justify-between gap-[8px] border border-[rgba(34,34,34,0.10)] bg-white rounded-full px-[14px] h-[37px] cursor-pointer w-[120px]"
                                    >
                                        <span className="text-[#222] text-[12px] font-[SemiBold] truncate">{selectedSort}</span>
                                        <DownArrowIcon className={`transition-transform duration-200 ${isSortDropdownOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {isSortDropdownOpen && (
                                        <div className="absolute left-0 top-[44px] w-full min-w-[180px] bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] py-[8px] z-20 flex flex-col">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        handleSortDropdown(option);
                                                        setIsSortDropdownOpen(false);
                                                    }}
                                                    className={`px-[16px] py-[10px] text-left text-[13px] font-[Medium] cursor-pointer hover:bg-[#F5F5F5] transition-colors ${selectedSort === option ? "text-[#3182CE] bg-[#F5F5F5]" : "text-[#222]"
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsInviteDeveloperModalOpen(true)}
                                    className="cursor-pointer inline-flex items-center justify-center gap-[6px] rounded-full bg-[#6A3CA8] text-[#FFF] px-[15px] h-[37px] text-[12px] font-[SemiBold] shrink-0"
                                >
                                    <PlusUserIcon width={16} height={16} className="text-white" />
                                    Invite Developer
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="overflow-x-auto w-full scrollbar-hide mb-[30px]">
                        <div className="min-w-[1150px]">
                            <div className="rounded-[10px] border border-[rgba(34,34,34,0.08)] overflow-hidden bg-white">
                                <div className={`grid ${tableGrid} gap-[30px] items-center px-[14px] py-[12px] bg-[#F5F5F5] border-b border-[rgba(34,34,34,0.08)]`}>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Name</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Phone</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Email</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Country</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Status</p>
                                    <p className="text-[14px] font-[SemiBold] text-[#222]">Actions</p>
                                </div>

                                <div>
                                    {paginatedRows.map((row, idx) => (
                                        <div
                                            key={row.id}
                                            className={`grid ${tableGrid} gap-[30px] items-center px-[14px] py-[12px] ${idx !== paginatedRows.length - 1 ? "border-b border-[rgba(34,34,34,0.08)]" : ""}`}
                                        >
                                            <div className="flex items-center gap-[10px]">
                                                <img src={row.image} alt="img" className="w-[40px] h-[40px] rounded-[12px] object-cover border border-[rgba(34,34,34,0.08)]" />
                                                <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.name}</p>
                                            </div>
                                            <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.phone}</p>
                                            <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.email}</p>
                                            <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.country}</p>
                                            <StatusBadge status={row.status} />
                                            <div className="flex items-center justify-start gap-[10px]">
                                                <button onClick={() => navigate(`/developeraccountview`)} type="button" className="cursor-pointer p-[6px] " aria-label="Delete">
                                                    <EyeDarkIcon width={20} height={20} />
                                                </button>
                                                <button onClick={() => navigate(`/developeraccountdetail`)} type="button" className="cursor-pointer p-[6px] " aria-label="View">
                                                    <EditIcon width={20} height={20} />
                                                </button>
                                                <button type="button" className="cursor-pointer p-[6px] " aria-label="Delete">
                                                    <TrashIcon width={20} height={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagenation */}
                    <Pagenation
                        currentPage={currentPage}
                        totalItems={rowData.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
            <InviteDeveloperModal isOpen={isInviteDeveloperModalOpen} onClose={() => setIsInviteDeveloperModalOpen(false)} />
        </>
    );
}

export default DeveloperAccount;   