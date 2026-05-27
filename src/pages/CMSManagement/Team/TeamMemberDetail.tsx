import { useRef, useState } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import profileimg from "../../../assets/img/profileless.png";
import { SaveBar, TextField, Toggle, sectionClass, sectionTitleClass } from "../shared/CmsFormShared";

function TeamMemberDetail() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fullName, setFullName] = useState("William James");
    const [jobTitle, setJobTitle] = useState("Senior Property Consultant");
    const [displayOrder, setDisplayOrder] = useState(1);
    const [isActive, setIsActive] = useState(true);
    const [preview, setPreview] = useState<string | null>(null);

    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            <Header title="Team Member" showBack={true} onBackClick={() => navigate("/cmsteam")} />

            <div className="mt-[20px]">
                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Member Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                        <TextField label="Full Name" value={fullName} onChange={setFullName} required />
                        <TextField label="Job Title / Role" value={jobTitle} onChange={setJobTitle} required />
                        <TextField label="Display Order" value={String(displayOrder)} onChange={(v) => setDisplayOrder(Number(v) || 0)} type="number" />
                        <Toggle label="Status" checked={isActive} onChange={setIsActive} />
                    </div>
                </div>

                <div className={sectionClass}>
                    <h3 className={sectionTitleClass}>Profile Picture</h3>
                    <div className="flex items-center gap-[16px] flex-wrap">
                        <img src={preview || profileimg} alt="Profile" className="w-[80px] h-[80px] rounded-full object-cover border border-[#EAEAEA]" />
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setPreview(URL.createObjectURL(file));
                        }} />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="h-[42px] px-[18px] rounded-[10px] bg-[#222] text-[#fff] text-[14px] font-[Medium] cursor-pointer">
                            Upload Photo
                        </button>
                    </div>
                </div>

                <SaveBar onSave={() => console.log("Save Team Member", { fullName, jobTitle, displayOrder, isActive })} />
            </div>
        </div>
    );
}

export default TeamMemberDetail;
