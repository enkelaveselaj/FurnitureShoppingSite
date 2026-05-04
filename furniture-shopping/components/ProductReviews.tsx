'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/reviews/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError("");
      setShowAuthAlert(false);
      
      const isEditing = editingReview !== null;
      const url = isEditing ? `/api/reviews/${productId}` : `/api/reviews/${productId}`;
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? {
        reviewId: editingReview._id,
        name: session?.user?.name || 'Anonymous',
        rating: newReview.rating,
        comment: newReview.comment,
      } : {
        name: session?.user?.name || 'Anonymous',
        rating: newReview.rating,
        comment: newReview.comment,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (isEditing) {
          setReviews(reviews.map(r => r._id === editingReview._id ? data.review : r));
        } else {
          setReviews([data.review, ...reviews]);
        }
        
        setNewReview({ rating: 5, comment: '' });
        setEditingReview(null);
        setShowReviewForm(false);
      } else {
        const errorData = await response.json();
        
        // Handle authentication errors specifically
        if (response.status === 401) {
          setShowAuthAlert(true);
          setError("");
        } else {
          setError(errorData.error || "Failed to save review");
        }
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setError(error.message || "Failed to submit review");
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setNewReview({
      rating: review.rating,
      comment: review.comment
    });
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      setError("");
      setShowAuthAlert(false);
      
      const response = await fetch(`/api/reviews/${productId}?reviewId=${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter(r => r._id !== reviewId));
      } else {
        const errorData = await response.json();
        
        // Handle authentication errors specifically
        if (response.status === 401) {
          setShowAuthAlert(true);
          setError("");
        } else {
          setError(errorData.error || "Failed to delete review");
        }
      }
    } catch (error: any) {
      console.error('Error deleting review:', error);
      setError(error.message || "Failed to delete review");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        {/* Authentication Alert */}
        {showAuthAlert && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Authentication Required
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>You need to be logged in to {editingReview ? 'edit' : 'submit'} reviews.</p>
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={handleLoginRedirect}
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-1 px-3 rounded text-sm transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setShowAuthAlert(false)}
                      className="text-yellow-700 hover:text-yellow-800 font-medium py-1 px-3 rounded text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
                <button
                  onClick={() => setError("")}
                  className="mt-2 text-red-700 hover:text-red-800 text-sm underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="flex items-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mt-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-sm text-gray-600 mt-1">{reviews.length} reviews</div>
            </div>
            
            <div className="flex-1">
              {Array.from({ length: 5 }, (_, i) => {
                const count = reviews.filter(r => r.rating === 5 - i).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={i} className="flex items-center space-x-2 mb-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{5 - i}</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Star className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 font-medium">No reviews yet</p>
            <p className="text-gray-500 text-sm mt-1">Be the first to review this product!</p>
          </div>
        )}

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
        >
          Write a Review
        </button>
      </div>

      {showReviewForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {editingReview ? 'Edit Your Review' : 'Write Your Review'}
          </h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex space-x-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < newReview.rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                required
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="Share your experience with this product..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                {editingReview ? 'Update Review' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReviewForm(false);
                  setEditingReview(null);
                  setNewReview({ rating: 5, comment: '' });
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
