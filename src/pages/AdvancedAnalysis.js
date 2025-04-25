import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const AdvancedAnalysis = () => {
  const location = useLocation();
  const result = location.state?.result;

  useEffect(() => {
    if (!result) return; // Only run when result exists

    fetch("http://localhost:5000/save-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: result.text,
        overall_sentiment: result.overall_sentiment,
        score: result.score,
        key_phrases: result.key_phrases,
        summary: result.summary || "",
      }),
    });
  }, [result]);

  if (!result) {
    return (
      <div className="text-center text-red-500 font-semibold text-xl">
        No sentiment data found. Please analyze text first.
      </div>
    );
  }

  const pieData = {
    labels: ["Very Positive", "Positive", "Neutral", "Negative", "Very Negative"],
    datasets: [
      {
        data: [
          result.raw_label === "5 stars" ? result.score * 100 : 0,
          result.raw_label === "4 stars" ? result.score * 100 : 0,
          result.raw_label === "3 stars" ? result.score * 100 : 0,
          result.raw_label === "2 stars" ? result.score * 100 : 0,
          result.raw_label === "1 star" ? result.score * 100 : 0,
        ],
        backgroundColor: ["#a5d6a7", "#c8e6c9", "#f0f0f0", "#ffccbc", "#ef9a9a"],
      },
    ],
  };

  const barData = {
    labels: result.sentence_analysis.map((s) => s.sentence),
    datasets: [
      {
        label: "Sentiment Score",
        data: result.sentence_analysis.map((s) => s.score * 100),
        backgroundColor: result.sentence_analysis.map((s) =>
          s.sentiment.includes("Positive")
            ? "#a5d6a7"
            : s.sentiment.includes("Negative")
            ? "#ffccbc"
            : "#f0f0f0"
        ),
      },
    ],
  };

  return (
    <div style={{ backgroundColor: "#F6ECF5" }} className="min-h-screen flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Advanced Sentiment Analysis</h1>

      <div className="bg-pastel-lightpurple p-8 rounded-lg shadow-xl text-center w-full md:w-2/3 mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Overall Sentiment:{" "}
          <span
            className={
              result.overall_sentiment === "Very Positive"
                ? "text-green-600"
                : result.overall_sentiment === "Positive"
                ? "text-lime-600"
                : result.overall_sentiment === "Neutral"
                ? "text-gray-600"
                : result.overall_sentiment === "Negative"
                ? "text-red-600"
                : "text-red-800"
            }
          >
            {result.overall_sentiment}
          </span>
        </h3>
        <p className="text-lg text-gray-700">Sentiment Score: {result.score.toFixed(3)}</p>
      </div>

      <div className="bg-pastel-lightorange p-8 rounded-lg shadow-xl text-center w-full md:w-2/3 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Phrases</h3>
        <p className="text-md text-gray-600">{result.key_phrases.join(", ")}</p>
      </div>

      <div className="bg-pastel-lightyellow p-8 rounded-lg shadow-xl w-full md:w-2/3 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Sentence Breakdown</h3>
        {result.sentence_analysis.map((s, i) => (
          <p key={i} className="text-md text-gray-600 mb-2">
            <strong>{s.sentence}</strong> →{" "}
            <span className="font-bold">{s.sentiment}</span> ({s.score})
          </p>
        ))}
      </div>

      <div className="bg-white w-full md:w-1/3 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Sentiment Distribution</h3>
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <Pie data={pieData} />
        </div>
      </div>

      <div className="bg-white w-full md:w-2/3 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Sentence Sentiment Breakdown</h3>
        <div className="p-6 rounded-lg shadow-xl">
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalysis;
