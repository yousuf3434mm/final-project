"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // optional icon package

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-purple-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-2xl font-bold">MyBrand</span>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="hover:text-purple-200 transition">Home</Link>
                        <Link href="/signupform" className="hover:text-purple-200 transition">Signup Form</Link>
                        <Link href="/addproducts" className="hover:text-purple-200 transition">Add Products</Link>
                        <Link href="/loginform" className="hover:text-purple-200 transition">Login Form</Link>
                        <Link href="/profileform" className="hover:text-purple-200 transition">Profile Form</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-purple-700">
                    <Link href="/" className="block text-white hover:text-purple-200 transition">Home</Link>
                    <Link href="/about" className="block text-white hover:text-purple-200 transition">About</Link>
                    <Link href="/services" className="block text-white hover:text-purple-200 transition">Services</Link>
                    <Link href="/signup" className="block text-white hover:text-purple-200 transition">Sign Up</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;