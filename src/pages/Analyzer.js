import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Analyzer = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [longText, setLongText] = useState("");
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const analyzeSentiment = async () => {
    if (!inputText.trim()) return alert("Please enter text or a URL!");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        text: inputText,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      alert("Something went wrong! Please try again.");
    }
    setLoading(false);
  };

  const getSentimentExplanation = () => {
    if (!result) return "";
    if (result.sentiment === "Positive") {
      return "This text has an overall positive tone, meaning it likely expresses happiness, approval, or optimism. 🎉";
    } else if (result.sentiment === "Negative") {
      return "This text has a negative tone, indicating dissatisfaction, criticism, or concern. 😞";
    } else {
      return "This text is neutral, meaning it doesn't lean towards a strongly positive or negative opinion. 🤔";
    }
  };

  const handleLongTextChange = (event) => {
    setLongText(event.target.value);
  };

  const summarizeText = async () => {
    if (!longText.trim()) return alert("Please enter text to summarize!");
    setSummarizing(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/summarize", { text: longText });
      setSummary(response.data.summary);
      setInputText(response.data.summary);
    } catch (error) {
      console.error("Error summarizing text:", error);
      alert("Failed to summarize text!");
    }
    setSummarizing(false);
  };

  return (
    <div style={{ backgroundColor: '#F6ECF5' }} className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Advanced Sentiment Analyzer</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-6">
        Enter a news article URL or paste text below to analyze its sentiment.
        Our AI model will determine whether the content is positive, negative, or neutral and explain why.
      </p>

      <textarea
        className="w-full md:w-2/3 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        rows="5"
        placeholder="Paste news text or enter article URL..."
        value={inputText}
        onChange={handleChange}
      />

      <div className="w-full md:w-2/3 mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Have a Long Article? Paste Here:</h3>
        <textarea
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          rows="6"
          placeholder="Paste a long article or news text..."
          value={longText}
          onChange={handleLongTextChange}
        />
      </div>

      <button
        onClick={summarizeText}
        className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
        disabled={summarizing}
      >
        {summarizing ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="w-full md:w-2/3 mt-6 bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Summarized Text:</h3>
          <p className="text-gray-800">{summary}</p>
        </div>
      )}

      <button
        onClick={analyzeSentiment}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-center w-full md:w-2/3">
          <h3 className="text-2xl font-semibold">
            Sentiment:{" "}
            <span
              className={
                result.sentiment === "Positive"
                  ? "text-green-600"
                  : result.sentiment === "Negative"
                  ? "text-red-600"
                  : "text-gray-600"
              }
            >
              {result.sentiment}{" "}
              {result.sentiment === "Positive" ? "😃" : result.sentiment === "Negative" ? "😡" : "😐"}
            </span>
          </h3>

          <p className="text-lg text-gray-700 mt-2">
            Sentiment Score: {result.score?.toFixed(3)}
          </p>

          <p className="text-md text-gray-600 italic mt-2">{getSentimentExplanation()}</p>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className={`h-full ${
                result.sentiment === "Positive"
                  ? "bg-green-500"
                  : result.sentiment === "Negative"
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
              style={{ width: `${(result.score + 1) * 50}%` }}
            ></div>
          </div>

          {result.positive_words?.length > 0 && (
            <p className="text-green-600 mt-4">
              <strong>Positive Words:</strong> {result.positive_words.join(", ")}
            </p>
          )}
          {result.negative_words?.length > 0 && (
            <p className="text-red-600 mt-2">
              <strong>Negative Words:</strong> {result.negative_words.join(", ")}
            </p>
          )}

          <p className="text-gray-700 mt-4">
            <strong>Analyzed Text:</strong>{" "}
            {inputText.split(" ").map((word, index) => (
              <span
                key={index}
                className={
                  result.positive_words?.includes(word)
                    ? "text-green-600 font-bold"
                    : result.negative_words?.includes(word)
                    ? "text-red-600 font-bold"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      )}

      {result && (
        <button
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={() => navigate("/advanced-analysis", { state: { result } })}
        >
          Advanced Analysis
        </button>
      )}
    </div>
  );
};

export default Analyzer;
