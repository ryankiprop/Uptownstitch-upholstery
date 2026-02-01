import { Link } from 'react-router-dom'
import { branding } from '../config/branding'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Premium Custom Upholstery
            <span className="block text-primary-200">{branding.site.tagline}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            {branding.site.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="btn-outline border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20 text-gray-50 fill-current"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero
