import { steps } from "@/constants/data";
import React from "react";

const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className="py-20 bg-gray-50 text-black scroll-mt-20"
        >
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-4xl font-bold text-center mb-14">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map(({ icon: Icon, title, description }, idx) => (
                        <div
                            key={title}
                            className="relative bg-white p-6 rounded-xl border border-gray-200 transition duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group text-center"
                        >
                            {/* Step Number */}
                            <span className="absolute top-4 right-4 text-gray-400 font-semibold text-lg select-none">
                                {idx + 1}
                            </span>

                            {/* Icon */}
                            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gray-200 flex items-center justify-center text-black text-xl font-bold group-hover:bg-gray-300 transition">
                                <Icon className="w-7 h-7" />
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl font-semibold mb-3">{title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
