export default function Title({header,paragraph}){
    return <div>
    <h2 className="mt-[119px] m-auto w-fit h-[50px] text-[#1F2937] text-[40px] font-outfit "> {header}</h2>
   
   <p className="m-auto mt-[4px] w-[573px] h-[85px] font-outfit font-normal text-[18px] leading-[27px] text-center flex items-center justify-center ">
   {paragraph}

</p>

    </div>
}