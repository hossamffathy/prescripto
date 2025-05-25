import React from "react";
import Footer from "../home/Footer";

export default function About() {
  return (
    <>
      <div className="py-16 px-6 md:px-12 bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* About Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/about.png"
              alt="About Us"
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            />
            <div>
              <h2 className="text-4xl font-bold mb-6 text-blue-700">
                ABOUT <span className="text-gray-900">US</span>
              </h2>
              <div className="space-y-4 text-[15px] leading-relaxed">
                <p>
                  Welcome to <strong>Prescripto</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling appointments and managing their health records.
                </p>
                <p>
                  At Prescripto, we are committed to excellence in healthcare technology. Our platform constantly evolves to include the latest advancements, delivering a superior experience at every step of your healthcare journey.
                </p>
                <p>
                  Our vision is to create a seamless connection between patients and healthcare providers — making it easier for you to access the care you need, when you need it.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section>
            <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">
              WHY <span className="text-gray-900">CHOOSE US</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">EFFICIENCY</h4>
                <p className="text-sm text-gray-600">
                  Streamlined appointment scheduling that fits into your busy lifestyle.
                </p>
              </div>
              <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">CONVENIENCE</h4>
                <p className="text-sm text-gray-600">
                  Access to a network of trusted healthcare professionals in your area.
                </p>
              </div>
              <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">PERSONALIZATION</h4>
                <p className="text-sm text-gray-600">
                  Tailored recommendations and reminders to help you stay on top of your health.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
