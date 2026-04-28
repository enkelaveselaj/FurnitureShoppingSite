export default function Home() {
  return (
    <div>

      {/* HERO */}

      <section
        className="section relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(44, 24, 16, 0.7), rgba(44, 24, 16, 0.7)), url('https://images.unsplash.com/photo-1582582494700-7d78b3a36f5c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >

        <div className="container-custom min-h-[80vh] flex items-center justify-center text-white">

          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="hero-title text-white mb-6 drop-shadow-2xl">
              Crafted for <span className="text-[var(--accent)]">Elegant</span> Living
            </h1>

            <p className="hero-subtitle text-gray-100 mx-auto mb-8 text-lg md:text-xl">
              Discover timeless furniture that blends
              craftsmanship, comfort, and luxury.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-[var(--accent)] hover:bg-[var(--secondary)]">
                Explore Collection
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-[var(--dark)] px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                View Catalog
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="section bg-gradient-to-br from-[var(--light)] to-white">

        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[var(--primary)]">LuxeWood</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of traditional craftsmanship and contemporary design
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">

            <div className="card group">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--secondary)] transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Premium Materials
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Crafted using the finest wood and luxury fabrics sourced sustainably from around the world.
              </p>
            </div>

            <div className="card group">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--secondary)] transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Modern Design
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Minimalist aesthetics designed for contemporary homes with attention to every detail.
              </p>
            </div>

            <div className="card group">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--secondary)] transition-colors duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Fast Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Reliable white-glove delivery service across the country with professional assembly.
              </p>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}