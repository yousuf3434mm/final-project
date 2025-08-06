"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
    email: string;
    password: string;
    remember?: boolean;
};

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormValues) => {
        console.log("Login Data:", data);
        await new Promise((res) => setTimeout(res, 1000)); // simulate loading
        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white shadow-xl rounded-xl p-10 w-full max-w-md border border-purple-200"
            >
                <h2 className="text-center text-2xl font-bold text-purple-800 mb-6">Login</h2>

                {/* Email */}
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
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
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="w-full relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition pr-10"
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-2 top-2 text-purple-600 text-lg"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7.5a11.72 11.72 0 0 1 3.06-4.36M6.1 6.1A10.94 10.94 0 0 1 12 5c5 0 9.27 3.11 11 7.5a11.72 11.72 0 0 1-2.09 3.14M1 1l22 22" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                        )}
                    </button>
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-purple-700 text-sm">
                        <input
                            type="checkbox"
                            className="accent-purple-700"
                            {...register("remember")}
                        />
                        Remember me
                    </label>
                    <Link href="/otp" className="text-purple-600 text-sm hover:underline">
                        Forgot password?
                    </Link>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-purple-800 hover:bg-purple-700 transition text-white p-3 rounded font-semibold w-full shadow disabled:opacity-60"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

                {/* Social Logins */}
                <div className="flex flex-col gap-3 mb-4">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded p-2 w-full hover:bg-gray-50 transition"
                        onClick={() => alert("Google login not implemented")}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z" /><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3c-7.2 0-13.4 3.7-17.1 9.4z" /><path fill="#FBBC05" d="M24 45c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2C29.2 36.9 26.7 37.7 24 37.7c-6.1 0-10.7-2.9-13.7-7.1l-7 5.4C6.6 41.3 14.7 45 24 45z" /><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C18.6 41.3 21.2 45 24 45c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z" /></g></svg>
                        Continue with Google
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded p-2 w-full hover:bg-blue-700 transition"
                        onClick={() => alert("Facebook login not implemented")}
                    >

                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                        </svg>
                        Continue with Facebook
                    </button>
                </div>

                {/* Signup redirect */}
                <p className="text-center text-sm text-gray-700">
                    Don&apos;t have an account?{" "}
                    <Link href="/signupform" className="text-purple-700 font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
};