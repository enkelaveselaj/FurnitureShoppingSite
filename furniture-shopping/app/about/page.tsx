export default function About() {
  return (
    <div>

      {/* HERO SECTION */}
      <section 
        className="section relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(139, 69, 19, 0.9), rgba(210, 105, 30, 0.8)), url('https://images.unsplash.com/photo-1556025728-ef9ce8d2b3a6')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="container-custom min-h-[60vh] flex items-center justify-center text-white">

          <div className="text-center space-y-6">
            <h1 className="hero-title text-white mb-6">
              About <span className="text-[var(--accent)]">LuxeWood</span>
            </h1>

            <p className="hero-subtitle text-gray-100 max-w-3xl mx-auto text-lg md:text-xl">
              We create furniture that transforms
              spaces into warm, elegant homes.
            </p>

            <div className="flex justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--accent)]">25+</div>
                <div className="text-sm text-gray-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--accent)]">10K+</div>
                <div className="text-sm text-gray-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--accent)]">50+</div>
                <div className="text-sm text-gray-200">Design Awards</div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* STORY & MISSION SECTION */}
      <section className="section bg-gradient-to-br from-white to-[var(--light)]">

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
                Founded with passion for craftsmanship, LuxeWood has grown into a trusted brand delivering timeless furniture designs. Our journey began in a small workshop with a simple mission: to create furniture that lasts generations while staying beautifully relevant.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we combine traditional woodworking techniques with modern innovation, ensuring every piece tells a story of quality, comfort, and sophisticated design.
              </p>

              <div className="flex items-center space-x-4 pt-4">
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Sustainably Sourced Materials</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Lifetime Warranty</span>
              </div>
            </div>

            <div className="card bg-white p-8 lg:p-12 shadow-2xl">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <h3 className="font-bold text-2xl text-gray-900">
                  Our Mission
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  To deliver furniture that combines durability, comfort, and modern elegance. We believe your home deserves pieces that not only look beautiful but feel like they were made just for you.
                </p>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                    <span className="text-gray-700">Exceptional craftsmanship</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                    <span className="text-gray-700">Sustainable practices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                    <span className="text-gray-700">Customer-centric approach</span>
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