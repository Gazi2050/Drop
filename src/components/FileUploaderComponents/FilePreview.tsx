import { FiFile, FiX } from 'react-icons/fi';
interface FilePreviewProps {
    file: File;
    previewUrl?: string;
    onRemove: () => void;
}
const FilePreview = ({ file, previewUrl, onRemove }: FilePreviewProps) => {
    return (
        <div className="relative w-36 h-44 flex flex-col items-center justify-start" onClick={(e) => e.stopPropagation()}>
            {file.type.startsWith('image/') && previewUrl ? (
                <img src={previewUrl} alt={file.name} className="h-32 w-32 object-cover rounded-xl" />
            ) : file.type === 'application/pdf' ? (
                <FiFile className="h-16 w-16 text-gray-500 mb-1" />
            ) : null}

            <p className="text-xs text-center mt-2 truncate max-w-[8rem]">{file.name}</p>

            <button
                type="button"
                onClick={onRemove}
                className="absolute -top-1 right-1 p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white transition-all shadow-md"
                aria-label={`Remove ${file.name}`}
            >
                <FiX size={16} />
            </button>
        </div>
    )
};

export default FilePreview;