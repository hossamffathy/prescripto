export default function StarRating  ({ avgRating ,className}) {
  const fullStars = Math.min(avgRating, 5); // الحد الأقصى 5 نجوم
  return (
    <div className={`flex space-x-1 text-yellow-400 text-xl  ${className}`}>
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < fullStars ? '★' : '☆'}</span>
      ))}
    </div>
  );
};
