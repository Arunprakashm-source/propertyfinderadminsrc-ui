import { DownArrowIcon, SearchIcon } from "../../../../assets/icons";
import { useMemo, useState } from "react";

const ProjectLocation = () => {
    const [isZoneDropdownOpen, setIsZoneDropdownOpen] = useState(false);
    const [zone, setZone] = useState("Dubai");
    const [searchLocation, setSearchLocation] = useState("Business Bay, Dubai");
    const zoneOptions = ["Dubai", "Business Bay, Dubai", "Downtown Dubai", "Dubai Marina"];

    const mapSrc = useMemo(() => {
        const q = encodeURIComponent(searchLocation || zone || "Dubai");
        return `https://maps.google.com/maps?q=${q}&z=14&output=embed`;
    }, [searchLocation, zone]);
    return (
        <div>
            <div className="flex flex-col border border-[rgba(34,34,34,0.06)] rounded-[12px]">
                <div className="bg-white  p-[16px] md:p-[20px] ">
                    <h3 className="text-[20px] font-[Bold] text-[#222] mb-[14px]">Location</h3>
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                            Zone location <span className="text-[#EA3934]">*</span>
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsZoneDropdownOpen((prev) => !prev)}
                                className="cursor-pointer h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] bg-white px-[12px] pr-[20px] text-[13px] text-[#222] flex items-center justify-between"
                            >
                                <span>{zone}</span>
                                <DownArrowIcon
                                    width={10}
                                    height={7}
                                    className={`transition-transform ${isZoneDropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {isZoneDropdownOpen && (
                                <div className="absolute left-0 right-0 top-[48px] z-20 rounded-[10px] border border-[rgba(34,34,34,0.10)] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] py-[6px] max-h-[200px] overflow-y-auto">
                                    {zoneOptions.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => {
                                                setZone(option);
                                                setSearchLocation(option);
                                                setIsZoneDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-[12px] py-[8px] text-[13px] ${zone === option ? "text-[#0832AE] bg-[#F5F7FF]" : "text-[#222] hover:bg-[#F5F5F5]"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white border-t border-[rgba(34,34,34,0.06)] p-[16px] md:p-[20px]">
                    <h4 className="text-[20px] font-[Bold] text-[#222] text-center md:mb-[30px] mb-[16px]">Pin location on map</h4>

                    <div className="max-w-[360px] mx-auto md:mb-[40px] mb-[20px]">
                        <div className="h-[36px] rounded-full bg-[#F5F5F5] px-[12px] flex items-center gap-[8px]">
                            <SearchIcon width={14} height={14} />
                            <input
                                type="text"
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                placeholder="Search location"
                                className="w-full bg-transparent text-[12px] font-[Regular] text-[#222] placeholder:text-[#707070] placeholder:text-[12px] placeholder:font-[Regular] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="rounded-[12px] border border-[rgba(34,34,34,0.08)] bg-[#EEF2F7] min-h-[360px] xl:w-[760px] lg:w-[550px] md:w-[550px] w-full mx-auto overflow-hidden">
                        <iframe
                            title="Google map location picker"
                            src={mapSrc}
                            className="h-[360px] w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectLocation;
