import profileimg from "../../../assets/img/user.png";
import userEmptyImg from "../../../assets/img/profileless.png";
import type { Country } from "../../../data/countries";
import { countries } from "../../../data/countries";
import React, { useRef, useState, useEffect } from "react";
import { DownArrowIcon, SearchIcon, VerifiedIcon, } from "../../../assets/icons";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";

function UserAccountDetail() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUserActive, setIsUserActive] = useState(true);
    const [isBanActive, setIsBanActive] = useState(false);
    const [isEmailNotificationActive, setIsEmailNotificationActive] = useState(true);
    const [isPushNotificationActive, setIsPushNotificationActive] = useState(true);
    // Phone dropdown state
    const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);

    // Country dropdown state
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

    // Search states
    const [phoneSearchQuery, setPhoneSearchQuery] = useState("");
    const [countrySearchQuery, setCountrySearchQuery] = useState("");

    // Selected country
    const [selectedPhoneCountry, setSelectedPhoneCountry] =
        useState<Country>(
            countries.find((c) => c.code === "AE") || countries[0]
        );

    const [selectedCountry, setSelectedCountry] = useState<Country>(
        countries.find((c) => c.code === "AE") || countries[0]
    );

    // Refs
    const phoneDropdownRef = useRef<HTMLDivElement>(null);
    const countryDropdownRef = useRef<HTMLDivElement>(null);

    // Filtered phone countries
    const filteredPhoneCountries = countries.filter(
        (country) =>
            country.name
                .toLowerCase()
                .includes(phoneSearchQuery.toLowerCase()) ||
            country.dialCode.includes(phoneSearchQuery)
    );

    // Filtered countries
    const filteredCountries = countries.filter((country) =>
        country.name
            .toLowerCase()
            .includes(countrySearchQuery.toLowerCase())
    );

    // Outside click close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                phoneDropdownRef.current &&
                !phoneDropdownRef.current.contains(event.target as Node)
            ) {
                setIsPhoneDropdownOpen(false);
            }

            if (
                countryDropdownRef.current &&
                !countryDropdownRef.current.contains(event.target as Node)
            ) {
                setIsCountryDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);
    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    return (
        <div className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            {/* Header */}
            <Header
                title="UserAccount"
                showBack={true}
                onBackClick={() => navigate(-1)}
            />

            {/* Content */}
            <div className="p-[20px] bg-[#fff] mt-[20px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] rounded-[12px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">

                    {/* First Name */}
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                            First Name{" "}
                            <span className="text-[#EA3934]">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Enter First Name"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Medium] text-[#222] focus:outline-none"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                            Last Name{" "}
                            <span className="text-[#EA3934]">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Medium] text-[#222] focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                            Email Address{" "}
                            <span className="text-[#EA3934]">*</span>
                        </label>

                        <div className="relative flex-1">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="w-full border border-[rgba(34,34,34,0.10)] rounded-[10px] pl-[14px] pr-[90px] h-[44px] text-[13px] font-[Medium] text-[#222] focus:outline-none"
                            />

                            <div className="absolute right-[10px] top-1/2 -translate-y-1/2 flex items-center gap-[4px] text-[#00A663] text-[14px] font-[Bold]">
                                <VerifiedIcon className="w-[14px] h-[14px]" />
                                Verified
                            </div>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                            Phone number{" "}
                            <span className="text-[#EA3934]">*</span>
                        </label>

                        <div className="flex items-center gap-[10px] mb-[10px]">

                            {/* Phone Country Dropdown */}
                            <div className="relative" ref={phoneDropdownRef}>
                                <div className="flex items-center gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] bg-white cursor-pointer select-none"
                                    onClick={() => {
                                        setIsPhoneDropdownOpen(!isPhoneDropdownOpen);

                                        if (!isPhoneDropdownOpen) {
                                            setPhoneSearchQuery("");
                                        }
                                    }}
                                >
                                    <img
                                        src={selectedPhoneCountry.flag}
                                        alt={selectedPhoneCountry.code}
                                        className="w-[20px] h-[14px] rounded-[2px] object-cover"
                                    />

                                    <DownArrowIcon
                                        className={`mt-[2px] transition-transform ${isPhoneDropdownOpen ? "rotate-180" : ""}`}
                                        width={14}
                                        height={14}
                                    />
                                </div>

                                {isPhoneDropdownOpen && (
                                    <div className="absolute top-[50px] left-0 w-[260px] bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 max-h-[280px] overflow-hidden flex flex-col">
                                        {/* Search */}
                                        <div className="p-[10px] border-b border-[#EAEAEA] sticky top-0 bg-white z-20 shrink-0">
                                            <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[8px] px-[12px] h-[44px] shrink-0">
                                                <SearchIcon className="text-[#707070] shrink-0" />

                                                <input
                                                    type="text"
                                                    placeholder="Search country..."
                                                    className="w-full bg-transparent text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                                                    value={phoneSearchQuery}
                                                    onChange={(e) =>
                                                        setPhoneSearchQuery(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* List */}
                                        <div className="overflow-y-auto overflow-x-hidden flex-1 py-[8px]">
                                            {filteredPhoneCountries.length >
                                                0 ? (
                                                filteredPhoneCountries.map(
                                                    (country) => (
                                                        <div
                                                            key={country.id}
                                                            className={`flex items-center gap-[10px] px-[14px] py-[8px] cursor-pointer hover:bg-[#F5F5F5] ${selectedPhoneCountry.id ===
                                                                country.id
                                                                ? "bg-[#F5F5F5]"
                                                                : ""
                                                                }`}
                                                            onClick={() => {
                                                                setSelectedPhoneCountry(country);
                                                                setIsPhoneDropdownOpen(false);
                                                                setPhoneSearchQuery("");
                                                            }}
                                                        >
                                                            <img src={country.flag} alt={country.code} className="w-[20px] h-[14px] rounded-[2px] object-cover shrink-0" />
                                                            <span className="text-[13px] font-[Medium] text-[#222] truncate">
                                                                {country.name} ({country.dialCode})
                                                            </span>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <div className="p-[14px] text-[13px] text-[#707070] text-center">
                                                    No countries found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Phone Input */}
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="1234 5678 585"
                                    className="w-full border border-[rgba(34,34,34,0.10)] rounded-[10px] pl-[14px] pr-[90px] h-[44px] text-[13px] font-[Medium] text-[#222] focus:outline-none"
                                />

                                <div className="absolute right-[10px] top-1/2 -translate-y-1/2 flex items-center gap-[4px] text-[#00A663] text-[14px] font-[Bold]">
                                    <VerifiedIcon className="w-[14px] h-[14px]" />
                                    Verified
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Country Dropdown */}
                    <div>
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                            Country{" "}
                            <span className="text-[#EA3934]">*</span>
                        </label>

                        <div
                            className="relative w-full"
                            ref={countryDropdownRef}
                        >
                            <div
                                className="flex items-center justify-between gap-[6px] border border-[#EAEAEA] rounded-[10px] px-[12px] h-[44px] w-full bg-white cursor-pointer select-none"
                                onClick={() => {
                                    setIsCountryDropdownOpen(
                                        !isCountryDropdownOpen
                                    );

                                    if (!isCountryDropdownOpen) {
                                        setCountrySearchQuery("");
                                    }
                                }}
                            >
                                <h4 className="text-[13px] font-[Medium] text-[#222] truncate">
                                    {selectedCountry.name}
                                </h4>

                                <DownArrowIcon
                                    className={`mt-[2px] transition-transform ${isCountryDropdownOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                    width={14}
                                    height={14}
                                />
                            </div>

                            {isCountryDropdownOpen && (
                                <div className="absolute top-[50px] left-0 w-full bg-white border border-[#EAEAEA] rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-10 max-h-[280px] overflow-hidden flex flex-col">

                                    {/* Search */}
                                    <div className="p-[10px] border-b border-[#EAEAEA] sticky top-0 bg-white z-20 shrink-0">
                                        <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-[8px] px-[12px] h-[44px] shrink-0">
                                            <SearchIcon className="text-[#707070] shrink-0" />

                                            <input
                                                type="text"
                                                placeholder="Search country..."
                                                className="w-full bg-transparent text-[13px] font-[Regular] text-[#222] focus:outline-none placeholder:text-[#707070]"
                                                value={countrySearchQuery}
                                                onChange={(e) =>
                                                    setCountrySearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* List */}
                                    <div className="overflow-y-auto overflow-x-hidden flex-1 py-[8px]">
                                        {filteredCountries.length > 0 ? (
                                            filteredCountries.map(
                                                (country) => (
                                                    <div
                                                        key={country.id}
                                                        className={`flex items-center gap-[10px] px-[14px] py-[8px] cursor-pointer hover:bg-[#F5F5F5] ${selectedCountry.id ===
                                                            country.id
                                                            ? "bg-[#F5F5F5]"
                                                            : ""
                                                            }`}
                                                        onClick={() => {
                                                            setSelectedCountry(
                                                                country
                                                            );

                                                            setIsCountryDropdownOpen(
                                                                false
                                                            );

                                                            setCountrySearchQuery(
                                                                ""
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            src={country.flag}
                                                            alt={country.code}
                                                            className="w-[20px] h-[14px] rounded-[2px] object-cover shrink-0"
                                                        />

                                                        <span className="text-[13px] font-[Medium] text-[#222] truncate">
                                                            {country.name}
                                                        </span>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <div className="p-[14px] text-[13px] text-[#707070] text-center">
                                                No countries found
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Active */}
                    <div>
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                            User Status
                        </label>

                        <div className="flex items-center justify-between border border-[rgba(34,34,34,0.10)] rounded-[10px] px-[14px] h-[44px]">
                            <span className="text-[13px] font-[Medium] text-[#222]">
                                User Active
                            </span>

                            <button
                                type="button"
                                onClick={() => setIsUserActive(!isUserActive)}
                                className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isUserActive ? "bg-[#6A3CA8]" : "bg-[#D1D5DB]"
                                    }`}
                            >
                                <span
                                    className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${isUserActive ? "left-[22px]" : "left-[2px]"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/*Auth Provider*/}
                    <div>
                        <label className="text-[14px] font-[SemiBold] text-[#222] block mb-[6px]">
                            Auth Provider{" "}
                            <span className="text-[#EA3934]">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Google"
                            className="h-[44px] w-full rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[12px] text-[13px] font-[Medium] text-[#222] focus:outline-none"
                        />
                    </div>

                    {/* Ban status */}
                    <div>
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                            Ban Status
                        </label>

                        <div className="flex items-center justify-between border border-[rgba(34,34,34,0.10)] rounded-[10px] px-[14px] h-[44px]">
                            <span className="text-[13px] font-[Medium] text-[#222]">
                                Ban User
                            </span>

                            <button
                                type="button"
                                onClick={() => setIsBanActive(!isBanActive)}
                                className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isBanActive ? "bg-[#6A3CA8]" : "bg-[#D1D5DB]"
                                    }`}
                            >
                                <span
                                    className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${isBanActive ? "left-[22px]" : "left-[2px]"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                    {/* Email Notification */}
                    <div>
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                            Email Notification
                        </label>

                        <div className="flex items-center justify-between border border-[rgba(34,34,34,0.10)] rounded-[10px] px-[14px] h-[44px]">
                            <span className="text-[13px] font-[Medium] text-[#222]">
                                Email Notification
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsEmailNotificationActive(
                                        !isEmailNotificationActive
                                    )
                                }
                                className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isEmailNotificationActive
                                    ? "bg-[#6A3CA8]"
                                    : "bg-[#D1D5DB]"
                                    }`}
                            >
                                <span
                                    className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${isEmailNotificationActive
                                        ? "left-[22px]"
                                        : "left-[2px]"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Push Notification */}
                    <div>
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                            Push Notification
                        </label>

                        <div className="flex items-center justify-between border border-[rgba(34,34,34,0.10)] rounded-[10px] px-[14px] h-[44px]">
                            <span className="text-[13px] font-[Medium] text-[#222]">
                                Push Notification
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsPushNotificationActive(
                                        !isPushNotificationActive
                                    )
                                }
                                className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isPushNotificationActive
                                    ? "bg-[#6A3CA8]"
                                    : "bg-[#D1D5DB]"
                                    }`}
                            >
                                <span
                                    className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 ${isPushNotificationActive
                                        ? "left-[22px]"
                                        : "left-[2px]"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-[14px] font-[SemiBold] text-[#222] mb-[8px]">
                            Address
                        </label>

                        <textarea
                            placeholder="Enter Address"
                            className="w-full h-[120px] rounded-[10px] border border-[rgba(34,34,34,0.10)] px-[14px] py-[12px] text-[13px] font-[Medium] text-[#222] focus:outline-none resize-none"
                        />
                    </div>

                </div>
                {/* User Profile */}
                <div className="bg-[#fff] p-[20px] rounded-[12px] shadow-[0px_1px_0px_rgba(17,17,26,0.05),0px_0px_8px_rgba(17,17,26,0.10)] mt-[25px] mb-[20px]">
                    <div className="flex items-center justify-between flex-wrap gap-[20px]">

                        {/* Left */}
                        <div className="flex items-center gap-[16px]">

                            {/* Profile Image */}
                            <div className="w-[90px] h-[90px] flex justify-center items-center rounded-full overflow-hidden border border-[rgba(34,34,34,0.10)] shrink-0">
                                <img
                                    src={selectedImage || userEmptyImg}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-[18px] font-[Bold] text-[#222]">
                                    User Profile
                                </h3>

                                <p className="text-[13px] font-[Regular] text-[#707070] mt-[4px]">
                                    Upload and manage profile photo
                                </p>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-[12px] flex-wrap">

                            {/* Change Photo */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="h-[42px] px-[18px] rounded-[10px] bg-[#222] text-[#fff] text-[14px] font-[Medium] hover:opacity-90 transition-all"
                            >
                                Change Photo
                            </button>

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={handleDeleteImage}
                                className="h-[42px] px-[18px] rounded-[10px] border border-[rgba(34,34,34,0.10)] text-[#EA3934] text-[14px] font-[Medium] hover:bg-[#FFF5F5] transition-all"
                            >
                                Delete
                            </button>

                            {/* Hidden Input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAccountDetail;