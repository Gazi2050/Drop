'use client';
import { FiUploadCloud } from "react-icons/fi";
import FilePreview from "./FilePreview";
import { useEffect, useRef, useState } from "react";

interface UploadAreaProps {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const UploadArea = ({ files, setFiles, errorMessage, setErrorMessage }: UploadAreaProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Validate files
    function validateFiles(newFiles: File[]): boolean {
        setErrorMessage('');

        if (newFiles.length > 3) {
            setErrorMessage('You can upload a maximum of 3 files at a time.');
            return false;
        }

        const allImages = newFiles.every((file) => file.type.startsWith('image/'));
        const allPDFs = newFiles.every((file) => file.type === 'application/pdf');

        if (!(allImages || allPDFs)) {
            setErrorMessage('Please upload only images or only PDF files at one time.');
            return false;
        }

        return true;
    }

    // Generate image previews
    useEffect(() => {
        if (files.length === 0) {
            setPreviews([]);
            return;
        }

        if (files[0].type.startsWith('image/')) {
            const urls = files.map((file) => URL.createObjectURL(file));
            setPreviews(urls);

            return () => urls.forEach((url) => URL.revokeObjectURL(url));
        } else {
            setPreviews([]);
        }
    }, [files]);

    // Drag handlers
    function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (validateFiles(droppedFiles)) {
            setFiles(droppedFiles);
        }
    }

    // File dialog open
    function openFileDialog() {
        inputRef.current?.click();
    }

    // Handle input change
    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        if (validateFiles(selectedFiles)) {
            setFiles(selectedFiles);
        }
    }

    // Remove file
    function removeFile(index: number) {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
    }

    const uploadBoxClass = dragActive ? 'border-black bg-gray-100' : 'border-gray-300 bg-gray-50';

    return (
        <>
            <div
                className={`w-full max-w-xl mx-auto mb-6 p-5 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ease-in-out ${uploadBoxClass}`}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
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
                    onChange={onFileChange}
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
                            <FilePreview
                                key={index}
                                file={file}
                                previewUrl={previews[index]}
                                onRemove={() => removeFile(index)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        </>
    );
};

export default UploadArea;