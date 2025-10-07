import React from 'react'
import Navbar from '../components/home/navbar'
import Intro from '../components/home/intro'
import Footer from '../components/home/Footer'
import Hero from '../components/home/Hero'


const Home = () => {
  return (
    <>
      <div><Navbar /></div>
      <div><Intro /></div>
      <Hero />
      <div><Footer /></div>

    </>
  )
}

export default Home