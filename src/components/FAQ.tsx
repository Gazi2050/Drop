'use client';
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqData = [
    {
        question: "Is Drop really free to use?",
        answer: "Yes, Drop is 100% free for everyone. We don’t have premium tiers or hidden charges—every feature is available to all users at no cost."
    },
    {
        question: "What happens if I don’t sign in?",
        answer: "Files uploaded without signing in are stored temporarily and will be deleted when you reload or close the tab. To keep files permanently, please create a free account."
    },
    {
        question: "Can I use Drop links directly on my website?",
        answer: "Yes! You can use your Drop file URLs as direct links on your website, blogs, or any platform to share your files seamlessly."
    },
    {
        question: "How secure is Drop?",
        answer: "Very secure. All uploads use encrypted connections (SSL/TLS) and are stored with AES-256 encryption. You can also password-protect and expire shared links."
    },
    {
        question: "Can I delete my files?",
        answer: "Yes. Registered users can delete files at any time. Guest files are automatically deleted after their temporary period and can’t be manually managed."
    },
    {
        question: "Do I need to create an account?",
        answer: "No, you can use Drop without creating an account. However, creating a free account gives you permanent storage, file management tools, and more control over your uploads."
    }
];



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
