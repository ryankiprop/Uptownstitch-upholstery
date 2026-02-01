import { Helmet } from 'react-helmet-async'
import { branding } from '../config/branding'

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  ogImage, 
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  jsonLd = null
}) => {
  const fullTitle = title 
    ? `${title} | ${branding.site.name}`
    : branding.seo.defaultTitle

  const fullDescription = description || branding.seo.defaultDescription
  const fullKeywords = [...keywords, ...branding.seo.keywords].join(', ')
  const fullOgImage = ogImage || branding.seo.ogImage

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl || branding.site.url} />
      <meta property="og:site_name" content={branding.site.name} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional Meta */}
      <meta name="author" content={branding.site.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
