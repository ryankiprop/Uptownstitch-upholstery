import { useState, useEffect } from 'react'
import GalleryCard from '../components/GalleryCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { galleryAPI } from '../services/api'

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    page: 1,
    per_page: 12
  })
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    current_page: 1
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchGalleryItems()
  }, [filters])

  const fetchGalleryItems = async () => {
    try {
      setLoading(true)
      const response = await galleryAPI.getAll(filters)
      setGalleryItems(response.data.items || [])
      setPagination({
        total: response.data.total || 0,
        pages: response.data.pages || 0,
        current_page: response.data.current_page || 1
      })
      setError(null)
    } catch (err) {
      setError('Failed to load gallery. Please try again.')
      console.error('Error fetching gallery:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await galleryAPI.getCategories()
      setCategories(response.data || [])
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category,
      page: 1
    }))
  }

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of completed upholstery projects. From classic car restorations 
            to modern furniture makeovers, see the quality and craftsmanship we bring to every project.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-700 font-medium">Filter by category:</span>
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                filters.category === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  filters.category === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && (
          <>
            {galleryItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {galleryItems.map((item) => (
                    <GalleryCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mb-8">
                    <button
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                      className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    <span className="text-gray-600">
                      Page {pagination.current_page} of {pagination.pages}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.pages}
                      className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Results count */}
                <div className="text-center text-gray-600">
                  Showing {galleryItems.length} of {pagination.total} projects
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Gallery Items Found
                  </h3>
                  <p className="text-gray-600">
                    {filters.category 
                      ? `No projects found in the "${filters.category}" category.`
                      : 'Our gallery is being updated with new projects.'}
                  </p>
                  {filters.category && (
                    <button
                      onClick={() => handleCategoryChange('')}
                      className="mt-4 btn-primary"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <section className="mt-16 py-16 bg-primary-600 text-white rounded-lg">
          <div className="text-center px-8">
            <h2 className="text-3xl font-bold mb-4">
              Inspired by Our Work?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us create something beautiful for you. Contact us today to discuss your upholstery project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Start Your Project
              </a>
              <a
                href="/services"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
              >
                Our Services
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Gallery
