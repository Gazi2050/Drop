import React from 'react';
import { FaEye, FaTrash, FaCalendarAlt, FaCloudUploadAlt } from 'react-icons/fa';

const Dashboard = () => {
    // Dummy user & file data (replace with real data)
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
        <div className="min-h-screen bg-gray-50 text-black py-10 px-6">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition">
                        <FaCloudUploadAlt className="w-5 h-5" />
                        Upload New File
                    </button>
                </div>

                {/* User Profile Card */}
                <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-6">
                        <img
                            src={user.profilePic}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border border-gray-300 object-cover"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{user.username}</h2>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-0 sm:text-right text-sm text-gray-500">
                        <p className="mb-1"><FaCalendarAlt className="inline mr-2" />Joined: <strong>{user.createdAt}</strong></p>
                        <p><FaCalendarAlt className="inline mr-2" />Last Update: <strong>{user.updatedAt}</strong></p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Files Uploaded', value: stats.filesUploaded },
                        { label: 'Storage Used', value: stats.totalStorage },
                        { label: 'Plan', value: stats.plan },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <p className="text-2xl font-bold text-black">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Files Table */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase">
                            <tr>
                                <th className="px-6 py-4">File Name</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Size</th>
                                <th className="px-6 py-4">Uploaded</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file.id} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-black">{file.name}</td>
                                    <td className="px-6 py-4">{file.fileType}</td>
                                    <td className="px-6 py-4">{file.fileSize}</td>
                                    <td className="px-6 py-4">{file.createdAt}</td>
                                    <td className="px-6 py-4 text-center space-x-4">
                                        <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                            <FaEye className="inline text-gray-600 hover:text-black transition" />
                                        </a>
                                        <button>
                                            <FaTrash className="inline text-red-500 hover:text-red-700 transition" />
                                        </button>
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
