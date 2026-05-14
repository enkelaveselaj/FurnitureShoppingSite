export default function Home() {
  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(255,107,53,0.14),_transparent_35%),var(--light)]">

      {/* HERO */}
      <section
        className="section relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(44, 24, 16, 0.78), rgba(44, 24, 16, 0.78)), url('https://images.unsplash.com/photo-1582582494700-7d78b3a36f5c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.09),transparent_35%)] opacity-80 pointer-events-none"></div>

        <div className="container-custom min-h-[90vh] flex items-center justify-center text-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25"></div>

          <div className="text-center space-y-8 relative z-10">
            <div className="inline-block mb-4">
              <span className="bg-[var(--accent)] text-white text-sm font-semibold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg">
                Premium Furniture Collection
              </span>
            </div>

            <h1 className="hero-title text-white mb-6 drop-shadow-2xl">
              Crafted for <span className="text-[var(--accent)]">Elegant</span> Living
            </h1>

            <p className="hero-subtitle text-gray-100 mx-auto mb-8 text-lg md:text-xl max-w-3xl leading-relaxed">
              Discover timeless furniture that blends craftsmanship, comfort, and luxury for your perfect home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/products" className="btn-primary bg-[var(--accent)] hover:bg-[var(--secondary)] text-center">
                Explore Collection
              </a>
              <a
                href="/about"
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-[var(--dark)] px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-center"
              >
                Learn More
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-10 text-left sm:text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-[var(--accent)]">500+</div>
                <div className="text-sm text-gray-200">Products</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-[var(--accent)]">10K+</div>
                <div className="text-sm text-gray-200">Happy Customers</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-[var(--accent)]">25+</div>
                <div className="text-sm text-gray-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-gradient-to-br from-[var(--light)] to-white py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="bg-[var(--primary)] text-white text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[var(--primary)]">DreamLiving</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of traditional craftsmanship and contemporary design.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="card group">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">Premium Materials</h3>
              <p className="text-gray-600 leading-relaxed">
                Crafted using the finest wood and luxury fabrics sourced sustainably from around the world.
              </p>
            </div>
            <div className="card group">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">Modern Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Minimalist aesthetics designed for contemporary homes with attention to every detail.
              </p>
            </div>
            <div className="card group">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Reliable white-glove delivery service across the country with professional assembly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED STYLES */}
      <section className="section bg-white py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block">
              Featured Styles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Design Inspirations for Every Room
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-white border border-gray-100 shadow-xl p-8">
              <div className="text-[var(--accent)] text-3xl mb-5">Living Room</div>
              <p className="text-gray-600 leading-relaxed">
                Warm textures, layered lighting, and statement seating curated for comfortable gatherings.
              </p>
            </div>
            <div className="card bg-white border border-gray-100 shadow-xl p-8">
              <div className="text-[var(--accent)] text-3xl mb-5">Bedroom</div>
              <p className="text-gray-600 leading-relaxed">
                Soft, elegant pieces that make your bedroom feel calm, luxurious, and instantly welcoming.
              </p>
            </div>
            <div className="card bg-white border border-gray-100 shadow-xl p-8">
              <div className="text-[var(--accent)] text-3xl mb-5">Workspace</div>
              <p className="text-gray-600 leading-relaxed">
                Functional design with clean lines and premium finishes to help you stay focused and inspired.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
