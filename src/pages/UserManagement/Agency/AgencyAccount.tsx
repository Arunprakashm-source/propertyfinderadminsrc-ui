import mainbg from "../../../assets/img/mainbg.png";
import profileimg from "../../../assets/img/profileless.png";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { EditIcon, EyeDarkIcon, SearchIcon, TrashIcon, } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import { Button } from "../../../components/Ui/Button";
import Pagenation from "../../../components/Pagenation/Pagenation";
import { useNavigate } from "react-router-dom";

type Row = {
    id: number;
    name: string;
    phone: string;
    email: string;
    country: string;
    image: string;
};
const rowData: Row[] = [
    {
        id: 1,
        name: "Omniyat Bespoke | Villa",
        phone: "1234567890",
        email: "dubai@gmail.com",
        country: "UAE",
        image: profileimg,
    },
    {
        id: 2,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "Norway",
        image: profileimg,
    },
    {
        id: 3,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "SouthAfrica",
        image: profileimg,
    },
    {
        id: 4,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "India",
        image: profileimg,
    },
    {
        id: 5,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "Denmark",
        image: profileimg,
    },
    {
        id: 6,
        name: "Omniyat Bespoke | Villa",
        phone: "9898980909",
        email: "dubai@gmail.com",
        country: "switzerland",
        image: profileimg,
    },
];

function AgencyAccount() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedRows = rowData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            {/* Header */}
            <Header
                title="AgencyAccount"
                showBack={false}
                onBackClick={() => { }}
            />

            {/* Content */}
            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                {/* Search and Add New Button */}
                <div className="flex items-center justify-between mb-[30px] gap-[10px]">
                    <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[15px] px-[14px] h-[40px] w-full md:w-[280px]">
                        <SearchIcon className="text-[#707070] shrink-0" />
                        <input
                            type="search"
                            placeholder="Search here"
                            className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] focus:outline-none"
                        />
                    </div>
                </div>
                {/* Table */}
                <div className="overflow-x-auto w-full scrollbar-hide mb-[30px]">
                    <div className="min-w-[1150px]">
                        <div className="rounded-[10px] border border-[rgba(34,34,34,0.08)] overflow-hidden bg-white">
                            <div className="grid grid-cols-[1.3fr_1fr_1.3fr_1.1fr_1fr] gap-[30px] items-center px-[14px] py-[12px] bg-[#F5F5F5] border-b border-[rgba(34,34,34,0.08)]">
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Name</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Phone</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Email</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Country</p>
                                <p className="text-[14px] font-[SemiBold] text-[#222]">Actions</p>
                            </div>

                            <div>
                                {paginatedRows.map((row, idx) => (
                                    <div
                                        key={row.id}
                                        className={`grid grid-cols-[1.3fr_1fr_1.3fr_1.1fr_1fr] gap-[30px] items-center px-[14px] py-[12px] ${idx !== paginatedRows.length - 1 ? "border-b border-[rgba(34,34,34,0.08)]" : ""}`}
                                    >
                                        <div className="flex items-center gap-[10px]">
                                            <img src={row.image} alt="img" className="w-[40px] h-[40px] rounded-[12px] object-cover border border-[rgba(34,34,34,0.08)]" />
                                            <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.name}</p>
                                        </div>
                                        <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.phone}</p>
                                        <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.email}</p>
                                        <p className="text-[12px] font-[Regular] text-[#222] truncate">{row.country}</p>
                                        <div className="flex items-center justify-start gap-[10px]">
                                            <button onClick={() => navigate(`/agencyaccountdetail`)} type="button" className="cursor-pointer p-[6px] " aria-label="View">
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
    );
}

export default AgencyAccount;   