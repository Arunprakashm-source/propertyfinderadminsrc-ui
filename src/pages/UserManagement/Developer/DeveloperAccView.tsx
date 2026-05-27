import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CopyDarkIcon, TrashIcon, EditIcon } from "../../../assets/icons";
import profileimg from "../../../assets/img/profileless.png";
import Header from "../../../components/Header/Header";

const DeveloperAccView = () => {
    const navigate = useNavigate();


    const row = (label: string, value: ReactNode) => (
        <div
            key={label}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 p-[10px_0px] border-b border-[rgba(34,34,34,0.08)] last:border-b-0 text-[14px]"
        >
            <span className="text-[14px] text-[#222] font-[Regular] shrink-0">{label}</span>
            <div className="text-[14px] text-[#222] font-[Bold] min-w-0 sm:text-right sm:max-w-[min(100%,280px)] break-all">{value}</div>
        </div>
    );

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8 flex flex-col gap-[20px]">
            <Header title="Developer View" showBack={true} onBackClick={() => navigate(-1)} />
            {/* Developer Header*/}

            {/* Agent details */}
            <div className="rounded-[15px] bg-white overflow-hidden min-w-0">
                <div className="flex flex-col xl:flex-row xl:items-stretch">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-[18px] md:text-[20px] font-[Bold] text-[#222] leading-tight mb-6">Developer View</h2>
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                            <div className="shrink-0">
                                <div className="h-[210px] w-[210px] shrink-0 overflow-hidden rounded-[12px]">
                                    <img src={profileimg} alt="" className="h-full w-full object-cover" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col">
                                {row("Job role", <span className="font-[Bold] text-[#222]">Developer Name</span>)}
                                {row("Email address", <span className="font-[Bold] text-[#222]">developer@example.com</span>)}
                                {row("Phone number", <span className="font-[Bold] text-[#222]">+971 50 123 4567</span>)}
                                {row("Experience", <span className="font-[Bold] text-[#222]">1 year</span>)}
                                {row("Nationality", <span className="font-[Bold] text-[#222]">United Arab Emirates</span>)}
                                {row("Language known", <span className="font-[Bold] text-[#222] sm:text-right">English, Arabic</span>)}
                                {row(
                                    "Linkedin",
                                    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3 min-w-0">
                                        <span className="font-[Bold] text-[#222] text-[13px] break-all sm:text-right sm:max-w-[min(100%,280px)]">
                                            https://www.linkedin.com/in/developer-name
                                        </span>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-[15px] md:p-[22px] p-[20px] min-w-0 flex justify-between flex-wrap gap-[20px]">

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto lg:justify-end">
                    <button
                        type="button"
                        className="cursor-pointer inline-flex items-center justify-center gap-[6px] rounded-full bg-[#6A3CA8] px-[14px] h-[38px] md:w-[120px] w-full text-[12px] font-[SemiBold] text-[#FFF] shrink-0"
                    >

                        Approved
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer inline-flex items-center justify-center gap-[6px] rounded-full bg-[#222222] px-[14px] h-[38px] md:w-[120px] w-full text-[12px] font-[SemiBold] text-[#FFF] shrink-0"
                    >

                        Declined
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeveloperAccView;
