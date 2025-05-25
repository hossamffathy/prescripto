// export default function TopLogo(){
//   return(
//       <div className="m-auto mt-[27px]   flex h-[698px] w-[1528px] overflow-hidden rounded-[12px] bg-[#5F6FFF]">
//     <div className="ml-[93px]  flex items-center">
//       <p className=" l  h-[199px] w-[726px]   font-outfit text-[63px]  font-semibold text-[#FFFFFF]  ">
//         Book Appointment With Trusted Doctors
//       </p>
//     </div>
//     <div className=" mt-auto h-[596px] w-[882px]    ">
//       <img src="home_image.png " className=" mt-auto h-full w-full" alt="" />
//     </div>
//   </div>
//   )
// } 




export default function TopLogo() {
  return (
    <div className="mx-auto mt-10 flex flex-col lg:h-[698px]  lg:flex-row items-center justify-between rounded-xl bg-[#5F6FFF] p-6 lg:p-12 overflow-hidden max-w-[1528px]">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mb-8 lg:mb-0 px-4 lg:px-0">
        <p className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[63px] font-semibold font-outfit text-center lg:text-left leading-snug">
          Book Appointment With Trusted Doctors
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 max-h-[500px] px-4 lg:px-0">
        <img
          src="home_image.png"
          className="w-full h-auto object-contain"
          alt="Home"
        />
      </div>
    </div>
  );
}
