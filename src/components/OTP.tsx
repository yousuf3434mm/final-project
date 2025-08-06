"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

type OTPFormData = {
    email: string;
    otp0: string;
    otp1: string;
    otp2: string;
    otp3: string;
    otp4: string;
    otp5: string;
};

export const OTP = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
    } = useForm<OTPFormData>();

    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [message, setMessage] = useState("");

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (emailSubmitted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [emailSubmitted, timeLeft]);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const sec = (seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    };

    const generateOtp = () => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        console.log("Generated OTP:", otp); // For debugging, remove in production
        setTimeLeft(180);
    };

    const onEmailSubmit = (data: { email: string }) => {
        if (!data.email.match(/^\S+@\S+\.\S+$/)) {
            setMessage("❌ Invalid email address");
            return;
        }
        setEmailSubmitted(true);
        generateOtp();
        setMessage("");
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const name = `otp${index}` as keyof OTPFormData;
        setValue(name, value);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        trigger(name); // trigger validation
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const name = `otp${index}` as keyof OTPFormData;
        if (e.key === "Backspace") {
            const val = watch(name);
            if (!val && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const onOtpSubmit = (data: OTPFormData) => {
        const enteredOtp =
            data.otp0 + data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5;

        console.log("Entered OTP:", enteredOtp);
        console.log("Form Data:", data);

        if (timeLeft === 0) {
            setMessage("❌ OTP expired. Please refresh and try again.");
            return;
        }

        if (enteredOtp === generatedOtp) {
            setMessage("✅ OTP Verified Successfully!");
        } else {
            setMessage("❌ Invalid OTP. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border border-purple-200">
                <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                    Forgot Password
                </h2>

                {!emailSubmitted ? (
                    <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email format",
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            )}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}

                        <button
                            type="submit"
                            className="bg-purple-800 hover:bg-purple-700 text-white py-3 rounded w-full font-semibold transition"
                        >
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <>
                        <div className="text-sm text-gray-600 mb-3 text-center">
                            OTP sent to your email. Expires in{" "}
                            <span className="text-red-600 font-bold">{formatTime(timeLeft)}</span>
                        </div>

                        <form onSubmit={handleSubmit(onOtpSubmit)} className="space-y-4">
                            <div className="flex justify-center gap-2">
                                {[...Array(6)].map((_, index) => {
                                    const name = `otp${index}` as keyof OTPFormData;
                                    return (
                                        <Controller
                                            key={index}
                                            name={name}
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: "Required",
                                                pattern: {
                                                    value: /^[0-9]$/,
                                                    message: "Must be a number",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    maxLength={1}
                                                    ref={(el) => { inputRefs.current[index] = el; }}
                                                    onChange={(e) =>
                                                        handleOtpChange(index, e.target.value)
                                                    }
                                                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                    className="w-10 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                                                />
                                            )}
                                        />
                                    );
                                })}
                            </div>

                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-500 text-white py-2 rounded w-full transition"
                            >
                                Verify OTP
                            </button>
                        </form>
                    </>
                )}

                {message && (
                    <div className="mt-4 text-center font-semibold text-purple-700">{message}</div>
                )}
            </div>
        </div>
    );
};