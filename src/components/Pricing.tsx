import { PricingData } from "@/constants/data";
import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const Pricing = () => {
    return (
        <section id="pricing" className="py-20 bg-white text-black scroll-mt-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-4xl font-bold text-center mb-6">Always Free</h2>
                <p className="text-center text-gray-600 mb-14 text-lg max-w-xl mx-auto leading-relaxed">
                    Drop is completely free to use. No premium plans, no hidden fees, no credit card required.
                </p>

                <div className="bg-gray-50 border border-gray-300 rounded-2xl shadow-lg p-12 max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h3 className="text-3xl font-extrabold tracking-tight">Free Forever</h3>
                            <p className="text-gray-500 mt-2 text-sm font-medium">All features included</p>
                        </div>
                        <p className="text-5xl font-extrabold text-black tracking-wide">$0</p>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {PricingData.map(({ title, subtitle }) => (
                            <li key={title} className="flex space-x-4 items-start">
                                <FaCheckCircle className="text-primary mt-1 flex-shrink-0 w-7 h-7" />
                                <div>
                                    <p className="font-semibold text-black text-lg">{title}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{subtitle}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        className="w-full py-3 bg-black text-white font-semibold rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all duration-500 ease-in-out hover:scale-105 transform cursor-pointer"
                    >
                        <span>Get Started - It&apos;s Free!</span>
                        <FaArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
