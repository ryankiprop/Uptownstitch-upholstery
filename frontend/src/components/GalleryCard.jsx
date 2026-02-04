import LazyImage from './LazyImage'

const GalleryCard = ({ item }) => {
  return (
    <div className="card group overflow-hidden">
      <div className="aspect-w-16 aspect-h-12">
        <LazyImage
          src={item.image_url}
          alt={item.title}
          type="gallery"
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
            {item.category && (
              <span className="text-sm text-gray-200">{item.category}</span>
            )}
          </div>
        </div>
        {item.featured && (
          <span className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-100 mb-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {item.description}
          </p>
        )}
        {item.category && (
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {item.category}
          </span>
        )}
      </div>
    </div>
  )
}

export default GalleryCard
