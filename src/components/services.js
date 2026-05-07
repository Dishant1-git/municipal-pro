import { HiOutlineLightBulb, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineOfficeBuilding } from 'react-icons/hi'

export const Services = () => {
    const servicesList = [
        {
            title: "Smart Lighting",
            desc: "Energy-efficient urban lighting controlled centrally to optimize power usage.",
            icon: <HiOutlineLightBulb className="text-4xl text-yellow-500" />
        },
        {
            title: "Security Surveillance",
            desc: "24/7 AI-driven camera systems ensuring public safety across all districts.",
            icon: <HiOutlineShieldCheck className="text-4xl text-blue-500" />
        },
        {
            title: "Waste Management",
            desc: "Automated route planning and smart bins for timely and efficient garbage collection.",
            icon: <HiOutlineTruck className="text-4xl text-green-500" />
        },
        {
            title: "Infrastructure Maintenance",
            desc: "Rapid response repairs for roads, public buildings, and civic amenities.",
            icon: <HiOutlineOfficeBuilding className="text-4xl text-purple-500" />
        }
    ]

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore the cutting-edge services we provide to maintain and enhance our smart city.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesList.map((service, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
