import React from 'react'
import companyimg from "../../../../assets/img/C10.jpg";
import companyimg2 from "../../../../assets/img/C11.jpg";
import companyimg3 from "../../../../assets/img/C12.jpg";
import companyimg4 from "../../../../assets/img/C13.jpg";
import companyimg5 from "../../../../assets/img/C15.jpg";
import companyimg6 from "../../../../assets/img/C14.jpg";
type Agency = {
    name: string;
    img: string;
};
const agencies: Agency[] = [
    { name: "Elite Property Brokerage", img: companyimg },
    { name: "McCone Properties", img: companyimg2 },
    { name: "Arabian Estates", img: companyimg3 },
    { name: "Provident Real Estate", img: companyimg4 },
    { name: "Paragon Properties", img: companyimg5 },
    { name: "Betterhomes LLC", img: companyimg6 },
];
function AdditionalProject() {
    return (
        <div>

            {/* Authorized agencies */}
            <div className="mt-[20px] rounded-[15px] bg-white md:p-[30px] p-[20px] flex flex-col gap-8 sm:gap-10 min-w-0 shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)]">
                <section>
                    <h2 className="text-[20px] font-[Bold] text-[#222] mb-[20px]">Authorized agencies</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {agencies.map((agency) => (
                            <div
                                key={agency.name}
                                className="flex items-center gap-3 rounded-[10px] bg-[#F5F5F5] h-[90px] p-[6px_10px_6px_4px]"
                            >
                                <img
                                    src={agency.img}
                                    alt=""
                                    className="h-[85px] w-[85px] shrink-0 rounded-[10px] object-cover"
                                />
                                <span className="text-[15px] font-[Bold] text-[#222] leading-[165%]">{agency.name}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdditionalProject