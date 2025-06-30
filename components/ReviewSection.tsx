import { Review } from '@/types'
import ReviewForm from './ReviewForm'

interface ReviewSectionProps {
  reviews: Review[]
  movieTitle: string
  movieId: string
}

export default function ReviewSection({ reviews, movieTitle, movieId }: ReviewSectionProps) {
  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h2>
        
        {/* Review Form */}
        <ReviewForm movieId={movieId} movieTitle={movieTitle} />
        
        {/* Existing Reviews */}
        {reviews.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400 text-lg">
              No reviews yet for {movieTitle}. Be the first to write a review!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface ReviewCardProps {
  review: Review
}

function ReviewCard({ review }: ReviewCardProps) {
  const ratingKey = review.metadata?.rating?.key
  const ratingNumber = ratingKey ? parseInt(ratingKey) : 0
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous'
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {reviewerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="text-white font-semibold">{reviewerName}</h4>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < ratingNumber ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                {review.metadata?.rating?.value || 'Not rated'}
              </span>
              {review.metadata?.verified_purchase && (
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-white font-semibold mb-2">{review.title}</h3>
      <p className="text-gray-300 leading-relaxed">{review.metadata?.review_text || 'No review text available.'}</p>
    </div>
  )
}