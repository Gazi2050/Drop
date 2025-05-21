const fileTypes = [
    { type: "PDF", label: "Documents" },
    { type: "JPG", label: "Images" },
    { type: "PNG", label: "Images" },
    { type: "WEBP", label: "Images" },
    { type: "GIF", label: "Animations" },
    { type: "BMP", label: "Images" },
    { type: "SVG", label: "Vector" },
    { type: "HEIC", label: "Images" },
];

const FileType = () => {
    return (
        <section className="py-16 bg-white text-black">
            <div className="container mx-auto px-5 max-w-3xl">
                <h2 className="text-4xl font-bold text-center mb-6">
                    Supported File Types
                </h2>
                <p className="text-center text-gray-600 mb-12 text-base max-w-xl mx-auto">
                    Drop supports a wide range of file formats to meet all your sharing needs.
                </p>

                <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                    {fileTypes.map(({ type, label }) => (
                        <li
                            key={type}
                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-mono font-semibold text-lg tracking-wide">
                                {type}
                            </span>
                            <span className="text-sm text-gray-500">{label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FileType;
