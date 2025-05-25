import { CheckCircle2, Loader2, Trash2, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [limit] = useState(6);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/reviews/all/reviews?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setReviews(data.data.reviews || []);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    setLoadingId(reviewId);
    try {
      const res = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');

      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      alert('Error deleting review');
      console.error(err);
    } finally {
      setLoadingId('');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-indigo-50 p-6 pt-0 sm:p-10">
      <h2 className="m-auto  mb-6 w-full p-4  text-center text-4xl font-bold text-blue-700 shadow-md">
        Patient <span className="text-gray-900">Reviews</span>
      </h2>

      {loading ? (
        <div className="animate-pulse text-center font-semibold text-blue-600">
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center italic text-gray-600">
          No reviews found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
              >
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-indigo-100 p-2 text-indigo-600">
                      <Star className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {review.doctor.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ({review.doctor.specialization})
                      </p>
                    </div>
                  </div>

                  <p className="mb-2 text-sm text-gray-700">
                    🧑‍💼 <span className="font-medium">Patient:</span>{' '}
                    {review.patient?.name || 'Unknown'}
                  </p>

                  <p className="mb-3 flex items-center font-semibold text-yellow-500">
                    {'⭐'.repeat(review.rating)}{' '}
                    <span className="ml-2 text-sm text-gray-500">
                      ({review.rating}/5)
                    </span>
                  </p>

                  <p className="mb-4 italic text-gray-600">
                    "{review.comment}"
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleDelete(review._id)}
                    disabled={loadingId === review._id}
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition duration-200 ${
                      loadingId === review._id
                        ? 'cursor-not-allowed bg-red-200 text-red-600'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {loadingId === review._id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Deleting
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-10 flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 disabled:opacity-50"
              disabled={page === 1}
            >
              ⬅ Prev
            </button>
            <span className="font-semibold text-indigo-700">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
