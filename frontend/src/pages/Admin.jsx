import { useEffect, useState } from 'react'
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
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true)
      const res = await productsAPI.getAll({ per_page: 100 })
      setProducts(res.data.products || [])
    } catch (error) {
      console.error('Failed to fetch products', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

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
      fetchProducts()
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to create product.'
      setStatus({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleField = async (product, field) => {
    if (!token.trim()) {
      setStatus({ type: 'error', message: 'Admin token is required for updates.' })
      return
    }
    try {
      const updated = { [field]: !product[field] }
      const res = await productsAPI.update(product.id, updated, token)
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? res.data : p))
      )
      setStatus({ type: 'success', message: `Product ${field} updated.` })
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to update product.'
      setStatus({ type: 'error', message })
    }
  }

  const handleDelete = async (productId) => {
    if (!token.trim()) {
      setStatus({ type: 'error', message: 'Admin token is required for deletion.' })
      return
    }
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await productsAPI.delete(productId, token)
      setProducts((prev) => prev.filter((p) => p.id !== productId))
      setStatus({ type: 'success', message: 'Product deleted.' })
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to delete product.'
      setStatus({ type: 'error', message })
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold mb-2 text-white">Admin – Product Management</h1>
      <p className="mb-6 text-gray-300">
        Enter your admin token and use this form to add new products. This page is not publicly linked.
      </p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="admin-token">
          Admin Token
        </label>
        <input
          id="admin-token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full px-3 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Paste the ADMIN_TOKEN value here"
        />
        <p className="mt-1 text-xs text-gray-400">
          This should match the <code>ADMIN_TOKEN</code> environment variable configured on the backend.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 glass-panel p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="name">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="e.g. Seat Upholstery"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 glass-input focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Describe the service or product details"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-200"
            />
            <p className="mt-1 text-xs text-gray-400">
              Optional. If not provided, you can later update with an image URL.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 text-amber-400 border-white/30 rounded bg-white/10"
            />
            <label htmlFor="featured" className="text-sm text-gray-200">
              Featured
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="in-stock"
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 text-amber-400 border-white/30 rounded bg-white/10"
            />
            <label htmlFor="in-stock" className="text-sm text-gray-200">
              In stock
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 rounded-md bg-amber-500 text-slate-950 font-medium hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Create Product'}
          </button>

          {status && (
            <p
              className={`text-sm ${
                status.type === 'success' ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {status.message}
            </p>
          )}
        </div>
      </form>

      <section className="glass-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Existing Products</h2>
          <button
            type="button"
            onClick={fetchProducts}
            disabled={loadingProducts}
            className="text-sm px-3 py-1 rounded-md border border-white/30 bg-white/5 hover:bg-white/10 disabled:opacity-60 text-gray-100"
          >
            {loadingProducts ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-sm text-gray-300">No products found yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-300">
                  <th className="text-left py-2 pr-4">ID</th>
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-left py-2 pr-4">Category</th>
                  <th className="text-left py-2 pr-4">Price</th>
                  <th className="text-left py-2 pr-4">Featured</th>
                  <th className="text-left py-2 pr-4">In Stock</th>
                  <th className="text-left py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-white/10 last:border-0 text-gray-100">
                    <td className="py-2 pr-4 text-gray-400">{product.id}</td>
                    <td className="py-2 pr-4">{product.name}</td>
                    <td className="py-2 pr-4">{product.category}</td>
                    <td className="py-2 pr-4">${product.price}</td>
                    <td className="py-2 pr-4">
                      <button
                        type="button"
                        onClick={() => handleToggleField(product, 'featured')}
                        className={`px-2 py-1 rounded text-xs ${
                          product.featured
                            ? 'bg-amber-400/20 text-amber-100 border border-amber-300/40'
                            : 'bg-white/5 text-gray-200 border border-white/20'
                        }`}
                      >
                        {product.featured ? 'Yes' : 'No'}
                      </button>
                    </td>
                    <td className="py-2 pr-4">
                      <button
                        type="button"
                        onClick={() => handleToggleField(product, 'in_stock')}
                        className={`px-2 py-1 rounded text-xs ${
                          product.in_stock
                            ? 'bg-emerald-400/20 text-emerald-100 border border-emerald-300/40'
                            : 'bg-red-400/20 text-red-100 border border-red-300/40'
                        }`}
                      >
                        {product.in_stock ? 'In stock' : 'Out'}
                      </button>
                    </td>
                    <td className="py-2 pr-4 space-x-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default Admin

