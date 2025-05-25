import { useState } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function ReviewList({ reviews }) {
  //to edit review
  console.log(reviews);
  const myId = useSelector(
    (state) => state.user.id || state.admin.id || state.doctor.id
  );

  const [editingReviewId, setEditingReviewId] = useState(null);
  // state لتخزين التعديلات المؤقتة
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const handleEditReview = (id, currentRating, currentComment) => {
    setEditingReviewId(id);
    setEditRating(currentRating);
    setEditComment(currentComment);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  const handleSaveEdit = async (id) => {
    // تحقق من صحة البيانات هنا لو حبيت
    try {
      const res = await fetch(`${BASE_URL}/api/v1/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: editRating,
          comment: editComment,
        }),
      });
      if (!res.ok) throw new Error('Failed to update review');

      // تحديث الواجهة، الأفضل تجديد البيانات بعد التحديث من API أو تحديث الـ state محلياً
      alert('Review updated successfully');
      setEditingReviewId(null);
      // هنا تستدعي دالة لإعادة جلب البيانات لو متوفرة (مثلاً fetchReviews())
    } catch (error) {
      console.error(error);
      alert('Error updating review');
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`/api/v1/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      alert('Review deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting review:', error.message);
      alert('Failed to delete review');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-indigo-700">
        What Patients Say
      </h2>
      <div className="h-[400px] space-y-4 overflow-y-auto pr-2">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold capitalize text-gray-800">
                  {rev.patient?.name || 'Unknown Patient'}
                </h3>

                <span className="text-sm text-yellow-400">
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </span>
              </div>

              {/* فورم التعديل تظهر فقط لو هذا الـ review قيد التعديل */}
              {editingReviewId === rev._id ? (
                <>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Rating:
                    </label>
                    <select
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                      className="mt-1 rounded border p-1"
                    >
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Comment:
                    </label>
                    <textarea
                      rows={3}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="mt-1 w-full rounded border p-2"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSaveEdit(rev._id)}
                      className="rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="rounded bg-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-700">{rev.comment}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    {format(parseISO(rev.createdAt), 'MMM d, yyyy')}
                  </p>

                  {myId === rev.patient?._id && (
                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={() =>
                          handleEditReview(rev._id, rev.rating, rev.comment)
                        }
                        className="rounded bg-indigo-600 px-3 py-1 text-sm text-white transition hover:bg-indigo-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteReview(rev._id)}
                        className="rounded bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
