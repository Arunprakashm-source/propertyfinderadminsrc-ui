import ProjectImage from "./ProjectImage";
import VideoBrochureSection from "./VideoBrochureSection";

const ProjectMedia = () => {
    return (
        <div>
            <div className="border border-[#EAEAEA] rounded-[12px]">
                <ProjectImage />

                <VideoBrochureSection />
                {/* 360 tour link */}
                <div className="rounded-[15px] bg-white md:p-[30px] p-[20px] min-w-0">
                    <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                        360 tour link <span className="text-[#EA3934]">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter tour link"
                        className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Regular] text-[#222] focus:outline-none"
                    />
                </div>


            </div>
        </div>
    );
};

export default ProjectMedia;
