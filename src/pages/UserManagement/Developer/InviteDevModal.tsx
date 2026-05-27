import { useEffect, useRef, useState } from "react";
import { CalenderIcon, CancelIcon, DownArrowIcon, LeftArrowIcon, RightArrowIcon } from "../../../assets/icons";

interface InviteDeveloperModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InviteDeveloperModal = ({ isOpen, onClose }: InviteDeveloperModalProps) => {


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center md:items-center items-end z-[9999]"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            {/* Modal container */}
            <div className="relative bg-white w-full md:max-w-[480px] h-auto transform transition-all duration-300 rounded-t-[15px] md:rounded-[15px] max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header fixed */}
                <div className="shrink-0 flex justify-end  p-[20px_20px_0px_20px] ">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer h-[40px] w-[40px] rounded-[12px] border border-[rgba(34,34,34,0.10)] bg-white flex items-center justify-center"
                    >
                        <CancelIcon width={14} height={14} />
                    </button>
                </div>

                {/* Content section */}
                <div className="flex-1 overflow-y-auto p-[0px_20px] md:p-[0px_50px]">
                    <h2 className="text-center text-[20px] font-[Bold] text-[#222] leading-[1]">
                        Invite Developer
                    </h2>
                    <div className="flex flex-col gap-[24px] mt-[35px]">
                        {/* Agent name */}
                        <div>
                            <label className="text-[14px] font-[Bold] text-[#222] block mb-[6px]">
                                Developer name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter developer name"
                                className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[14px] text-[#222] placeholder:text-[#707070] placeholder:text-[13px] placeholder:font-[Regular] focus:outline-none"
                            />
                        </div>
                        {/* Agent Email address */}
                        <div>
                            <label className="text-[14px] font-[Bold] text-[#222] block mb-[6px]">
                                Developer Email address
                            </label>
                            <input
                                type="text"
                                placeholder="Enter developer email address"
                                className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[14px] text-[#222] placeholder:text-[#707070] placeholder:text-[13px] placeholder:font-[Regular] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Save button fixed bottom */}
                <div className="shrink-0  p-[20px_20px_20px_20px] md:p-[30px_50px_60px_50px]">
                    <button
                        type="button"
                        className="h-[44px] w-full rounded-[10px] bg-[#6A3CA8] text-white text-[14px] font-[Bold]"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InviteDeveloperModal;






