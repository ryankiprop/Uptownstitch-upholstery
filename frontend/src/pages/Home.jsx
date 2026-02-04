import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { productsAPI } from '../services/api'
import { branding } from '../config/branding'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await productsAPI.getAll({ featured: true, per_page: 4 })
        setFeaturedProducts(productsRes.data.products || [])
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
      <section className="py-16" aria-labelledby="featured-products">
        <div className="container">
          <div className="glass-panel px-8 py-10 md:py-12">
            <div className="text-center mb-10">
              <h2 id="featured-products" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-200/90 max-w-2xl mx-auto">
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
                <p className="text-gray-300">No featured products available at the moment.</p>
              </div>
            )}

            <div className="text-center">
              <Link to="/products" className="btn-primary bg-primary-500/90 hover:bg-primary-400">
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" aria-labelledby="ready-to-transform">
        <div className="container">
          <div className="glass-panel px-8 py-12 text-center">
            <h2 id="ready-to-transform" className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Interior?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              Get in touch with us today for a free consultation and quote on your upholstery project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary bg-white/90 text-primary-700 hover:bg-white">
                Get Free Quote
              </Link>
              <Link
                to="/products"
                className="btn-outline border-white/80 text-white hover:bg-white hover:text-primary-700"
              >
                View Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
