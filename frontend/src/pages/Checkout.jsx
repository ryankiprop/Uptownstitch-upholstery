import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { contactAPI } from '../services/api'

const Checkout = () => {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-2xl mx-auto py-12 text-center glass-panel px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Checkout</h1>
          <p className="text-gray-200 mb-8 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary px-6 py-3 text-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, '')))
      newErrors.cardNumber = 'Invalid card number'
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'Invalid CVV'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const orderMessage = `Order placed by ${formData.firstName} ${formData.lastName}. Items: ${items
        .map((i) => `${i.name} (x${i.quantity})`)
        .join(', ')}. Total: $${total.toFixed(2)}`
      await contactAPI.submit({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: 'New Order',
        message: orderMessage,
      })

      alert('Order placed successfully! We will contact you soon.')
      clearCart()
      navigate('/products')
    } catch (error) {
      alert('Error placing order. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="glass-panel p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Shipping Information
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                      errors.firstName ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                      errors.lastName ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                    errors.email ? 'border-red-400' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                    errors.phone ? 'border-red-400' : ''
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                    errors.address ? 'border-red-400' : ''
                  }`}
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                      errors.city ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                      errors.state ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.state && (
                    <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                      errors.zipCode ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="glass-panel p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Payment Information
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                    errors.cardName ? 'border-red-400' : ''
                  }`}
                />
                {errors.cardName && (
                  <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength="19"
                  className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                    errors.cardNumber ? 'border-red-400' : ''
                  }`}
                />
                {errors.cardNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    maxLength="5"
                    className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                      errors.expiryDate ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength="4"
                    className={`w-full px-4 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                      errors.cvv ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.cvv && (
                    <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg font-semibold disabled:opacity-50 bg-primary-500/90 hover:bg-primary-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-200">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between mb-2 text-gray-200">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-200">
                  <span>Shipping & Tax</span>
                  <span>Calculated</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-primary-200">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
