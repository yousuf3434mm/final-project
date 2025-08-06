"use client";

import React from "react";
import { useForm } from "react-hook-form";

// --- SignupForm ---
type SignUpFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
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
        },
    });

    const onSubmit = (data: SignUpFormValues) => {
        console.log("Signup Data:", data);
        reset();
    };

    const password = watch("password");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white shadow-xl rounded-xl p-10 w-full max-w-md border border-purple-200"
            >
                <h2 className="text-center text-2xl font-bold text-purple-800 mb-6">
                    Sign Up
                </h2>
                {/* Name */}
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name", { required: "Name is required" })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.name && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                {/* Email */}
                <div className="w-full">
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
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                {/* Password */}
                <div className="w-full">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                {/* Confirm Password */}
                <div className="w-full">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-purple-800 hover:bg-purple-700 transition text-white p-3 rounded font-semibold w-full shadow"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default SignupForm;


