import React from 'react';
import { MdBuild } from 'react-icons/md';

const page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white font-sans">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-md text-center">
                <MdBuild className="mx-auto text-black w-16 h-16 mb-6" />
                <h1 className="text-3xl font-bold text-black mb-3">
                    Page Under Development
                </h1>
                <p className="text-gray-700 text-base">
                    We’re working on it. Stay tuned!
                </p>
            </div>
        </div>
    );
};

export default page;
