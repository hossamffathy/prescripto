import Title from './Title';
import TopLogo from './TopLogo';
import Items from './Items';
import DoctorItems from './DoctorItems';
import BottomLogo from './BottomLogo';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ FIXED

 

  return (
    <>
      <TopLogo />
      <Title
        header="Find by Speciality"
        paragraph="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free."
      />
      <Items />
      <Title
        header="Top Doctors to Book"
        paragraph="Simply browse through our extensive list of trusted doctors."
      />
      <DoctorItems />
      
      <BottomLogo />
      <Footer />
    </>
  );
}
