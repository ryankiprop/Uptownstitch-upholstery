import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { productsAPI } from '../services/api'
import { branding } from '../config/branding'

const Products = () => {
  const [products, setProducts] = useState([])
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
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getAll(filters)
      setProducts(response.data.products || [])
      setPagination({
        total: response.data.total || 0,
        pages: response.data.pages || 0,
        current_page: response.data.current_page || 1
      })
      setError(null)
    } catch (err) {
      setError('Failed to load products. Please try again.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories()
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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Upholstery Products",
    "description": "Premium upholstery materials and kits for your restoration projects",
    "url": `${branding.site.url}/products`,
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": product.name,
      "description": product.description,
      "category": product.category,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "USD",
        "availability": product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    }))
  }

  return (
    <>
      <SEO
        title="Products"
        description={`Browse our selection of premium upholstery materials, kits, and accessories for your vehicle restoration projects. ${branding.site.description}`}
        keywords={['products', 'upholstery materials', 'auto upholstery kits', 'restoration supplies', 'custom interiors']}
        canonicalUrl={`${branding.site.url}/products`}
        jsonLd={structuredData}
      />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our selection of premium upholstery materials, kits, and accessories 
              for your vehicle restoration projects.
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

          {/* Products Grid */}
          {!loading && !error && (
            <>
              {products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className="flex justify-center items-center space-x-2">
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
                  <div className="text-center mt-8 text-gray-600">
                    Showing {products.length} of {pagination.total} products
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600">
                      {filters.category 
                        ? `No products found in the "${filters.category}" category.`
                        : 'No products available at the moment.'}
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
        </div>
      </div>
    </>
  )
}

export default Products
