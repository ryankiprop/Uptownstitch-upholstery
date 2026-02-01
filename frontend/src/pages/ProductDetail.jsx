import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'
import LoadingSpinner from '../components/LoadingSpinner'
import { productsAPI } from '../services/api'
import { branding } from '../config/branding'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getById(id)
      setProduct(response.data)
      setError(null)
    } catch (err) {
      setError('Product not found or failed to load.')
      console.error('Error fetching product:', err)
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

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-primary-600">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/products" className="hover:text-primary-600">Products</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8">
              <div className="aspect-w-1 aspect-h-1">
                <LazyImage
                  src={product.image_url}
                  alt={product.name}
                  type="product"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.in_stock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      product.in_stock ? 'bg-green-400' : 'bg-red-400'
                    }`}></span>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {product.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  disabled={!product.in_stock}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    product.in_stock
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.in_stock ? 'Order Now' : 'Out of Stock'}
                </button>

                <Link
                  to="/contact"
                  className="block w-full text-center py-3 px-6 border border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors duration-200"
                >
                  Get Quote
                </Link>
              </div>

              {/* Product Details */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Details
                </h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Category:</dt>
                    <dd className="font-medium text-gray-900">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Availability:</dt>
                    <dd className="font-medium text-gray-900">
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </dd>
                  </div>
                  {product.created_at && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Added:</dt>
                      <dd className="font-medium text-gray-900">
                        {new Date(product.created_at).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Related Products
          </h2>
          <div className="text-center">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
