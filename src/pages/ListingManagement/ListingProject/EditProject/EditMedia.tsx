import ImageSection from "./EditProjectComponents/ImageSection";
import VideoBrochureSection from "./EditProjectComponents/VideoBrochureSection";

const EditMedia = () => {
    return (
        <div>
            <div className="rounded-[15px] bg-white min-w-0 overflow-hidden">
                <ImageSection />
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
            <div className="flex items-center justify-end gap-[10px] mt-[30px]">
                <button className="cursor-pointer h-[44px] rounded-[10px] px-[20px] border border-[#222]  text-[#222] text-[14px] font-[Bold] inline-flex items-center gap-[5px]">Discard</button>
                <button className="cursor-pointer h-[44px] rounded-[10px] px-[20px] bg-[#6A3CA8] text-[#FFF] text-[14px] font-[Bold] inline-flex items-center gap-[5px]">Save changes</button>
            </div>
        </div>
    );
};

export default EditMedia;
