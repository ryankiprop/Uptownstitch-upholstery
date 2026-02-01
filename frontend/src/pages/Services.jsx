import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'
import LoadingSpinner from '../components/LoadingSpinner'
import { servicesAPI } from '../services/api'
import { branding } from '../config/branding'
import { Link } from 'react-router-dom'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await servicesAPI.getAll()
      setServices(response.data || [])
      setError(null)
    } catch (err) {
      setError('Failed to load services. Please try again.')
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional upholstery services with attention to detail and quality craftsmanship. 
            From complete restorations to custom designs, we bring your vision to life.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && (
          <>
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {services.map((service) => (
                  <div key={service.id} className="card p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/3">
                        <LazyImage
                          src={service.image_url}
                          alt={service.title}
                          type="service"
                          className="w-full h-48 lg:h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="lg:w-2/3">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {service.title}
                          </h3>
                          {service.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link
                            to="/contact"
                            className="btn-primary text-center"
                          >
                            Get Quote
                          </Link>
                          <button className="btn-outline text-center">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Services Coming Soon
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We're currently updating our service offerings. Please check back soon or contact us directly.
                  </p>
                  <Link to="/contact" className="btn-primary">
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* Process Section */}
        <section className="py-16 bg-white rounded-lg shadow-lg">
          <div className="px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Consultation
                </h3>
                <p className="text-gray-600">
                  We discuss your vision, requirements, and budget to create a detailed plan.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Material Selection
                </h3>
                <p className="text-gray-600">
                  Choose from our premium selection of fabrics, leathers, and materials.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Craftsmanship
                </h3>
                <p className="text-gray-600">
                  Our skilled artisans bring your project to life with precision and care.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Final Delivery
                </h3>
                <p className="text-gray-600">
                  We deliver your completed project with quality assurance and satisfaction guarantee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 py-16 bg-primary-600 text-white rounded-lg">
          <div className="text-center px-8">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Let us transform your space with our expert upholstery services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Get Free Consultation
              </Link>
              <Link to="/gallery" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Services
