import { useEffect, useRef, useState } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
function ListingPropertyInquiry() {
    const navigate = useNavigate();
    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header
                title="Listing Property Inquiry"
                showBack={true}
                onBackClick={() => navigate(-1)}
            />

            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">

            </div>
        </div>
    );
}

export default ListingPropertyInquiry;
