import { useState, useEffect } from "react";
import { VerifiedIcon, SettingIcon, NotificationIcon, LeftArrowWhiteIcon } from "../../assets/icons";
import mainbg from "../../assets/img/mainbg.png";
import { useLocation } from "react-router-dom";
import profileimg from '../../assets/img/user.png'
const Header = ({ title, showBack, onBackClick }: { title: string, showBack: boolean, onBackClick: () => void }) => {
    const [isMdUp, setIsMdUp] = useState(false);
    const location = useLocation();
    const isDashboard = location.pathname === "/developer/dashboard";
    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)");
        const sync = () => setIsMdUp(mql.matches);
        sync();
        mql.addEventListener("change", sync);
        return () => mql.removeEventListener("change", sync);
    }, []);
    return (
        <div className="bg-[#6A3CA8] transition-colors p-[20px] rounded-[12px]">
            <div className="w-full overflow-x-auto scrollbar-hide flex items-center justify-between gap-4">
                <div onClick={onBackClick} className="cursor-pointer flex items-center md:gap-[20px] gap-[14px] shrink-0 w-fit">
                    {showBack && <LeftArrowWhiteIcon width={15} height={isMdUp ? 23 : 17} onClick={onBackClick} />}
                    <h1 className="text-[#FFF] font-[Bold] md:text-[26px] text-[20px] leading-[100%] shrink-0">{title}</h1>
                </div>
                <div className="flex items-center gap-3">
                    {/* <button className="text-[12px] text-[#FFF] font-[Medium] border-2 border-[#00A663] bg-[rgba(0,166,99,0.2)] cursor-pointer flex p-[10px] h-[44px] items-center justify-center rounded-full bg-[#FFF]">
                        <VerifiedIcon className="w-[20px] h-[20px]" /><span className="ml-[8px]"> Verified</span>
                    </button>
                    <button className="cursor-pointer flex p-[14px] items-center justify-center rounded-full bg-[#FFF]">
                        <SettingIcon className="w-[20px] h-[20px]" />
                    </button>
                    <button className="cursor-pointer relative flex p-[14px] items-center justify-center rounded-full bg-[#FFF]">
                        <NotificationIcon className="w-[20px] h-[20px]" />
                        <div className="absolute top-[4px] right-[6px] bg-[#EA3934] rounded-full w-[18px] h-[18px] flex items-center justify-center">
                            <p className="text-[#fff] text-[10px] font-[Bold]">2</p>
                        </div>
                    </button> */}
                    <h4 className="text-[18px] font-[SemiBold] text-[#FFF] ">Arun</h4>
                    <div className="flex-shrink-0 cursor-pointer flex items-center rounded-full border-[2px] border-[#f5f5f5] ">
                        <img src={profileimg} alt="img" className="w-[40px] h-[40px] rounded-full shrink-0 object-cover" />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Header;