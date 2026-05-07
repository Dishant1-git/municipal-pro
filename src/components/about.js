import { Link } from "react-router-dom"

export const About = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Smart City Municipal Corporation</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We are dedicated to building a sustainable, efficient, and technologically advanced urban environment for all citizens.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1200" 
                            alt="City overview" 
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To transform our city into a globally recognized smart city that offers an exceptional quality of life, robust infrastructure, and sustainable economic growth.
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 pt-6">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Deploying cutting-edge technology and data-driven solutions to optimize city operations, improve public services, and foster a highly engaged community.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
