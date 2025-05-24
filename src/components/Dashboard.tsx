import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEye, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

const Dashboard = () => {
    const user = {
        username: 'JohnDoe',
        email: 'john@example.com',
        profilePic: 'https://placehold.co/600x400',
        createdAt: '2024-08-14',
        updatedAt: '2025-05-20',
    };

    const stats = {
        filesUploaded: 42,
        totalStorage: '87.5 MB',
        plan: 'Free',
    };

    const files = [
        {
            id: '1',
            name: 'mockup-design.png',
            fileType: 'image/png',
            fileSize: '1.2 MB',
            createdAt: '2025-05-20',
            fileUrl: '#',
        },
        {
            id: '2',
            name: 'presentation.pdf',
            fileType: 'application/pdf',
            fileSize: '3.8 MB',
            createdAt: '2025-05-19',
            fileUrl: '#',
        },
    ];

    return (
        <div className="min-h-screen bg-white py-10 px-4 text-gray-800">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <Link
                        href="/"
                        aria-label="Homepage"
                        className="flex items-center space-x-3"
                    >
                        <Image src="/logo.png" alt="logo" width={50} height={50} />
                        <span className="text-2xl font-bold text-gray-900 select-none">
                            Drop
                        </span>
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white font-medium shadow-sm hover:bg-gray-900 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        <FiUpload className="w-5 h-5" />
                        Upload File
                    </Link>


                </div>

                {/* Profile Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between min-h-[120px]">
                    <div className="flex items-center gap-5">
                        <img
                            src={user.profilePic}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">{user.username}</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-sm text-gray-500 sm:text-right">
                        <p className="mb-1 flex items-center justify-start sm:justify-end">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            Joined: {user.createdAt}
                        </p>
                        <p className="flex items-center justify-start sm:justify-end">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            Last Update: {user.updatedAt}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Files Uploaded', value: stats.filesUploaded },
                        { label: 'Storage Used', value: stats.totalStorage },
                        { label: 'Plan', value: stats.plan },
                    ].map((stat, idx) => (
                        <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-xl font-semibold mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Files Table */}
                <div className="border border-gray-200 rounded-xl overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 text-[13px] uppercase tracking-wide border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold">File Name</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Size</th>
                                <th className="px-6 py-4 font-semibold">Uploaded</th>
                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[15px]">
                            {files.map((file) => (
                                <tr
                                    key={file.id}
                                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {file.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{file.fileType}</td>
                                    <td className="px-6 py-4 text-gray-600">{file.fileSize}</td>
                                    <td className="px-6 py-4 text-gray-600">{file.createdAt}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex items-center gap-2 justify-center">
                                            <a
                                                href={file.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 hover:text-black transition focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            >
                                                <FaEye className="w-4 h-4" />
                                            </a>
                                            <button
                                                aria-label="Delete file"
                                                className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-md bg-red-100 text-red-600 text-sm hover:bg-red-200 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-300"
                                            >
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;
