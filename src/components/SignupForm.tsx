"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link"; // use "react-router-dom" if it's not a Next.js app

type SignUpFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
};

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const password = watch("password");

    const onSubmit = (data: SignUpFormValues) => {
        console.log("Signup Data:", data);
        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white shadow-xl rounded-xl p-10 w-full max-w-md border border-purple-200"
            >
                <h2 className="text-center text-2xl font-bold text-purple-800 mb-6">
                    Create Your Account
                </h2>

                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name", { required: "Name is required" })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-3 rounded w-full"
                    />
                    {errors.name && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-3 rounded w-full"
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-3 rounded w-full"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 text-sm"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-3 rounded w-full"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 text-sm"
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                    {errors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                    <input
                        type="checkbox"
                        {...register("agreeToTerms", {
                            required: "You must agree to continue",
                        })}
                        className="mt-1"
                    />
                    <label className="text-sm text-gray-700">
                        I agree to the <span className="text-purple-700 font-semibold">Terms & Conditions</span>
                    </label>
                </div>
                {errors.agreeToTerms && (
                    <p className="text-red-600 text-sm -mt-3">
                        {errors.agreeToTerms.message}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-purple-800 hover:bg-purple-700 transition text-white p-3 rounded font-semibold w-full shadow"
                >
                    Create Account
                </button>

                {/* Login Redirect */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link href="/loginform" className="text-purple-800 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;