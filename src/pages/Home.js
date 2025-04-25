import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Ensure this logo exists inside src/assets folder
import step1Image from '../assets/step1-icon (2).png'; // Importing the image
import step2Image from '../assets/step2-icon (2).png'; // Importing the image
import step3Image from '../assets/step3-icon (2).png'; // Importing the image
import sentimentanalysis from '../assets/sentiment-analysis (2).jpg';
import '../App.css'; // Import Tailwind styles

// Step Component
const Step = ({ image, title, description }) => (
  <div className="relative w-full bg-pink-200 rounded-xl overflow-hidden shadow-lg">
    <img
      src={image}
      alt={title}
      className="w-full h-96 object-cover"
      loading="lazy" // Lazy load images for better performance
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-pink-900 to-transparent p-6">
      <p className="text-white text-xl font-medium">{title}</p>
      <p className="text-white">{description}</p>
    </div>
  </div>
);

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Steps array
  const steps = [
    {
      image: step1Image,
      title: "Step 1",
      description:
        "Paste the news article URL or text into the input field to begin analyzing the sentiment.",
    },
    {
      image: step2Image,
      title: "Step 2",
      description:
        'Click "Analyze" to process the article and get insights on whether it\'s positive, negative, or neutral.',
    },
    {
      image: step3Image,
      title: "Step 3",
      description:
        "View your sentiment results instantly and share or save them for future reference.",
    },
  ];

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % steps.length);
  };

  // Handle previous step
  const handlePrevious = () => {
    setActiveStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
  };

  return (
    <div style={{ backgroundColor: '#F6ECF5' }} className="min-h-screen flex flex-col text-gray-900">
      {/* Main Content */}
      
      <section className="flex flex-col items-center text-center p-10">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">Analyze News Sentiment in Seconds!</h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-10">
          Our AI-powered sentiment analysis tool helps you determine whether a news article is positive, negative, or neutral. 
          Simply paste the article and get instant insights!
        </p>

{/* Sentiment Analysis Explanation */}
<section className="flex flex-col items-center text-center mb-16 px-4">
  <h3 className="text-3xl font-semibold text-blue-600 mb-4">What is Sentiment Analysis?</h3>
  <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12 w-full">
    {/* Text Section */}
    <div className="flex-1 text-left">
      <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
        Sentiment analysis is the use of natural language processing (NLP) to determine whether a piece of writing is 
        positive, negative, or neutral. This analysis is based on the content, tone, and context of the text, which allows 
        businesses and individuals to understand the sentiment behind reviews, articles, and more. A basic task in sentiment analysis is classifying the polarity of a given text at the document, sentence, or feature/aspect level—whether the expressed opinion in a document, a sentence, or an entity feature/aspect is positive, negative, or neutral. Advanced, "beyond polarity" sentiment classification looks, for instance, at emotional states such as enjoyment, anger, disgust, sadness, fear, and surprise.
      </p>
    </div>

    {/* Image Section */}
    <div className="flex-1">
      <img
        src={sentimentanalysis}
        alt="Sentiment Analysis"
        className="w-full h-80 object-cover rounded-lg shadow-lg"
        loading="lazy"
      />
    </div>
  </div>
</section>

     {/* Steps Section */}
<section className="mt-12 flex flex-col md:flex-row items-center space-x-10">
  {/* Left: Images & Arrows in a flexbox */}
  <div className="flex flex-row items-center justify-center space-x-6 w-1/2">
    {/* Left Arrow */}
    <div className="cursor-pointer" onClick={handlePrevious}>
      <svg
        className="w-10 h-10 text-pink-600 transition-transform transform hover:scale-125"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </div>

    {/* Step Image & Description */}
    <Step
      image={steps[activeStep].image}
      title={steps[activeStep].title}
      description={steps[activeStep].description}
    />

    {/* Right Arrow */}
    <div className="cursor-pointer" onClick={handleNext}>
      <svg
        className="w-10 h-10 text-pink-600 transition-transform transform hover:scale-125"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </div>
  </div>


  {/* Right: Additional Sentiment Analysis Content */}
  <div className="flex-1 text-left p-6 bg-gray-100 rounded-lg shadow-lg">
    <h3 className="text-3xl font-semibold text-blue-600">Why News Sentiment Analysis Matters?</h3>
    <p className="text-lg text-gray-700 mt-4">
      News sentiment analysis helps individuals and organizations gauge the tone of articles, 
      enabling them to make informed decisions. By detecting sentiment—positive, negative, or neutral—
      it assists in understanding media biases, market trends, and public opinion.
    </p>
    <p className="text-lg text-gray-700 mt-4">
      Whether you're a journalist, researcher, or investor, knowing the sentiment behind news 
      articles can provide valuable insights into the overall public perception and its potential 
      impact on various industries.
    </p>
  </div>
</section>

        {/* About Us Section */}
        <section style={{backgroundColor:'#BFF4FF'}} className="mt-16 text-gray py-12 px-6 rounded-xl">
          <h3 className="text-3xl font-semibold">About Us</h3>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            We are a passionate team dedicated to using artificial intelligence to empower people to analyze news articles and 
            determine their sentiment quickly. Our tool leverages the power of Natural Language Processing (NLP) to provide 
            instant results. We aim to create a seamless and user-friendly experience for our users.
          </p>
        </section>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-lg font-semibold mb-2">Privacy & Terms</h3>
          <p className="text-sm text-gray-300">
            Your data privacy is our priority. Our sentiment analysis tool ensures safe and secure processing of your data.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/privacy-policy" className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;