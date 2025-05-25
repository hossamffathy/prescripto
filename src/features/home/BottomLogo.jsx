import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function BottomLogo() {
  const isLoggedIn=useSelector((state)=>state.user.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <div className="relative mx-auto mt-10 flex flex-col items-center justify-center overflow-hidden rounded-[12px] bg-[#5F6FFF] px-4 py-10 lg:mt-[151px] lg:h-[455px] lg:w-[1430px] lg:flex-row lg:justify-center lg:overflow-visible lg:px-0 lg:py-0">
      {/* Text section */}
      <div className="mb-8 flex flex-col items-center text-center lg:mb-0 lg:items-start lg:text-left">
        <h3 className="text-[32px] font-bold leading-[48px] text-white sm:text-[40px] md:text-[44px] lg:h-[180px] lg:w-[636px] lg:text-[52px] lg:leading-[90px]">
          Book Appointment <br /> With 100+ Trusted Doctors
        </h3>

        {!isLoggedIn ?  <Link
          to="/signup"
          className="mt-6 flex h-[50px] w-[180px] items-center justify-center rounded-[50px] bg-white text-[16px] font-medium text-[#5F6FFF] hover:bg-gray-100 sm:h-[60px] sm:w-[214px] sm:text-[18px]"
        >
          Create account
        </Link> :   <Link
          to="/doctors"
          className="mt-6 flex h-[50px] w-[180px] items-center justify-center rounded-[50px] bg-white text-[16px] font-medium text-[#5F6FFF] hover:bg-gray-100 sm:h-[60px] sm:w-[214px] sm:text-[18px]"
        >
          Book Appointment
        </Link>}
      
      </div>

      {/* Image section */}
      <div className="relative mt-6 w-[300px] sm:w-[380px] md:w-[460px] lg:-mt-[74px] lg:h-[529px] lg:w-[580px]">
        <img
          src="woman.png"
          alt="Doctor illustration"
          className="w-full h-auto lg:h-[529px] lg:w-[580px]"
        />
      </div>
    </div>
  );
}
