import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Star, Pencil, Trash } from "lucide-react";

export default function MyReviews() {
  const initialReviews = useLoaderData();
  const [reviews, setReviews] = useState(initialReviews);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedRating, setEditedRating] = useState(5);
  const [editedComment, setEditedComment] = useState("");

  const handlePaginationChange = () => {
    navigate(`/patient/reviews?page=${page}&limit=${limit}`);
  };

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    console.log(review._id)
    console.log(localStorage.getItem("user"))
    setEditedRating(review.rating);
    setEditedComment(review.comment);
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`/api/v1/reviews/${id}`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: editedRating,
          comment: editedComment
        })
      });

      if (!res.ok) {
        const data = await res.json();
        alert(`Error: ${data.message || "Failed to update review"}`);
        return;
      }

      const updatedReview = await res.json();
      setReviews(prev => prev.map(r => r._id === id ? updatedReview.review : r));
      setEditingReviewId(null);
    } catch (err) {
      alert("Server error while updating the review");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/v1/reviews/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const data = await res.json();
        alert(`Error: ${data.message || "Failed to delete"}`);
        return;
      }

      alert("Review deleted successfully");
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert("Server error while deleting the review");
      console.error(err);
    }
  };

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        📝 My Doctor Reviews
      </h2>

      {/* Pagination Controls */}
      <div className="mb-8 flex flex-wrap gap-4 items-center justify-center">
        <div>
          <label className="text-sm font-medium text-gray-700">Limit:</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="ml-2 border px-3 py-1.5 rounded-md shadow-sm focus:ring-blue-300 w-24"
            min={1}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Page:</label>
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            className="ml-2 border px-3 py-1.5 rounded-md shadow-sm focus:ring-blue-300 w-24"
            min={1}
          />
        </div>
        <button
          onClick={handlePaginationChange}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Load
        </button>
      </div>

      {/* Review Cards */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-600">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  👨‍⚕️ {review.doctor.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {review.doctor.specialization}
                </p>

                {editingReviewId === review._id ? (
                  <div>
                    <label className="block text-sm mb-1">Rating</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={editedRating}
                      onChange={(e) => setEditedRating(Number(e.target.value))}
                      className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <label className="block text-sm mb-1">Comment</label>
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(review._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center text-yellow-500 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}
                      <span className="ml-2 text-gray-700">{review.rating}/5</span>
                    </div>

                    <p className="text-gray-600 italic mb-2">"{review.comment}"</p>
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>

              {editingReviewId !== review._id && (
                <div className="mt-4 flex justify-between gap-3">
                  <button
                    onClick={() => handleEdit(review)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm px-3 py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-100"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm px-3 py-2 border border-red-500 text-red-600 rounded hover:bg-red-100"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export async function patientReviewsLoader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const limit = url.searchParams.get("limit") || 10;

  try {
    const res = await fetch(`/api/v1/reviews/patient/reviews?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Response(`Failed to fetch reviews: ${res.status} ${errorText}`, {
        status: res.status,
        statusText: res.statusText,
      });
    }

    const data = await res.json();
    return data.data.reviews;
  } catch (error) {
    throw new Response("Something went wrong while loading reviews", {
      status: 500,
      statusText: "Server Error",
    });
  }
}
