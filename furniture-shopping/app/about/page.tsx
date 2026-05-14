export default function About() {
  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(255,107,53,0.08),_transparent_40%),var(--light)]">

      {/* HERO SECTION */}
      <section
        className="section relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(139, 69, 19, 0.85), rgba(210, 105, 30, 0.75)), url('https://images.unsplash.com/photo-1556025728-ef9ce8d2b3a6')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),transparent_40%)] opacity-60 pointer-events-none"></div>
        <div className="container-custom min-h-[70vh] flex items-center justify-center text-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

          <div className="text-center space-y-6 relative z-10">
            <div className="inline-block mb-4">
              <span className="bg-[var(--accent)] text-white text-sm font-semibold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg">
                Our Story
              </span>
            </div>

            <h1 className="hero-title text-white mb-6">
              About <span className="text-[var(--accent)]">DreamLiving</span>
            </h1>

            <p className="hero-subtitle text-gray-100 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              We create furniture that transforms spaces into warm, elegant homes.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8 text-center">
              <div>
                <div className="text-5xl font-bold text-[var(--accent)] mb-2">25+</div>
                <div className="text-sm text-gray-200">Years Experience</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[var(--accent)] mb-2">10K+</div>
                <div className="text-sm text-gray-200">Happy Customers</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[var(--accent)] mb-2">50+</div>
                <div className="text-sm text-gray-200">Design Awards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY & MISSION SECTION */}
      <section className="section bg-gradient-to-br from-white to-[var(--light)] py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[var(--primary)] text-white text-sm font-semibold px-4 py-2 rounded-full">
                  Our Heritage
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Crafting <span className="text-[var(--secondary)]">Excellence</span> Since 1999
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                Founded with passion for craftsmanship, DreamLiving has grown into a trusted brand delivering timeless furniture designs. Our journey began in a small workshop with a simple mission: to create furniture that lasts generations while staying beautifully relevant.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we combine traditional woodworking techniques with modern innovation, ensuring every piece tells a story of quality, comfort, and sophisticated design.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4 p-4 bg-[var(--light)] rounded-xl shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Sustainably sourced materials</span>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-[var(--light)] rounded-xl shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Lifetime warranty on premium pieces</span>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-[var(--light)] rounded-xl shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Expert craftsmanship in every detail</span>
                </div>
              </div>
            </div>

            <div className="card bg-white p-8 lg:p-12 shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-gray-100">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <h3 className="font-bold text-2xl text-gray-900">Our Mission</h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  To deliver furniture that combines durability, comfort, and modern elegance. We believe your home deserves pieces that not only look beautiful but feel like they were made just for you.
                </p>

                <div className="pt-4 space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-[var(--light)] rounded-xl border border-gray-200">
                    <div className="w-3 h-3 bg-[var(--accent)] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">Exceptional craftsmanship</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[var(--light)] rounded-xl border border-gray-200">
                    <div className="w-3 h-3 bg-[var(--accent)] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">Sustainable practices</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[var(--light)] rounded-xl border border-gray-200">
                    <div className="w-3 h-3 bg-[var(--accent)] rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">Customer-first service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold px-4 py-2 rounded-full inline-block">
              Design Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Why our furniture feels different
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-white border border-gray-100 shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Timeless Balance</h3>
              <p className="text-gray-600 leading-relaxed">
                We blend clean modern lines with warm textures so every piece fits both current trends and long-term style.
              </p>
            </div>
            <div className="card bg-white border border-gray-100 shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comfort First</h3>
              <p className="text-gray-600 leading-relaxed">
                Comfort is built in from the first sketch. Our pieces support relaxed living without sacrificing refined design.
              </p>
            </div>
            <div className="card bg-white border border-gray-100 shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Detail Oriented</h3>
              <p className="text-gray-600 leading-relaxed">
                Every seam, edge, and finish is chosen with care to create furniture that feels as good as it looks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
