import React from 'react'
import Intro from '../components/home/intro'
import Hero from '../components/home/Hero'
import Achievements from '../components/home/Achievements'
import FAQ from '../components/home/FAQ'


const Home = () => {
  return (
    <>
      <Intro />
      <Hero />
      <div><Achievements /></div>
      <div><FAQ /></div>
      <div><Footer /></div>

    </>
  )
}

export default Home

