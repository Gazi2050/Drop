'use client';
import { features } from "@/constants/data";
import UploadArea from "./UploadArea";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";

const Hero = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Upload and share files <span className="text-black">instantly</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        A simple and fast way to upload PDFs and images, and get shareable URLs in seconds.
                    </p>

                    {/* Upload box + previews */}
                    <UploadArea
                        files={files}
                        setFiles={setFiles}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />

                    {/* Upload button */}
                    {files.length > 0 && (
                        <button
                            type="button"
                            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300 cursor-pointer"
                            onClick={() => alert('Files ready to be posted!')}
                        >
                            Upload Files
                        </button>
                    )}

                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-12">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                                <FiCheckCircle className="h-5 w-5 text-black opacity-70" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
