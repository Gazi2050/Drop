'use client';

import { useAuthStore } from '@/store/authStore';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEye, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { fetchUserFiles } from '@/utils/fetchUserFiles';
import { deleteFile } from '@/utils/deleteFile';
import UserSkeleton from './UserSkeleton';
import { UserFile } from '@/constants/type';
import { toast } from 'sonner';

const Dashboard = () => {
    const [files, setFiles] = useState<UserFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);
    const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

    const { user } = useAuthStore();

    useEffect(() => {
        const loadFiles = async () => {
            setLoading(true);
            const fetchedFiles = await fetchUserFiles();
            setFiles(fetchedFiles);
            setLoading(false);
        };

        const delayProfile = () => {
            setProfileLoading(true);
            setTimeout(() => setProfileLoading(false), 700);
        };

        delayProfile();
        loadFiles();
    }, []);

    const username = user?.username || '';
    const email = user?.email || '';
    const profilepic = `https://placehold.co/600x400?text=${username[0]}`;
    const created_at = user?.created_at ? dayjs(user.created_at).format('MMMM D, YYYY') : null;

    const totalStorageMB =
        files.reduce((acc, file) => acc + parseInt(file.filesize || '0'), 0) / (1024 * 1024);

    const stats = {
        filesUploaded: files.length,
        totalStorage: `${totalStorageMB.toFixed(2)} MB`,
        plan: 'Free',
    };

    const handleDelete = (fileId: string) => {
        const deletedFile = files.find((file) => file.id === fileId);
        if (!deletedFile) return;

        toast('Are you sure you want to delete this file?', {
            action: {
                label: 'Yes, Delete',
                onClick: async () => {
                    try {
                        setDeletingFileId(fileId);

                        toast.promise(
                            deleteFile(fileId),
                            {
                                loading: 'Deleting file...',
                                success: 'File deleted successfully',
                                error: 'Failed to delete file',
                            }
                        );
                        setFiles((prev) => prev.filter((file) => file.id !== fileId));
                    } catch (err) {
                        console.error(err);
                    } finally {
                        setDeletingFileId(null);
                    }
                },
            },
        });
    };


    return (
        <div className="min-h-screen bg-white py-10 px-4 text-gray-800">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image src="/logo.png" alt="logo" width={50} height={50} />
                        <span className="text-2xl font-bold text-gray-900 select-none">Drop</span>
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white font-semibold shadow-sm hover:bg-gray-900 active:scale-95 transition focus:outline-none hover:scale-[1.04]"
                    >
                        <FiUpload className="w-5 h-5" />
                        Upload File
                    </Link>
                </div>

                {/* Profile */}
                <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-6 pr-14 flex flex-col sm:flex-row sm:items-center justify-between min-h-[120px]">
                    {profileLoading ? (
                        <UserSkeleton />
                    ) : (
                        <>


                            <div className="flex items-center gap-5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={profilepic}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover border border-gray-300"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">{username}</h2>
                                    <p className="text-sm text-gray-500">{email}</p>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-0 text-sm text-gray-700 sm:text-right space-y-1">
                                {created_at && (
                                    <p className="flex items-center justify-start sm:justify-end gap-2">
                                        <FaCalendarAlt className="text-gray-500" />
                                        <span>Joined:</span>
                                        <span className="font-semibold text-gray-800">{created_at}</span>
                                    </p>
                                )}

                            </div>
                        </>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Files Uploaded', value: stats.filesUploaded },
                        { label: 'Storage Used', value: stats.totalStorage },
                        { label: 'Plan', value: stats.plan },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-gray-200 bg-white p-6 text-center"
                        >
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-xl font-semibold mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Files Table */}
                <div className="border border-gray-200 rounded-xl overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading files...</div>
                    ) : (
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
                                        key={file?.id}
                                        className="border-t border-gray-100 hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {file?.filename}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{file?.filetype}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {(parseInt(file?.filesize) / (1024 * 1024)).toFixed(2)} MB
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {dayjs(file?.created_at).format('MMMM D, YYYY')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-2 justify-center">
                                                <a
                                                    href={file?.fileurl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 hover:text-black transition focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                >
                                                    <FaEye className="w-4 h-4" />
                                                </a>
                                                {/*  */}
                                                <button
                                                    onClick={() => handleDelete(file.id)}
                                                    aria-label="Delete file"
                                                    disabled={deletingFileId === file.id}
                                                    className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-md bg-red-100 text-red-600 text-sm hover:bg-red-200 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-300"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {files.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-gray-500">
                                            No files uploaded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
