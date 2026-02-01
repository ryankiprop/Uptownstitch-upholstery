import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'

const ProductCard = ({ product }) => {
  const { addItem } = useCart()
  return (
    <div className="card group">
      <div className="relative overflow-hidden h-64">
        <LazyImage
          src={product.image_url}
          alt={product.name}
          type="product"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </span>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-primary-600 font-medium">
            {product.category}
          </span>
          {product.in_stock && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              In Stock
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => addItem(product)}
              className="btn-primary text-sm px-4 py-2"
            >
              Add to Cart
            </button>
            <Link
              to={`/products/${product.id}`}
              className="text-sm px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
