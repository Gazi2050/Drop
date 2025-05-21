'use client';
import { faqData } from '@/constants/data';
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx: number) => {
        setOpenIndex(prev => (prev === idx ? -1 : idx));
    };

    return (
        <section id="faq" className="py-20 bg-gray-50 scroll-mt-20">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqData.map((item, idx) => {
                        const isOpen = idx === openIndex;
                        return (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full flex items-center justify-between p-5 cursor-pointer focus:outline-none"
                                >
                                    <span className="text-lg font-semibold text-gray-800">
                                        {item.question}
                                    </span>
                                    <span className="text-gray-500">
                                        {isOpen ? <FaMinus /> : <FaPlus />}
                                    </span>
                                </button>

                                <div
                                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 py-4' : 'max-h-0'
                                        }`}
                                >
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
