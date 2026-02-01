import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { branding } from '../config/branding'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            aria-label={`${branding.site.name} homepage`}
          >
            <img 
              src={branding.site.logo.icon} 
              alt={branding.site.name}
              className="w-10 h-10 group-hover:opacity-80 transition-opacity duration-200"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                {branding.site.name}
              </div>
              <div className="text-xs text-gray-500">
                {branding.site.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`nav-link ${isActive('/products') ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              to="/services"
              className={`nav-link ${isActive('/services') ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className={`nav-link ${isActive('/gallery') ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`nav-link-mobile ${isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`nav-link-mobile ${isActive('/products') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                onClick={closeMenu}
              >
                Products
              </Link>
              <Link
                to="/services"
                className={`nav-link-mobile ${isActive('/services') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link
                to="/gallery"
                className={`nav-link-mobile ${isActive('/gallery') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                onClick={closeMenu}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className={`nav-link-mobile ${isActive('/contact') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
