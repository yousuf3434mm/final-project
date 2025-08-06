"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "./ui/switch";

const others = [
    "Do You Want To Wholesale?",
    "Warranty",
    "Guaranty",
    "Low Stock Alert",
    "Discount",
    "Barcode",
];

const unitOptions = ["piece", "kg", "litre"];
const categoryOptions = ["mobile", "accessories"];

type FormValues = {
    productname: string;
    presentstock: string;
    purchaseprice: string;
    sellingprice: string;
    unit: string;
    category: string;
    subcategory: string;
    description: string;
    others: boolean[];
};

const HookForm = () => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            productname: "",
            presentstock: "",
            purchaseprice: "",
            sellingprice: "",
            unit: "",
            category: "",
            subcategory: "",
            description: "",
            others: Array(others.length).fill(false),
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log("Submitted Data:", data);
        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
            <form
                className="space-y-6 bg-white shadow-xl rounded-xl p-10 w-full max-w-3xl border border-purple-200"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-center text-2xl font-bold text-purple-800 mb-6">
                    Description of product
                </h2>

                <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
                    {/* Left Side Inputs */}
                    <div className="flex flex-col space-y-4 w-full">
                        {/* Product name & stock */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <div className="w-full">
                                <input
                                    type="text"
                                    {...register("productname", {
                                        required: "Product name is required",
                                    })}
                                    placeholder="Product Name"
                                    className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                                />
                                {errors.productname && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.productname.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <input
                                    type="number"
                                    {...register("presentstock", {
                                        required: "Present stock is required",
                                    })}
                                    placeholder="Present Stock"
                                    className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                                />
                                {errors.presentstock && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.presentstock.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Prices */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <div className="w-full">
                                <input
                                    type="number"
                                    {...register("purchaseprice", {
                                        required: "Purchase price is required",
                                    })}
                                    placeholder="Purchase Price"
                                    className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                                />
                                {errors.purchaseprice && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.purchaseprice.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <input
                                    type="number"
                                    {...register("sellingprice", {
                                        required: "Selling price is required",
                                    })}
                                    placeholder="Selling Price"
                                    className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                                />
                                {errors.sellingprice && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.sellingprice.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Unit */}
                        <div className="w-full">
                            <select
                                {...register("unit", {
                                    required: "Unit is required",
                                })}
                                className="w-full border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 rounded px-3 py-2"
                            >
                                <option value="">Select Unit</option>
                                {unitOptions.map((u) => (
                                    <option key={u} value={u}>
                                        {u.charAt(0).toUpperCase() + u.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.unit && (
                                <p className="text-red-600 text-sm mt-1">{errors.unit.message}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="w-full">
                            <select
                                {...register("category", {
                                    required: "Category is required",
                                })}
                                className="w-full border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 rounded px-3 py-2"
                            >
                                <option value="">Select Category</option>
                                {categoryOptions.map((c) => (
                                    <option key={c} value={c}>
                                        {c.charAt(0).toUpperCase() + c.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Subcategory */}
                        <div className="w-full">
                            <select
                                {...register("subcategory", {
                                    required: "Sub-category is required",
                                })}
                                className="w-full border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 rounded px-3 py-2"
                            >
                                <option value="">Select Sub-category</option>
                                <option value="charger">Charger</option>
                                <option value="cable">Cable</option>
                                <option value="cover">Cover</option>
                            </select>
                            {errors.subcategory && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.subcategory.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="w-full">
                            <textarea
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                placeholder="Description"
                                className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                            />
                            {errors.description && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Side Switches */}
                    <div className="flex flex-col space-y-4 w-full border border-purple-200 bg-purple-50 rounded-lg min-h-[300px] p-4 shadow">
                        {others.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Controller
                                    name={`others.${index}` as const}
                                    control={control}
                                    render={({ field }) => (
                                        <Switch
                                            id={`switch-${index}`}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="peer"
                                        />
                                    )}
                                />
                                <label
                                    htmlFor={`switch-${index}`}
                                    className="text-purple-800 font-semibold"
                                >
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-purple-800 hover:bg-purple-700 transition text-white p-3 rounded font-semibold w-full shadow"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default HookForm;