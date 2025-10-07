import React from 'react'
import Navbar from '../components/home/navbar'
import Intro from '../components/home/intro'
import Footer from '../components/home/Footer'
import Hero from '../components/home/Hero'
import Achievements from '../components/home/Achievements'
import FAQ from '../components/home/FAQ'


const Home = () => {
  return (
    <>
      <div><Navbar /></div>
      <div><Intro /></div>
      <Hero />
      <div><Achievements /></div>
      <div><FAQ /></div>
      <div><Footer /></div>

    </>
  )
}

export default Home

