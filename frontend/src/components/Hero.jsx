import { Link } from 'react-router-dom'
import { branding } from '../config/branding'

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-gradient-to-br from-primary-500/25 via-sky-400/15 to-amber-300/20 opacity-80 blur-3xl" />
      </div>
      <div className="container">
        <div className="glass-panel max-w-4xl mx-auto text-center px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Premium Custom Upholstery
            <span className="block text-primary-200">{branding.site.tagline}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100/90 max-w-3xl mx-auto">
            {branding.site.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn-primary bg-white/90 text-primary-700 hover:bg-white px-8 py-4 text-lg font-semibold shadow-xl"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="btn-outline border-2 border-white/70 text-white hover:bg-white hover:text-primary-700 px-8 py-4 text-lg font-semibold bg-white/5 backdrop-blur"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
