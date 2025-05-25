

import { useLoaderData, useParams } from 'react-router-dom';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import StarRating from "./StarRating"
import ReviewList from"./ReviewList"
export default function DoctorProfilePage() {
  const { doctorProfile, availableDays, reviews } = useLoaderData();
const avgRating = reviews.length
  ? Math.ceil(reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length)
  : 0;
const params=useParams()






  const myId = useSelector((state) => state.user.id);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');



  const [submitMessage, setSubmitMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);


// ro group each  yime on date
  const groupedByDate = availableDays.reduce((acc, slot) => {
    const date = format(parseISO(slot.date), 'yyyy-MM-dd');
    const time = format(parseISO(slot.date), 'HH:mm');

    if (!acc[date]) acc[date] = [];

    acc[date].push({
      time,
      fullISO: slot.date,
      status: slot.status,
      id: slot._id,
    });

    return acc;
  }, {});





  const bookingDays = Object.keys(groupedByDate).map((fullDate) => {
    const date = parseISO(fullDate);
    return {
      day: format(date, 'EEE'),
      date: format(date, 'd'),
      fullDate,
      month: format(date, 'MM'),
    };
  });



  const displayName = doctorProfile.username.startsWith('Dr.')
    ? doctorProfile.username
    : `Dr. ${doctorProfile.username}`;



  const experienceMatch = doctorProfile.bio?.match(/\d+/);
  const years = experienceMatch ? parseInt(experienceMatch[0]) : 'N/A';



  // add review

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) {
      setSubmitMessage('Please fill in both rating and comment.');
      return;
    }


    const review = { rating, comment };

    try {
      const res = await fetch(`/api/v1/reviews/doctor/${doctorProfile._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setSubmitMessage('✅ Review submitted successfully!');
      setRating(0);
      setComment('');
    } catch (err) {
      setSubmitMessage(`❌ ${err.message}`);
    }
  };








const handleBooking = async (params) => {
  try {
    const id = params.id;
    // 1. استرجاع قائمة الـ TimeBlocks
    const res2 = await fetch(`/api/v1/appointments/all/${id}`);
    const appointmentData = await res2.json();
    // 2. إيجاد الـ block المناسب
    const selectedBlock = appointmentData.allAppointments.find(
      (block) => block.date === selectedTimeSlot.fullISO
    );
    
    if (!selectedBlock) {
      console.error("لم يتم العثور على البلوك المطلوب");
      return;
    }
    console.log(selectedBlock ,selectedTimeSlot.fullISO)

    // 3. إرسال طلب إنشاء جلسة Stripe
    const res = await fetch(`/api/v1/bookings/checkoutsession/${selectedBlock._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorId: doctorProfile._id,
        date: selectedTimeSlot.fullISO,
        // يمكنك إضافة userId هنا إذا متاح من Redux
      }),
    });

    const data = await res.json();

    // 4. تحويل المستخدم إلى صفحة الدفع
    if (data.status === "success" && data.session?.url) {
      window.location.href = data.session.url;
    } else {
      console.error("لم يتم إنشاء جلسة الدفع بنجاح");
    }
  } catch (err) {
    console.error("خطأ أثناء الحجز", err);
  }
};












  // const handleBooking = async () => {
  //   if (!selectedTimeSlot || !selectedDate) return alert("Select a time slot first.");

    // const payload = {
    //   doctorId: doctorProfile._id,
    //   date: selectedTimeSlot.fullISO,
    //   timeSlot: selectedTimeSlot.id,
    // };


  //   try {
  //     const res = await fetch('/api/v1/appointments/book', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Failed to book.");

  //     alert("✅ Appointment booked successfully!");
  //   } catch (err) {
  //     alert(`❌ ${err.message}`);
  //   }
  // };

  return (
    <div className="mx-auto my-8 max-w-[1200px] rounded-lg bg-white p-6 shadow-lg">
      {/* Doctor Info */}
      <div className="flex gap-8">
        <div className="flex h-56 w-48 items-center justify-center overflow-hidden rounded-lg bg-indigo-600">
          <img
            src={doctorProfile.profilePicture}
            alt={doctorProfile.username}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="flex items-center gap-2 text-3xl font-semibold capitalize">
            {displayName}
            <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">✔</span>
          </h1>
          <p className="mt-1 font-medium text-gray-500">
            {doctorProfile.specialization}
            <span className="ml-3 rounded bg-gray-200 px-2 py-0.5 text-xs font-normal">
              {years} Years
            </span>
          </p>
          <div className="mt-4 max-w-xl text-sm leading-relaxed text-gray-700">
            <p>{doctorProfile.summery}</p>
          </div>
          <StarRating avgRating={avgRating} />
          <p className="mt-5 font-semibold">Appointment fee: ${doctorProfile.fees}</p>
        </div>
      </div>

      {/* Booking Days */}
      <div className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Available Booking Days</h2>
        <div className="mb-6 flex flex-wrap gap-3">
          {bookingDays.map(({ day, date, fullDate, month }, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedDate(fullDate);
                setSelectedTimeSlot(null);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
                selectedDate === fullDate ? 'bg-indigo-700' : 'bg-indigo-600'
              }`}
            >
              <div>{day}</div>
              <div className="font-bold">{`${date}/${month}`}</div>
            </button>
          ))}
        </div>

        {selectedDate && (
          <div className="flex max-w-lg flex-wrap gap-3">
            {groupedByDate[selectedDate].map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTimeSlot(slot)}
                disabled={slot.status !== 'available'}
                className={`
                  rounded-full px-3 py-1 text-xs transition
                  ${slot.status !== 'available'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : selectedTimeSlot?.id === slot.id
                      ? 'bg-indigo-800 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'}
                `}
              >
                {format(parseISO(`${selectedDate}T${slot.time}`), 'h:mm a')}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={()=>handleBooking(params)}
          disabled={!selectedTimeSlot}
          className={`mt-6 rounded-full px-6 py-3 transition 
            ${selectedTimeSlot ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-400 text-white cursor-not-allowed'}`}
        >
          Book an appointment
        </button>
      </div>


      {/* Review Section */}
      <div className="mt-12 border-t pt-8 grid md:grid-cols-2 gap-8">
        {/* Add Review */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-indigo-700">Add Your Review</h2>
          <form onSubmit={()=>handleReviewSubmit()} className="space-y-4 max-w-xl">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl transition ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:scale-110`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Write your comment..."
              required
            ></textarea>

            <button
              type="submit"
              className="rounded-full bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 transition"
            >
              Submit Review
            </button>

            {submitMessage && (
              <div
                className={`rounded-lg border p-3 text-sm ${
                  submitMessage.startsWith('✅')
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}
              >
                <span>{submitMessage.replace('✅', '').replace('❌', '')}</span>
              </div>
            )}
          </form>
        </div>




        {/* Display Reviews */}
   <ReviewList reviews={reviews}/>
      </div>
    </div>
  );
}
export async function getSpecificDoctor({ params }) {
  const id = params.id;

  const res1 = await fetch(`/api/v1/doctors/${id}`);
  const doctorProfile = await res1.json();

  const res2 = await fetch(`/api/v1/appointments/all/${id}`);
  const availableDays = await res2.json();

  const res3 = await fetch(`/api/v1/reviews/doctor/${id}`);
  const reviewsRes = await res3.json();
  const reviews = reviewsRes.data?.reviews || [];

  if (!res1.ok) throw new Error(doctorProfile.message || 'Failed to load doctor');

  return {
    doctorProfile: doctorProfile.doctor,
    availableDays: availableDays.allAppointments,
    reviews,
  };
}


