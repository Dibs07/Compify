"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navRoutes } from "@/utils/constant/navRoutes";
import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [userImg, setUserImg] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <div className="flex items-center mx-auto justify-between pt-2 text-white w-screen overflow-x-hidden font-hollirood lg:w-full">
                <div
                    className={`flex-grow ${scrolling || isMenuOpen
                            ? "rounded-xl border-b bg-body"
                            : "bg-transparent"
                        }  py-2 max-md:border-b`}
                >
                    
                    <div className="flex mx-auto justify-center items-center w-full ">
                    
                        <div
                            className="flex h-full w-8 cursor-pointer flex-col items-center justify-center gap-[6px] md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span
                                className={`block h-[2px] w-7 bg-white transition-all duration-500
                                ${isMenuOpen ? "translate-y-2 rotate-45" : ""}
                                `}
                            ></span>
                            <span
                                className={`block h-[2px] w-7 bg-white transition-all duration-500
                                ${isMenuOpen ? "translate-x-44 " : "translate-x-0"}
                                `}
                            ></span>
                            <span
                                className={`block h-[2px] w-7 bg-white transition-all duration-500
                                ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}
                                `}
                            ></span>
                        </div>
                        <h1 className="font-semibold text-4xl text-blue-800 md:ml-20">Compify </h1>
                        <ul
                            className="flex flex-row gap-2 justify-center w-full"
                        >
                            {navRoutes.map((link, index) => (
                                <Link
                                    href={link.path}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    key={index}
                                >
                                    <li
                                        className="my-3 mx-4 cursor-pointer text-black font-bold"
                                    >
                                        {link.name.toUpperCase()}
                                    </li>
                                </Link>
                            ))}
                           {typeof localStorage !== 'undefined' && localStorage.getItem('acc_compify') && <button onClick={()=>{
                                localStorage.removeItem("acc_compify");
                                router.push("/login");
                            }} className="bg-white border text-blue-600 border-blue-600 rounded-xl px-5 py-1 font-semibold text-md">
                                Logout
                            </button>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
