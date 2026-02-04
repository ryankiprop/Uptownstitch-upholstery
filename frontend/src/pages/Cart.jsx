import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-2xl mx-auto py-12 text-center glass-panel px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Your Cart</h1>
          <p className="text-gray-200 mb-8 text-lg">Your cart is empty</p>
          <Link to="/products" className="btn-primary px-6 py-3 text-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="glass-panel">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-white/10 last:border-b-0 p-6 flex gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {item.description}
                    </p>
                    <p className="text-primary-200 font-bold text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center border border-white/20 rounded-lg bg-white/5">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-gray-200 hover:text-white"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 border-l border-r border-white/20 text-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-gray-200 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-300 mb-2">
                        Subtotal
                      </p>
                      <p className="text-lg font-bold text-white mb-3">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-300 hover:text-red-200 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-red-600 hover:text-red-800 font-medium"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
            <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 border-t border-b border-white/10 py-4 mb-6">
                <div className="flex justify-between text-gray-200">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-200">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-200">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-primary-200">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full block text-center py-3 mb-3 bg-primary-500/90 hover:bg-primary-400"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block text-center py-3 border border-white/70 text-white rounded-lg hover:bg-white hover:text-primary-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
