import { useState } from 'react'
import SEO from '../components/SEO'
import { contactAPI } from '../services/api'
import { branding } from '../config/branding'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({
    type: '', // 'success' or 'error'
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: '', message: '' })

    try {
      const response = await contactAPI.submit(formData)
      setSubmitStatus({
        type: 'success',
        message: `Thank you for your message, ${formData.name}! We will get back to you within 24 hours at ${formData.email}.`
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or call us directly at ' + branding.contact.phone + '.'
      })
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact " + branding.site.name,
    "description": "Get in touch with " + branding.site.name + " for professional upholstery services.",
    "url": `${branding.site.url}/contact`,
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": branding.site.name,
      "telephone": branding.contact.phone,
      "email": branding.contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": branding.contact.address,
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "12345"
      }
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description={`Contact ${branding.site.name} for professional custom upholstery services. ${branding.site.description} Call us at ${branding.contact.phone} or visit our workshop.`}
        keywords={['contact', 'upholstery services', 'quote', 'consultation', 'auto upholstery', 'furniture restoration']}
        canonicalUrl={`${branding.site.url}/contact`}
        jsonLd={structuredData}
      />
      
      <div className="min-h-screen py-8">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Have a project in mind or need expert advice? Get in touch with our team of upholstery specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-8 h-full">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Phone</h3>
                      <p className="text-gray-200">{branding.contact.phone}</p>
                      <p className="text-sm text-gray-400">Mon-Fri: {branding.contact.hours.weekdays}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email</h3>
                      <p className="text-gray-200">{branding.contact.email}</p>
                      <p className="text-sm text-gray-400">24/7 Support</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Location</h3>
                      <p className="text-gray-200">{branding.contact.address}</p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm text-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">{branding.contact.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">{branding.contact.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">{branding.contact.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-panel p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Send Us a Message
                </h2>

                {submitStatus.message && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-emerald-400/15 text-emerald-100 border border-emerald-300/40'
                      : 'bg-red-400/20 text-red-100 border border-red-300/40'
                  }`} role="alert">
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Your full name"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="your@email.com"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="How can we help you?"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-field"
                      placeholder="Tell us about your project or ask any questions..."
                      aria-required="true"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary bg-primary-500/90 hover:bg-primary-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    aria-describedby={submitStatus.message ? 'form-status' : undefined}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                  We respect your privacy and will never share your information. Responses typically within 24 hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
