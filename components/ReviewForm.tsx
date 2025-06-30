'use client'

import { useState } from 'react'
import { submitReview } from '@/app/actions/reviews'

interface ReviewFormProps {
  movieId: string
  movieTitle: string
}

export default function ReviewForm({ movieId, movieTitle }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    
    try {
      const result = await submitReview(formData)
      
      if (result.success) {
        // Reset form and hide it
        setShowForm(false)
        // You could also show a success message here
        alert('Thank you for your review! It has been submitted successfully.')
      } else {
        alert(`Error submitting review: ${result.error}`)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!showForm) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-white text-xl font-semibold mb-4">
          Share Your Review
        </h3>
        <p className="text-gray-300 mb-4">
          Have you watched {movieTitle}? Share your thoughts with other viewers!
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Write a Review
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-semibold">
          Write Your Review for {movieTitle}
        </h3>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-400 hover:text-white"
          disabled={isSubmitting}
        >
          ✕
        </button>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="movieId" value={movieId} />
        
        <div>
          <label htmlFor="reviewerName" className="block text-white font-medium mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="reviewerName"
            name="reviewerName"
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-white font-medium mb-2">
            Rating *
          </label>
          <select
            id="rating"
            name="rating"
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
            disabled={isSubmitting}
          >
            <option value="">Select a rating</option>
            <option value="5">5 Stars - Excellent</option>
            <option value="4">4 Stars - Very Good</option>
            <option value="3">3 Stars - Good</option>
            <option value="2">2 Stars - Fair</option>
            <option value="1">1 Star - Poor</option>
          </select>
        </div>

        <div>
          <label htmlFor="reviewTitle" className="block text-white font-medium mb-2">
            Review Title *
          </label>
          <input
            type="text"
            id="reviewTitle"
            name="reviewTitle"
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
            placeholder="Give your review a title"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="reviewText" className="block text-white font-medium mb-2">
            Your Review *
          </label>
          <textarea
            id="reviewText"
            name="reviewText"
            required
            rows={5}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none resize-vertical"
            placeholder="Share your thoughts about this movie..."
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="verifiedPurchase"
            name="verifiedPurchase"
            className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
            disabled={isSubmitting}
          />
          <label htmlFor="verifiedPurchase" className="ml-2 text-gray-300">
            I watched this movie
          </label>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            disabled={isSubmitting}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}