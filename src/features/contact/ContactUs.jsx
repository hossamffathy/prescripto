import Footer from "../home/Footer";

export default function ContactUs() {
  return (
    <>
      <div className="py-16 px-6 md:px-12 bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <img
            src="contact.png"
            alt="Contact"
            className="w-full rounded-2xl shadow-xl object-cover h-[400px]"
          />

          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-blue-700">
              CONTACT <span className="text-gray-900">US</span>
            </h2>
            <div className="space-y-6 text-[15px] leading-relaxed">
              <div>
                <p className="text-gray-900 font-semibold mb-1">OUR OFFICE</p>
                <p>56709 Wilma Station</p>
                <p>Suite 350, Washington, USA</p>
              </div>

              <div>
                <p><strong>Tel:</strong> (475) 555-0132</p>
                <p><strong>Email:</strong> greatstackdev@gmail.com</p>
              </div>

              <div>
                <p className="text-gray-900 font-semibold mb-1">
                  CAREERS AT PRESCRIPTO
                </p>
                <p>
                  Learn more about our teams and current job openings.
                </p>
              </div>

              <button  className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
               <a href="/career"> Explore Jobs</a> 
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
