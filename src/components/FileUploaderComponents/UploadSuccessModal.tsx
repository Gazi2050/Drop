'use client';
import { useState } from "react";
import { toast } from "sonner";
import { FiClipboard, FiCheck } from "react-icons/fi";
import { UploadSuccessModalProps } from "@/constants/type";

const UploadSuccessModal: React.FC<UploadSuccessModalProps> = ({ urls, onClose }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const copyToClipboard = (url: string, index: number) => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 800);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300); // match animation duration
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-white w-full max-w-md p-6 rounded-2xl shadow-xl text-center transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <h2 className="text-2xl font-bold mb-3 text-black">Upload Successful 🎉</h2>
                <p className="text-gray-600 mb-4">
                    Here {urls.length > 1 ? "are your links" : "is your link"}:
                </p>

                <div className="space-y-4 max-h-64 overflow-y-auto">
                    {urls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2 border rounded-lg px-3 py-2">
                            <input
                                value={url}
                                readOnly
                                className="flex-1 text-sm bg-transparent outline-none"
                            />
                            <button
                                onClick={() => copyToClipboard(url, index)}
                                className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                                title="Copy link"
                            >
                                {copiedIndex === index ? (
                                    <FiCheck size={18} className="text-green-600 transition-all duration-300" />
                                ) : (
                                    <FiClipboard size={18} className="text-black transition-all duration-300" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleClose}
                    className="mt-6 w-full py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition font-medium"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UploadSuccessModal;
