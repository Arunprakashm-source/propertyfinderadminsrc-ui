import { useState } from "react";

const OtherDetails = () => {
    const [maidRoomAvailable, setMaidRoomAvailable] = useState(false);

    return (
        <div className="rounded-[15px] bg-white md:p-[20px] p-[16px] border border-[#EAEAEA]">
            <h3 className="text-[20px] font-[Bold] text-[#222] mb-[20px]">Other details</h3>
            <div className="flex flex-col gap-[14px]">
                {/* <div>
                    <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                        Number of bedrooms <span className="text-[#EA3934]">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter number of beds"
                        className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                    />
                    <label className="mt-[8px] inline-flex items-center gap-[8px] cursor-pointer">
                        <input
                            type="checkbox"
                            checked={maidRoomAvailable}
                            onChange={(event) => setMaidRoomAvailable(event.target.checked)}
                            className="h-[13px] w-[13px] rounded border border-[rgba(34,34,34,0.20)]"
                        />
                        <span className="text-[12px] font-[Regular] text-[#707070]">Maid bedroom is available</span>
                    </label>
                </div>

                <div>
                    <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                        Number of bathrooms <span className="text-[#EA3934]">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter number of baths"
                        className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                    />
                </div>

                <div>
                    <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                        Area of the property <span className="text-[#EA3934]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="0.00"
                                className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] pr-[56px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                            />
                            <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[13px] text-[#707070]">Sq.m</span>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="0.00"
                                className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] pr-[56px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                            />
                            <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[13px] text-[#707070]">Sq.ft</span>
                        </div>
                    </div>
                </div> */}

                <div>
                    <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                        DLD Permit number <span className="text-[#EA3934]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
                        <input
                            type="text"
                            placeholder="Enter DLD permit number"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                        />
                        <input
                            type="text"
                            placeholder="Paste the DLD permit url"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                        Monthly rental price <span className="text-[#EA3934]">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter the monthly rental price"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] pr-[52px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                        />
                        <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[13px] text-[#222]">AED</span>
                    </div>
                </div>

                <div>
                    <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                        Maintenance fees <span className="text-[#EA3934]">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter the monthly rental price"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] pr-[42px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                        />
                        <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[13px] text-[#222]">%</span>
                    </div>
                </div>

                <div>
                    <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                        Service charges <span className="text-[#EA3934]">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter the monthly rental price"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] pr-[52px] text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                        />
                        <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[13px] text-[#222]">AED</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherDetails;
