export default function DoctorItem({ username, profilePicture, specialization }) {
  return (
    <div className="m-auto h-[470px] w-[280px] overflow-hidden rounded-2xl border border-[#C9D8FF] bg-white shadow-md hover:shadow-xl transition duration-300">
      <div className="h-[350px] w-full bg-[#EAEFFF] flex items-center justify-center overflow-hidden">
        <img src={profilePicture} alt={username} className="object-cover w-full h-full rounded-t-2xl" />
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center mb-2">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm font-medium text-green-600">Available</span>
        </div>

        <h3 className="text-xl font-semibold capitalize text-gray-800">
          {username.toLowerCase().startsWith('dr-') ? username : `Dr-${username}`}
        </h3>

        <p className="text-sm text-gray-600 mt-1">{specialization}</p>
      </div>
    </div>
  );
}