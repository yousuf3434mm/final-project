"use client";

import { useForm } from "react-hook-form";


type ProfileFormValues = {
    username: string;
    bio: string;
};

export const ProfileForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        defaultValues: {
            username: "",
            bio: "",
        },
    });

    const onSubmit = (data: ProfileFormValues) => {
        console.log("Profile Data:", data);
        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white shadow-xl rounded-xl p-10 w-full max-w-md border border-purple-200"
            >
                <h2 className="text-center text-2xl font-bold text-purple-800 mb-6">
                    Edit Profile
                </h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.username && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.username.message}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <textarea
                        placeholder="Bio"
                        {...register("bio")}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-purple-800 hover:bg-purple-700 transition text-white p-3 rounded font-semibold w-full shadow"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
};