import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get-history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.reverse());
      })
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  const handleDelete = async (timestamp) => {
    try {
      const res = await fetch("http://localhost:5000/delete-entry", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp }),
      });

      const result = await res.json();
      if (res.ok) {
        setHistory((prev) =>
          prev.filter((entry) => entry.timestamp !== timestamp)
        );
      } else {
        console.error(result.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-10 bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        📜 Analysis History
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No analysis history found.
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {history.map((entry, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-lg p-6 border-l-8 relative transition-all duration-300 text-lg ${
                entry.overall_sentiment.includes("Positive")
                  ? "bg-green-50 border-green-400"
                  : entry.overall_sentiment.includes("Negative")
                  ? "bg-red-50 border-red-400"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <button
                onClick={() => handleDelete(entry.timestamp)}
                className="absolute top-4 right-4 text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
              >
                Delete
              </button>

              <p className="text-sm text-gray-400 mb-4">
                #{history.length - index}
              </p>

              <div className="space-y-3">
                <div className="flex gap-x-4">
                  <span className="min-w-28 text-purple-700 font-semibold">
                    Text:
                  </span>
                  <span className="text-black">{entry.text}</span>
                </div>

                <div className="flex gap-x-4">
                  <span className="min-w-28 text-purple-700 font-semibold">
                    Phrases:
                  </span>
                  <span className="text-black">
                    {entry.key_phrases && entry.key_phrases.length > 0
                      ? entry.key_phrases.join(", ")
                      : "None"}
                  </span>
                </div>

                <div className="flex gap-x-4">
                  <span className="min-w-28 text-purple-700 font-semibold">
                    Sentiment:
                  </span>
                  <span
                    className={`font-bold ${
                      entry.overall_sentiment.includes("Positive")
                        ? "text-green-700"
                        : entry.overall_sentiment.includes("Negative")
                        ? "text-red-700"
                        : "text-gray-700"
                    }`}
                  >
                    {entry.overall_sentiment}
                  </span>
                </div>

                <div className="flex gap-x-4">
                  <span className="min-w-28 text-purple-700 font-semibold">
                    Score:
                  </span>
                  <span className="text-black">
                    {entry.score.toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
