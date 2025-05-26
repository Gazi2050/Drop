
const UserSkeleton = () => {
    return (
        <div className="w-full flex flex-col sm:flex-row justify-between items-center animate-pulse gap-5">
            {/* Left: Profile picture + name/email */}
            <div className="flex items-center gap-5 w-full flex-1">
                <div className="w-20 h-20 rounded-full bg-gray-200 shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Right: Joined/updated info */}
            <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto text-sm">
                <div className="h-3 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-44 bg-gray-200 rounded" />
            </div>
        </div>
    );
};

export default UserSkeleton;
