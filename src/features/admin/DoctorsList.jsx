




import { useLoaderData } from "react-router-dom";
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React, { useState } from "react";
import { CalendarCheck, UserCircle } from "lucide-react";
import {Link} from "react-router-dom"
import DoctorItem from "../home/DoctorItem";
export default function DoctorsList(){
    const allDoctors  = useLoaderData();
    
 
 
    
  
    return (
    
  <div className="w-full flex justify-center">


          <div className=" m-auto my-[53px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-[1468px]">
              {allDoctors.map((doctor) => (
                <Link 
                  key={doctor._id} 
                  to={`/profile/${doctor._id}`} 
                  className="block"
                >
                  <DoctorItem
                    specialization={doctor.specialization} 
                    profilePicture={doctor.profilePicture} 
                    username={doctor.username} 
                  />
                </Link>
              ))}
            </div>
  </div>

        
    );
  }
  export async function doctorsList() {
    const res = await fetch(`${BASE_URL}/api/v1/doctors`);
    const data = await res.json();
  
   
    return   data.allDoctors     
    }