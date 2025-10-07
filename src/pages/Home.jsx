import React from "react";
import Intro from "../components/home/intro";
import Hero from "../components/home/Hero";
import RecentCourses from "../components/home/RecentCourses";
import Achievements from "../components/home/Achievements";
import FAQ from "../components/home/FAQ";

const Home = () => {
  return (
    <>
      <Intro />
      <RecentCourses />
      <Hero />
      <div>
        <Achievements />
      </div>
      <div>
        <FAQ />
      </div>
    </>
  );
};

export default Home;
