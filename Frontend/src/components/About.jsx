import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ai from "../assets/ai.jpg";
import ml from "../assets/ml.jpg";
import money from "../assets/money.jpg";
function About() {
  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-4">
          {/* AI */}
          <div className="">
            <img
              src={ai}
              alt="AI"
              className="rounded-xl shadow-md object-cover h-50 w-full"
            />
          </div>

          {/* Machine Learning */}
          <div>
            <img
              src={ml}
              alt="AI"
              className="rounded-xl shadow-md object-cover h-50 w-full"
            />
          </div>

          {/* Stock Market */}
          <div>
            <img
              src={money}
              alt="AI"
              className="rounded-xl shadow-md object-cover h-50 w-full"
            />{" "}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5  text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          About Our Blog
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to our Blogify — a space dedicated to curiosity, learning, and
          staying ahead in the digital age. Whether you're passionate about
          artificial intelligence, fascinated by machine learning, or tracking
          the pulse of the stock market, we’re here to bring you simplified,
          insightful content that makes sense.
        </p>
        <p className="text-gray-600">
          Our goal is to make complex topics easy to understand and accessible
          to everyone. No matter your background, you can dive into
          well-researched articles and thought pieces that help you grow in
          knowledge and perspective.
        </p>
      </section>

      <Footer />
    </>
  );
}

export default About;
