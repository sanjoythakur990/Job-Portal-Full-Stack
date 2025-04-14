import React, { use, useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  useGetAllJobs();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(user && user.role === "recruiter") {
      navigate("/admin/companies")
    }
  },[])
  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
    </div>
  )
}

export default Home