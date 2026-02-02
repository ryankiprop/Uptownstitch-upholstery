import { useState } from 'react'
import { productsAPI } from '../services/api'

function Admin() {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState(false)
  const [inStock, setInStock] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    if (!token.trim()) {
      setStatus({ type: 'error', message: 'Admin token is required.' })
      return
    }
    if (!name.trim() || !price || !category.trim()) {
      setStatus({ type: 'error', message: 'Name, price, and category are required.' })
      return
    }

    try {
      setLoading(true)

      // Use multipart/form-data so we can send an image file
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('category', category)
      if (description) formData.append('description', description)
      formData.append('featured', featured ? 'true' : 'false')
      formData.append('in_stock', inStock ? 'true' : 'false')
      if (imageFile) {
        formData.append('image', imageFile)
      }

      await productsAPI.create(formData, token)

      setStatus({ type: 'success', message: 'Product created successfully.' })
      setName('')
      setPrice('')
      setCategory('')
      setDescription('')
      setFeatured(false)
      setInStock(true)
      setImageFile(null)
      e.target.reset()
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to create product.'
      setStatus({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Admin – Product Management</h1>
      <p className="mb-6 text-gray-600">
        Enter your admin token and use this form to add new products. This page is not publicly linked.
      </p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="admin-token">
          Admin Token
        </label>
        <input
          id="admin-token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Paste the ADMIN_TOKEN value here"
        />
        <p className="mt-1 text-xs text-gray-500">
          This should match the <code>ADMIN_TOKEN</code> environment variable configured on the backend.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="e.g. Seat Upholstery"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Describe the service or product details"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-700"
            />
            <p className="mt-1 text-xs text-gray-500">
              Optional. If not provided, you can later update with an image URL.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 text-amber-600 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="text-sm text-gray-700">
              Featured
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="in-stock"
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 text-amber-600 border-gray-300 rounded"
            />
            <label htmlFor="in-stock" className="text-sm text-gray-700">
              In stock
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 rounded-md bg-amber-600 text-white font-medium hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Create Product'}
          </button>

          {status && (
            <p
              className={`text-sm ${
                status.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status.message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Admin

