import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import LazyImage from '../components/LazyImage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useCart } from '../context/CartContext'
import { productsAPI } from '../services/api'
import { branding } from '../config/branding'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-panel max-w-lg w-full text-center px-8 py-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-200 mb-6">
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Link to="/products" className="btn-primary bg-primary-500/90 hover:bg-primary-400">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-primary-300">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/products" className="hover:text-primary-300">Products</Link>
            </li>
            <li>/</li>
            <li className="text-gray-100">{product.name}</li>
          </ol>
        </nav>

        <div className="glass-panel rounded-3xl overflow-hidden">
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
                <span className="inline-block bg-primary-500/20 text-primary-100 text-sm px-3 py-1 rounded-full border border-primary-300/40">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="ml-2 inline-block bg-amber-400/20 text-amber-100 text-sm px-3 py-1 rounded-full border border-amber-200/40">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <span className="text-3xl font-bold text-primary-200">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.in_stock
                      ? 'bg-emerald-400/15 text-emerald-200 border border-emerald-300/40'
                      : 'bg-red-400/20 text-red-200 border border-red-300/40'
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      product.in_stock ? 'bg-emerald-300' : 'bg-red-300'
                    }`}></span>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {product.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    addItem(product)
                    navigate('/cart')
                  }}
                  disabled={!product.in_stock}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    product.in_stock
                      ? 'btn-primary bg-primary-500/90 hover:bg-primary-400'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </button>

                <Link
                  to="/contact"
                  className="block w-full text-center py-3 px-6 border border-white/70 text-white rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors duration-200 bg-white/5"
                >
                  Get Quote
                </Link>
              </div>

              {/* Product Details */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Product Details
                </h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-300">Category:</dt>
                    <dd className="font-medium text-gray-100">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-300">Availability:</dt>
                    <dd className="font-medium text-gray-100">
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </dd>
                  </div>
                  {product.created_at && (
                    <div className="flex justify-between">
                        <dt className="text-gray-300">Added:</dt>
                        <dd className="font-medium text-gray-100">
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
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
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
