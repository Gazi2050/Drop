import React from 'react';
import Link from 'next/link';

const CTA = () => {
    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-6 text-center max-w-3xl">
                <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
                    Ready to start sharing?
                </h2>
                <p className="text-lg md:text-xl mb-10 text-gray-300 leading-relaxed">
                    Create an account to manage your uploads and access all features for free.
                </p>
                <div className="flex justify-center">
                    <Link
                        href="/signup"
                        className="inline-block px-14 py-4 bg-white text-black font-semibold rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
