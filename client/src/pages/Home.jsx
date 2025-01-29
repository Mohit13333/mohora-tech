import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="min-h-screen bg-gray-100 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Innovative Solutions for Modern Challenges
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Transforming ideas into reality with cutting-edge technology.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Learn More
        </button>
      </section>
    </>
  );
};

export default Home;
