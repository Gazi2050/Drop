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

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded transition-all duration-300 ease-in-out"
                    aria-label="Homepage"
                >
                    <Image src={'/logo.png'} alt='logo' width={50} height={50} />
                    <span className="text-2xl font-bold tracking-wide text-gray-900 select-none transition-all duration-300 ease-in-out">
                        Drop
                    </span>
                </Link>

                {/* Desktop nav (lg and above) */}
                <nav className="hidden lg:flex space-x-4">
                    {navLinks.map(({ name, href }) => (
                        <Link
                            key={name}
                            href={href}
                            className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 font-medium transition-all duration-300 ease-in-out hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            {name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop actions (lg and above) */}
                <div className="hidden lg:flex items-center space-x-5">
                    <Link
                        href="/login"
                        className="text-gray-700 hover:bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out hover:scale-[1.05]"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-5 py-2 bg-black text-white rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-[1.05]"
                    >
                        Sign up
                    </Link>
                </div>

                {/* Mobile menu toggle (below lg) */}
                <button
                    className="lg:hidden text-gray-900 transition-all duration-300 ease-in-out"
                    aria-label="Toggle menu"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {/* Mobile menu (below lg) */}
            <nav
                className={`lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                aria-label="Mobile Navigation"
            >
                <div className="flex flex-col px-6 py-4 space-y-4">
                    {navLinks.map(({ name, href }) => (
                        <Link
                            key={name}
                            href={href}
                            className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out hover:scale-[1.03]"
                            onClick={() => setIsOpen(false)}
                        >
                            {name}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out hover:scale-[1.03]"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-2 bg-black text-white rounded-lg font-semibold text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-[1.05]"
                        onClick={() => setIsOpen(false)}
                    >
                        Sign up
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
