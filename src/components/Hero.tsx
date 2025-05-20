'use client';

import { useState, useRef, useEffect } from 'react';
import { FiUploadCloud, FiCheckCircle, FiFile, FiX } from 'react-icons/fi';

const features = [
    'No signup required',
    'Instant sharing',
    'Multiple file formats',
];

const Hero = () => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const validateFiles = (newFiles: File[]) => {
        if (newFiles.length > 3) {
            alert('You can upload a maximum of 3 files at a time.');
            return false;
        }

        const allImages = newFiles.every((f) => f.type.startsWith('image/'));
        const allPDFs = newFiles.every((f) => f.type === 'application/pdf');

        if (!(allImages || allPDFs)) {
            alert('Please upload only images or only PDF files at one time.');
            return false;
        }

        return true;
    };

    useEffect(() => {
        if (files.length === 0) {
            setPreviews([]);
            return;
        }

        if (files[0].type.startsWith('image/')) {
            const objectUrls = files.map((file) => URL.createObjectURL(file));
            setPreviews(objectUrls);

            return () => {
                objectUrls.forEach((url) => URL.revokeObjectURL(url));
            };
        } else {
            setPreviews([]);
        }
    }, [files]);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            if (validateFiles(droppedFiles)) {
                setFiles(droppedFiles);
            }
            e.dataTransfer.clearData();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            if (validateFiles(selectedFiles)) {
                setFiles(selectedFiles);
            }
        }
    };

    const openFileDialog = () => {
        inputRef.current?.click();
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

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

                    {/* Upload Area */}
                    <div
                        className={`w-full max-w-xl mx-auto mb-6 p-5 border-2 border-dashed rounded-xl cursor-pointer
              ${dragActive ? 'border-black bg-gray-100' : 'border-gray-300 bg-gray-50'}
              transition-colors duration-300 ease-in-out
            `}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={openFileDialog}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') openFileDialog();
                        }}
                    >
                        <input
                            type="file"
                            multiple
                            ref={inputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*,application/pdf"
                        />

                        {files.length === 0 ? (
                            <div className="flex flex-col items-center justify-center space-y-4 py-12">
                                <FiUploadCloud className="h-12 w-12 text-gray-600" />
                                <p className="text-lg font-medium">Drag and drop files here</p>
                                <p className="text-sm text-gray-500">or click to browse</p>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openFileDialog();
                                    }}
                                    className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-300 cursor-pointer"
                                >
                                    Select Files
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap justify-center items-center gap-6 py-4 max-h-[240px] overflow-y-auto">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative w-36 h-44 flex flex-col items-center justify-start"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {file.type.startsWith('image/') && previews[index] ? (
                                            <>
                                                <img
                                                    src={previews[index]}
                                                    alt={file.name}
                                                    className="h-32 w-32 object-cover rounded-xl"
                                                />
                                                <p className="text-xs text-center mt-2 truncate max-w-[8rem]">{file.name}</p>
                                            </>
                                        ) : file.type === 'application/pdf' ? (
                                            <>
                                                <FiFile className="h-16 w-16 text-gray-500 mb-1" />
                                                <p className="text-xs text-center mt-2 truncate max-w-[8rem]">{file.name}</p>
                                            </>
                                        ) : null}

                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="absolute -top-1 right-1 p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white transition-all shadow-md"
                                            aria-label={`Remove ${file.name}`}
                                        >
                                            <FiX size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Post Button */}
                    {files.length > 0 && (
                        <button
                            type="button"
                            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300"
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
