'use client';
import { navLinks } from '@/constants/data';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 1024) setIsOpen(false);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const id = href.replace(/^#/, '');
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
                {/* Logo */}
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

                {/* Centered nav (desktop) */}
                <nav className="hidden lg:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            onClick={(e) => handleNavClick(e, href)}
                            className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 font-medium transition-all duration-300 ease-in-out hover:scale-[1.04]"
                        >
                            {name}
                        </a>
                    ))}
                </nav>

                {/* Desktop actions */}
                <div className="hidden lg:flex items-center space-x-5">
                    <Link
                        href="/login"
                        className="text-gray-700 hover:bg-gray-200 rounded-md px-4 py-2 transition hover:scale-[1.05]"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-5 py-2 bg-black text-white rounded-lg font-semibold transition hover:bg-gray-800 hover:scale-[1.04]"
                    >
                        Sign up
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="lg:hidden text-gray-900"
                    aria-label="Toggle menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {/* Mobile menu */}
            <nav
                className={`lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                aria-label="Mobile Navigation"
            >
                <div className="flex flex-col px-6 py-4 space-y-4">
                    {navLinks.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            onClick={(e) => handleNavClick(e, href)}
                            className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 transition hover:scale-[1.03]"
                        >
                            {name}
                        </a>
                    ))}
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 transition hover:scale-[1.03]"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-black text-white rounded-lg font-semibold transition hover:bg-gray-800 hover:scale-[1.05]"
                    >
                        Sign up
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
