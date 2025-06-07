import { FaFileUpload, FaUpload, FaHistory, FaLink, FaShareAlt, FaTwitter, FaGithub, FaReddit } from "react-icons/fa";

export const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
];

export const features = [
    'No signup required',
    'Instant sharing',
    'Multiple file formats',
];

export const featuresData = [
    {
        icon: FaUpload,
        title: "Easy Uploads",
        description:
            "Upload PDFs, JPG, PNG, and many other popular file formats with a simple drag and drop.",
    },
    {
        icon: FaHistory,
        title: "File History",
        description:
            "Create an account to access your upload history and manage your files anytime.",
    },
    {
        icon: FaShareAlt,
        title: "Instant Sharing",
        description:
            "Get shareable URLs instantly after upload to share with friends or colleagues.",
    },
];

export const fileTypes = [
    { type: "PDF", label: "Documents" },
    { type: "JPG", label: "Images" },
    { type: "PNG", label: "Images" },
    { type: "WEBP", label: "Images" },
    { type: "GIF", label: "Animations" },
    { type: "BMP", label: "Images" },
    { type: "SVG", label: "Vector" },
    { type: "HEIC", label: "Images" },
];

export const steps = [
    {
        icon: FaFileUpload,
        title: "Upload Your File",
        description: "Drag and drop or select files to upload. No account needed.",
    },
    {
        icon: FaLink,
        title: "Get Your Link",
        description: "Receive an instant shareable URL once your file is uploaded.",
    },
    {
        icon: FaShareAlt,
        title: "Share Anywhere",
        description: "Share your link via email, messaging apps, or social media.",
    },
];

export const PricingData = [
    {
        title: "Easy Uploads",
        subtitle: "Upload a variety of popular file formats with ease",
    },
    {
        title: "Unlimited Storage",
        subtitle: "Store all your files without limits",
    },
    {
        title: "Advanced File Management",
        subtitle: "Organize, delete, and manage your uploads seamlessly",
    },
    {
        title: "Stored Forever",
        subtitle: "Your files are saved permanently unless you delete them",
    },
    {
        title: "Multiple File Formats",
        subtitle: "Support for PDFs, images",
    },
    {
        title: "No Ads or Tracking",
        subtitle: "Enjoy a clean, distraction-free experience",
    },
];

export const faqData = [
    {
        question: "Is Drop really free to use?",
        answer:
            "Yes, Drop is 100% free with no hidden fees or premium plans.\nAll features are available to everyone.",
    },
    {
        question: "What happens if I don’t sign in?",
        answer:
            "Your files are stored permanently, but the link is lost if you close or reload the tab.\nSign in to keep access and manage your uploads.",
    },
    {
        question: "Can I use Drop links directly on my website?",
        answer:
            "Yes, Drop links work on websites, blogs, or anywhere online.\nThey provide direct, seamless access to your files.",
    },
    {
        question: "How long are my files stored?",
        answer:
            "All files are stored permanently.\nOnly registered users can manage or delete them.",
    },
    {
        question: "Can I delete my files?",
        answer:
            "Yes, if you're signed in. Guest users can't delete files,\nbut their uploads are still stored.",
    },
    {
        question: "Do I need to create an account?",
        answer:
            "No, but without one you can't manage or recover your files later.\nAn account gives you full control and file access anytime.",
    },
];


export const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
];

export const supportLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
];

export const socialLinks = [
    { icon: FaTwitter, href: 'https://x.com', label: 'Twitter' },
    { icon: FaGithub, href: 'https://github.com/Gazi2050/Drop', label: 'GitHub' },
    { icon: FaReddit, href: 'https://www.reddit.com', label: 'Reddit' },
];