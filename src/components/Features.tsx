import { featuresData } from "@/constants/data";

const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-50 scroll-mt-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-4xl font-bold text-center mb-14 text-black">
                    Features
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuresData.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="bg-white p-6 rounded-xl border border-gray-200 transition duration-300 hover:shadow-md hover:scale-[1.02] group"
                        >
                            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mb-4 text-black group-hover:bg-gray-200 transition">
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
