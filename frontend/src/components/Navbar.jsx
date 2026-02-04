import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { branding } from '../config/branding'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { items } = useCart()

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
    <nav className="glass-nav sticky top-0 z-50" role="navigation" aria-label="Main navigation">
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
              <div className="text-sm font-bold text-gray-100 group-hover:text-primary-300 transition-colors duration-200">
                {branding.site.name}
              </div>
              <div className="text-xs text-gray-400">
                {branding.site.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'text-primary-300 border-b-2 border-primary-300' : 'text-gray-200 hover:text-primary-300'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`nav-link ${isActive('/products') ? 'text-primary-300 border-b-2 border-primary-300' : 'text-gray-200 hover:text-primary-300'}`}
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'text-primary-300 border-b-2 border-primary-300' : 'text-gray-200 hover:text-primary-300'}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className={`nav-link relative ${isActive('/cart') ? 'text-primary-300' : 'text-gray-200 hover:text-primary-300'}`}
              onClick={closeMenu}
            >
              Cart
              {items.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-200 hover:text-primary-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-400"
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
          <div className="md:hidden py-4 border-t border-white/10 bg-slate-900/80 backdrop-blur-2xl">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`nav-link-mobile ${
                  isActive('/')
                    ? 'text-primary-300 bg-white/10'
                    : 'text-gray-200 hover:text-primary-300 hover:bg-white/5'
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`nav-link-mobile ${
                  isActive('/products')
                    ? 'text-primary-300 bg-white/10'
                    : 'text-gray-200 hover:text-primary-300 hover:bg-white/5'
                }`}
                onClick={closeMenu}
              >
                Products
              </Link>
              <Link
                to="/contact"
                className={`nav-link-mobile ${
                  isActive('/contact')
                    ? 'text-primary-300 bg-white/10'
                    : 'text-gray-200 hover:text-primary-300 hover:bg-white/5'
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className={`nav-link-mobile ${
                  isActive('/cart')
                    ? 'text-primary-300 bg-white/10'
                    : 'text-gray-200 hover:text-primary-300 hover:bg-white/5'
                }`}
                onClick={closeMenu}
              >
                Cart {items.length > 0 && `(${items.length})`}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
