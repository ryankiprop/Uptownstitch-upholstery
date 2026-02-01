import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import LazyImage from '../components/LazyImage'
import { productsAPI, servicesAPI, galleryAPI } from '../services/api'
import { branding } from '../config/branding'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [featuredServices, setFeaturedServices] = useState([])
  const [featuredGallery, setFeaturedGallery] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, servicesRes, galleryRes] = await Promise.all([
          productsAPI.getAll({ featured: true, per_page: 4 }),
          servicesAPI.getFeatured(),
          galleryAPI.getFeatured()
        ])

        setFeaturedProducts(productsRes.data.products || [])
        setFeaturedServices(servicesRes.data || [])
        setFeaturedGallery(galleryRes.data || [])
      } catch (error) {
        console.error('Error fetching home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": branding.site.name,
    "description": branding.site.description,
    "url": branding.site.url,
    "telephone": branding.contact.phone,
    "email": branding.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": branding.contact.address,
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345"
    },
    "sameAs": [
      branding.social.facebook,
      branding.social.instagram
    ]
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Home"
        description={branding.site.description}
        keywords={['home', 'upholstery services', 'custom interiors']}
        canonicalUrl={branding.site.url}
        jsonLd={structuredData}
      />
      
      <Hero />

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="featured-products">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="featured-products" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Premium upholstery materials and kits for your restoration projects
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured products available at the moment.</p>
            </div>
          )}

          <div className="text-center">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white" aria-labelledby="our-services">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="our-services" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional upholstery services tailored to your needs
            </p>
          </div>

          {featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
              {featuredServices.slice(0, 2).map((service) => (
                <div key={service.id} className="card p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <LazyImage
                      src={service.image_url}
                      alt={service.title}
                      type="service"
                      className="w-full md:w-48 h-48 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      <Link to="/services" className="btn-primary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Services information coming soon.</p>
            </div>
          )}

          <div className="text-center">
            <Link to="/services" className="btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="recent-work">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="recent-work" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a look at our latest upholstery projects and restorations
            </p>
          </div>

          {featuredGallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredGallery.slice(0, 6).map((item) => (
                <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <LazyImage
                    src={item.image_url}
                    alt={item.title}
                    type="gallery"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.category && (
                        <span className="text-sm text-gray-200">{item.category}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Gallery images coming soon.</p>
            </div>
          )}

          <div className="text-center">
            <Link to="/gallery" className="btn-outline">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white" aria-labelledby="ready-to-transform">
        <div className="container text-center">
          <h2 id="ready-to-transform" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Interior?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with us today for a free consultation and quote on your upholstery project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Get Free Quote
            </Link>
            <Link to="/gallery" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
