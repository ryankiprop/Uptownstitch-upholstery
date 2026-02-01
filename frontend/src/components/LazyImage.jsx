import { useState, useRef, useEffect } from 'react'
import { branding } from '../config/branding'

const LazyImage = ({
  src,
  alt,
  className = '',
  type = 'default',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef()

  // Get appropriate placeholder based on type
  const getPlaceholder = () => {
    switch(type) {
      case 'product':
        return branding.images.defaults.product
      case 'service':
        return branding.images.defaults.service
      case 'gallery':
        return branding.images.defaults.gallery
      default:
        return branding.images.defaults.loading
    }
  }

  // Construct full image URL
  const getImageUrl = (imageSrc) => {
    if (!imageSrc) return getPlaceholder()

    // If it's already a full URL
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc
    }

    // Normalize API base: if VITE_API_URL includes an "/api" suffix, strip it
    const rawApi = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const apiBase = rawApi.replace(/\/api\/?$/i, '')

    // If it's a relative path starting with /uploads, prepend backend root (no /api)
    if (imageSrc.startsWith('/uploads')) {
      return `${apiBase}${imageSrc}`
    }

    // Otherwise return as is (local paths like /images/product.svg)
    return imageSrc
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  const imageSrc = hasError
    ? branding.images.defaults.error
    : isInView ? getImageUrl(src) : getPlaceholder()

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

export default LazyImage
