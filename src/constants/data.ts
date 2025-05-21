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
        title: "Password Protection",
        subtitle: "Secure your shared files with passwords",
    },
    {
        title: "Multiple File Formats",
        subtitle: "Support for PDFs, images, and more",
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
            "Yes, Drop is 100% free for everyone. We don’t have premium tiers or hidden charges—every feature is available to all users at no cost.",
    },
    {
        question: "What happens if I don’t sign in?",
        answer:
            "Files uploaded without signing in are stored temporarily and will be deleted when you reload or close the tab. To keep files permanently, please create a free account.",
    },
    {
        question: "Can I use Drop links directly on my website?",
        answer:
            "Yes! You can use your Drop file URLs as direct links on your website, blogs, or any platform to share your files seamlessly.",
    },
    {
        question: "How secure is Drop?",
        answer:
            "Very secure. All uploads use encrypted connections (SSL/TLS) and are stored with AES-256 encryption. You can also password-protect and expire shared links.",
    },
    {
        question: "Can I delete my files?",
        answer:
            "Yes. Registered users can delete files at any time. Guest files are automatically deleted after their temporary period and can’t be manually managed.",
    },
    {
        question: "Do I need to create an account?",
        answer:
            "No, you can use Drop without creating an account. However, creating a free account gives you permanent storage, file management tools, and more control over your uploads.",
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
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaReddit, href: '#', label: 'Reddit' },
];