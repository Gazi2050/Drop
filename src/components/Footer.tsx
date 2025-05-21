'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaTwitter, FaGithub, FaReddit } from 'react-icons/fa';

const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
];

const supportLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
];

const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaReddit, href: '#', label: 'Reddit' },
];

const Footer = () => {
    return (
        <footer className="bg-white text-black border-t border-gray-200 mt-auto py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-12">
                    {/* Logo & About */}
                    <div>
                        <Link href="/" aria-label="Homepage" className="flex items-center space-x-3 mb-4">
                            <Image src="/logo.png" alt="logo" width={50} height={50} />
                            <span className="text-2xl font-bold text-gray-900 select-none">Drop</span>
                        </Link>
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            A simple and fast way to upload and share files instantly. Completely free, forever.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                                <a
                                    key={idx}
                                    href={href}
                                    aria-label={label}
                                    className="group w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 transition duration-200 hover:bg-black"
                                >
                                    <Icon className="w-5 h-5 text-gray-700 transition-colors group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            {productLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-black transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="hover:text-black transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                            Subscribe to our newsletter for updates and new features.
                        </p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex max-w-md mx-auto"
                        >
                            <input
                                type="email"
                                placeholder="Your email"
                                aria-label="Email address"
                                className="flex-1 px-4 py-3 rounded-l-lg bg-gray-100 text-gray-900 placeholder-gray-400 transition focus:outline-none border border-gray-200"
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-r-lg bg-black text-white text-sm font-semibold hover:bg-gray-900 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500 select-none">
                    &copy; {new Date().getFullYear()} Drop. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
