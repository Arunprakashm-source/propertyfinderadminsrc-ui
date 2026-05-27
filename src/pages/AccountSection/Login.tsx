import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loginbg from '../../assets/img/main1.png';
import loginuser from '../../assets/img/loginuser.png';
import { TickIcon, UserColorIcon } from "../../assets/icons";
import { Checkbox, CheckboxIndicator } from "../../components/Ui/Checkbox";
import PasswordOtpModal from "./PasswordOtpModal";
import PasswordSucessModal from "./PasswordSucessModal";

function Login() {
    const navigate = useNavigate();
    const [showPasswordText, setShowPasswordText] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isPasswordOtpModalOpen, setIsPasswordOtpModalOpen] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [isPasswordSuccessModalOpen, setIsPasswordSuccessModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleLogin = (event?: React.FormEvent<HTMLFormElement>) => {
        console.log(event);
        console.log(email, password);
        if (event) event.preventDefault();

        // const normalizedEmail = email.trim().toLowerCase();

        if (email === "arun@gmail.com" && password === "1234") {
            setLoginError("");
            navigate("/dashboard");
            return;
        }
        setLoginError("Invalid email or password");
    };
    return (
        <div className="flex lg:flex-row flex-col min-h-[100dvh] bg-white overflow-hidden">

            {/* Left Image Section */}
            <div className="lg:w-[60%] w-full hidden lg:block">
                <img
                    src={Loginbg}
                    alt="Login Background"
                    className="w-full h-[100dvh] object-cover"
                />
            </div>

            {/* Right Login Section */}
            <div className="flex items-center justify-center lg:w-[40%] w-full min-h-[100dvh] p-[20px] bg-white">
                <div className="w-full max-w-[400px]">
                    {!showForgotPassword && (
                        <>
                            {/* Top Content */}
                            <div className="flex flex-col items-center mb-[40px]">
                                <div className="mb-[20px] flex justify-center items-center w-[60px] h-[60px] rounded-[15px] bg-[#FFF] shadow-[0_6px_18px_0_rgba(0,0,0,0.15)]">
                                    <UserColorIcon fill="#6A3CA8" height={30} width={30} />
                                </div>

                                <div className="text-center">
                                    <h2 className="font-[Bold] text-[#222] text-[34px] mb-[4px] leading-[44px]">
                                        Sign in with email
                                    </h2>

                                    <p className="font-[Regular] text-[#222] text-[14px]">
                                        Please login to make your work easy.
                                    </p>
                                </div>
                            </div>

                            {/* Form */}
                            <form className="flex flex-col gap-[14px]">

                                {/* Email */}
                                <div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email address"
                                        className="border border-[rgba(34,34,34,0.10)] bg-[#fff] rounded-[10px] p-[20px_16px] text-[14px] font-[Regular] text-[#222] outline-none placeholder:text-[#707070] w-full"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="border border-[rgba(34,34,34,0.10)] bg-[#fff] rounded-[10px] p-[20px_16px] text-[14px] font-[Regular] text-[#222] outline-none placeholder:text-[#707070] w-full"
                                    />
                                </div>

                                {/* Remember + Forgot */}
                                <div className="flex items-center justify-between mb-[10px]">

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="remember"
                                            className="flex h-[15px] w-[15px] items-center justify-center rounded-[5px] border border-[rgba(34,34,34,0.20)] bg-white text-white data-[state=checked]:bg-[#EA3934] data-[state=checked]:border-[#EA3934] cursor-pointer"
                                        >
                                            <CheckboxIndicator>
                                                <TickIcon className="mt-[-1px]" />
                                            </CheckboxIndicator>
                                        </Checkbox>

                                        <label
                                            htmlFor="remember"
                                            className="cursor-pointer font-[Regular] text-[14px] text-[#222]"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setShowForgotPassword(true);
                                            setShowChangePassword(false);
                                        }}
                                        className="font-[Bold] text-[15px] text-[#222]"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Login Button EA3934*/}
                                <button
                                    type="submit"
                                    onClick={() => handleLogin()}
                                    className="cursor-pointer bg-[#6A3CA8] w-full text-[14px] font-[Bold] text-[#FFF] p-[16px] rounded-[10px]"
                                >
                                    Login
                                </button>
                            </form>
                        </>
                    )}
                    {/*Forgot password*/}
                    {showForgotPassword && !showChangePassword && (
                        <>
                            <div className="flex flex-col items-center mb-[40px]">
                                <div className="text-center">
                                    <h2 className="font-[Bold] text-[#222] text-[34px] mb-[4px]">
                                        Forgot password
                                    </h2>
                                </div>
                            </div>
                            <form
                                className="w-[400px] flex flex-col gap-[14px] mb-[30px] max-sm:w-full login_form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setIsPasswordOtpModalOpen(true);
                                }}
                            >
                                <div>
                                    <input
                                        id="email"
                                        type="email"
                                        className="border border-[rgba(34,34,34,0.10)] bg-[#fff] rounded-[10px] p-[20px_16px] text-[14px] font-[Regular] text-[#222] outline-none placeholder:text-[#707070] w-full"
                                        placeholder="Email address"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="cursor-pointer bg-[#6A3CA8] w-full text-[14px] font-[Bold] text-[#FFF] p-[16px] rounded-[10px]"
                                >
                                    Get OTP
                                </button>
                            </form>
                            <div className="text-center flex items-center justify-center gap-[6px]">
                                <p className="font-[Regular] text-[#222] text-[14px] text-[#222]">Did you remember your password?</p>
                                <p
                                    onClick={() => {
                                        setShowForgotPassword(false);
                                        setShowChangePassword(false);
                                    }}
                                    className="font-[Bold] text-[#222] text-[15px] text-[#222] cursor-pointer"
                                >
                                    Login now
                                </p>
                            </div>
                        </>
                    )}
                    {/*Change Password*/}
                    {showChangePassword && (
                        <>
                            <div className="flex flex-col items-center mb-[40px]">
                                <div className="text-center">
                                    <h2 className="font-[Bold] text-[#222] text-[34px] mb-[4px]">
                                        Change password
                                    </h2>
                                </div>
                            </div>
                            <form
                                className="w-[400px] flex flex-col gap-[14px] mb-[30px] max-sm:w-full login_form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setIsPasswordSuccessModalOpen(true);
                                }}
                            >
                                <div>
                                    <input
                                        id="enter_new_password"
                                        type="password"
                                        className="border border-[rgba(34,34,34,0.10)] bg-[#fff] rounded-[10px] p-[20px_16px] text-[14px] font-[Regular] text-[#222] outline-none placeholder:text-[#707070] w-full"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div>
                                    <input
                                        id="confirm_new_password"
                                        type="password"
                                        className="border border-[rgba(34,34,34,0.10)] bg-[#fff] rounded-[10px] p-[20px_16px] text-[14px] font-[Regular] text-[#222] outline-none placeholder:text-[#707070] w-full"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="cursor-pointer bg-[#6A3CA8] w-full text-[14px] font-[Bold] text-[#FFF] p-[16px] rounded-[10px]"
                                >
                                    Confirm password
                                </button>
                            </form>
                            <div className="text-center flex items-center justify-center gap-[6px]">
                                <p className="font-[Regular] text-[#222] text-[14px] text-[#222]">Did you remember your password?</p>
                                <p
                                    onClick={() => {
                                        setShowForgotPassword(false);
                                        setShowChangePassword(false);
                                    }}
                                    className="font-[Bold] text-[#222] text-[14px] text-[#0832AE] cursor-pointer"
                                >
                                    Login now
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <PasswordOtpModal
                isOpen={isPasswordOtpModalOpen}
                onClose={() => setIsPasswordOtpModalOpen(false)}
                onVerifyOtp={() => {
                    setIsPasswordOtpModalOpen(false);
                    setShowChangePassword(true);
                }}
            />
            <PasswordSucessModal
                isOpen={isPasswordSuccessModalOpen}
                onClose={() => setIsPasswordSuccessModalOpen(false)}
            />
        </div>
    );
}

export default Login;