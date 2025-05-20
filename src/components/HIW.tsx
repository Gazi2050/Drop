import React from "react";
import { FaFileUpload, FaLink, FaShareAlt } from "react-icons/fa";

const steps = [
    {
        icon: FaFileUpload,
        title: "Upload Your File",
        description: "Drag and drop or select files to upload. No account needed.",
    },
    {
        icon: FaLink,
        title: "Get Your Link",
        description: "Receive an instant shareable URL once your file is uploaded.",
    },
    {
        icon: FaShareAlt,
        title: "Share Anywhere",
        description: "Share your link via email, messaging apps, or social media.",
    },
];

const HIW = () => {
    return (
        <section id="how-it-works" className="py-20 bg-gray-50 text-black">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-4xl font-bold text-center mb-14">How It Works</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map(({ icon: Icon, title, description }, idx) => (
                        <div
                            key={title}
                            className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition duration-300 hover:shadow-lg hover:scale-[1.03] cursor-pointer group"
                        >
                            {/* Step Number Top Right, gray text no bg */}
                            <span className="absolute top-4 right-4 text-gray-400 font-semibold text-lg select-none">
                                {idx + 1}
                            </span>

                            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gray-200 flex items-center justify-center text-black text-xl font-bold group-hover:bg-gray-300 transition">
                                <Icon className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-semibold mb-3 text-black">{title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HIW;
