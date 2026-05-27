import { Link, useNavigate } from "react-router-dom";
import Loginbg from '../../assets/img/main1.png';
import loginuser from '../../assets/img/loginuser.png';
import { TickIcon, UserColorIcon } from "../../assets/icons";
import { Checkbox, CheckboxIndicator } from "../../components/Ui/Checkbox";

function Login() {
    const navigate = useNavigate();
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
                                placeholder="Email address"
                                className="border border-[rgba(34,34,34,0.10)] bg-[#fff] rounded-[10px] p-[20px_16px] text-[14px] font-[Regular] text-[#222] outline-none placeholder:text-[#707070] w-full"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                id="password"
                                type="password"
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

                            <Link
                                to=""
                                className="font-[Bold] text-[15px] text-[#222]"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button EA3934*/}
                        <button
                            type="submit"
                            onClick={() => navigate('/dashboard')}
                            className="cursor-pointer bg-[#6A3CA8] w-full text-[14px] font-[Bold] text-[#FFF] p-[16px] rounded-[10px]"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
        // <div className="flex lg:flex-row flex-col h-screen bg-white overflow-hidden">

        //     {/* Left Image Section */}

        //     <div className="lg:w-[60%] w-[100%] h-screen lg:block hidden">
        //         <img
        //             src={Loginbg}
        //             alt="Login Background"
        //             className="w-full h-full object-cover"
        //         />
        //     </div>

        //     {/* Right Login Section */}
        //     <div className="flex items-center justify-center p-[20px] bg-white lg:w-[40%] w-full h-screen">
        //         <div className="w-full max-w-[400px]">

        //             {/* Top Content */}
        //             <div className="flex flex-col items-center mb-[40px]">
        //                 <img
        //                     src={loginuser}
        //                     alt="User"
        //                     className="w-[70px] h-[70px] mb-[16px]"
        //                 />

        //                 <div className="text-center">
        //                     <h2 className="font-[Bold] text-[#222] text-[34px] mb-[4px] leading-[44px]">
        //                         Sign in with email
        //                     </h2>

        //                     <p className="font-[Regular] text-[#222] text-[14px]">
        //                         Please login to make your work easy.
        //                     </p>
        //                 </div>
        //             </div>

        //             {/* Form */}
        //             <form className="flex flex-col gap-[14px]">

        //                 {/* Email */}
        //                 <div>
        //                     <input
        //                         id="email"
        //                         type="email"
        //                         placeholder="Email address"
        //                         className="border border-[rgba(34,34,34,0.10)] bg-[#fff] rounded-[10px] p-[20px_16px] text-[14px] font-[Regular] text-[#222] outline-none placeholder:text-[#707070] w-full"
        //                     />
        //                 </div>

        //                 {/* Password */}
        //                 <div>
        //                     <input
        //                         id="password"
        //                         type="password"
        //                         placeholder="Password"
        //                         className="border border-[rgba(34,34,34,0.10)] bg-[#fff] rounded-[10px] p-[20px_16px] text-[14px] font-[Regular] text-[#222] outline-none placeholder:text-[#707070] w-full"
        //                     />
        //                 </div>

        //                 {/* Remember + Forgot */}
        //                 <div className="flex items-center justify-between mb-[10px]">

        //                     <div className="flex items-center gap-2">
        //                         <Checkbox
        //                             id="remember"
        //                             className="flex h-[15px] w-[15px] items-center justify-center rounded-[5px] border border-[rgba(34,34,34,0.20)] bg-white text-white data-[state=checked]:bg-[#EA3934] data-[state=checked]:border-[#EA3934] cursor-pointer"
        //                         >
        //                             <CheckboxIndicator>
        //                                 <TickIcon className="mt-[-1px]" />
        //                             </CheckboxIndicator>
        //                         </Checkbox>

        //                         <label
        //                             htmlFor="remember"
        //                             className="cursor-pointer font-[Regular] text-[14px] text-[#222]"
        //                         >
        //                             Remember me
        //                         </label>
        //                     </div>

        //                     <Link
        //                         to=""
        //                         className="font-[Bold] text-[15px] text-[#222]"
        //                     >
        //                         Forgot password?
        //                     </Link>
        //                 </div>

        //                 {/* Login Button EA3934*/}
        //                 <button
        //                     type="submit"
        //                     className="cursor-pointer bg-[#6A3CA8] w-full text-[14px] font-[Bold] text-[#FFF] p-[16px] rounded-[10px]"
        //                 >
        //                     Login
        //                 </button>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Login;