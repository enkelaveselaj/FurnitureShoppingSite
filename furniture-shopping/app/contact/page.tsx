export default function Contact() {
  return (
    <div>

      {/* HERO SECTION */}
      <section 
        className="section relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(44, 24, 16, 0.85), rgba(139, 69, 19, 0.75)), url('https://images.unsplash.com/photo-1604326173788-719c8e7c1a6a')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="container-custom min-h-[50vh] flex items-center justify-center text-white">

          <div className="text-center space-y-6">
            <h1 className="hero-title text-white mb-6">
              Get in <span className="text-[var(--accent)]">Touch</span>
            </h1>

            <p className="hero-subtitle text-gray-100 max-w-2xl mx-auto text-lg md:text-xl">
              We'd love to hear from you. Whether you have a question about our products, 
              need design advice, or want to discuss a custom project.
            </p>
          </div>

        </div>

      </section>

      {/* CONTACT FORM & INFO SECTION */}
      <section className="section bg-gradient-to-br from-white to-[var(--light)]">

        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card bg-white p-8 lg:p-12 shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      placeholder="Tell us more about your project or question..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200 resize-none"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="btn-primary w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="card bg-white p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900">
                    Visit Our Showroom
                  </h3>

                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-medium">123 Design Street</p>
                        <p>Furniture District, NY 10001</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-medium">+1 (555) 123-4567</p>
                        <p className="text-sm">Mon-Fri: 9AM-6PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-medium">hello@luxewood.com</p>
                        <p className="text-sm">24/7 Email Support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

    </div>
  );
}