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
                        } py-2 max-md:border-b`}
                >
                    
                    <div className="flex items-center w-full ">
                    
                        {/* {pathname !== "/" && ( */}
                            <Image
                                width={150}
                                height={130}
                                className="object-cover pl-4 max-lg:hidden"
                                src="/svg/logo-black-remove-bg.png "
                                alt="logo"
                            />
                        {/* )} */}

                        <div className="flex ml-auto items-center">
                            
                            <ul className="flex flex-row gap-2 pr-2">
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
                                {typeof localStorage !== 'undefined' && localStorage.getItem('acc_compify') && (
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("acc_compify");
                                            router.push("/login");
                                        }}
                                        className="bg-white border text-blue-600 border-blue-600 rounded-xl px-5 py-1 font-semibold text-md"
                                    >
                                        Logout
                                    </button>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
