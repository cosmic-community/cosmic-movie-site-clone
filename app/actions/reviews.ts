'use server'

import { cosmic } from '@/lib/cosmic'
import { revalidatePath } from 'next/cache'

interface SubmitReviewResult {
  success: boolean
  error?: string
  reviewId?: string
}

export async function submitReview(formData: FormData): Promise<SubmitReviewResult> {
  try {
    // Extract form data
    const movieId = formData.get('movieId') as string
    const reviewerName = formData.get('reviewerName') as string
    const rating = formData.get('rating') as string
    const reviewTitle = formData.get('reviewTitle') as string
    const reviewText = formData.get('reviewText') as string
    const verifiedPurchase = formData.get('verifiedPurchase') === 'on'

    // Validate required fields
    if (!movieId || !reviewerName || !rating || !reviewTitle || !reviewText) {
      return {
        success: false,
        error: 'All required fields must be filled out'
      }
    }

    // Validate rating value
    if (!['1', '2', '3', '4', '5'].includes(rating)) {
      return {
        success: false,
        error: 'Invalid rating value'
      }
    }

    // Create the review title slug
    const slug = reviewTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Prepare metadata based on the Cosmic schema
    const metadata = {
      reviewer_name: reviewerName.trim(),
      rating: {
        key: rating,
        value: `${rating} Star${rating !== '1' ? 's' : ''}`
      },
      review_text: reviewText.trim(),
      movie: movieId,
      verified_purchase: verifiedPurchase
    }

    // Create the review object in Cosmic
    const response = await cosmic.objects.insertOne({
      title: reviewTitle.trim(),
      slug: slug,
      type: 'reviews',
      status: 'published',
      metadata: metadata
    })

    // Revalidate the movie page to show the new review
    revalidatePath('/movies/[slug]', 'page')

    return {
      success: true,
      reviewId: response.object.id
    }

  } catch (error) {
    console.error('Error submitting review:', error)
    
    // Return a user-friendly error message
    return {
      success: false,
      error: 'Failed to submit review. Please try again later.'
    }
  }
}