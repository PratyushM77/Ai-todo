import React, { useState } from "react";
import Todo from "./Todo";
import Logout from "./Logout";

function Ask() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [refresh, setRefresh] = useState(false);

  const API_KEY = "AIzaSyBWxvwBVEqwS-DBsAOwotWIcSq9ZJnA864";

  const FetchAnswer = async () => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a list of 5 concise, actionable tasks to learn about ${question}. Return only the tasks, no numbering or formatting.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const output = result.candidates[0].content.parts[0].text;
        setAnswer(output);
        setQuestion("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Copy = async () => {
    try {
      await navigator.clipboard.writeText(answer);
      alert("Item copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy text.");
    }
  };
  const Save = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posttodo`, {
        method: "POST",
        body: JSON.stringify({ todo: answer }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (response.ok) {
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-100  to-cyan-100 p-6">
        <div className="max-w-7xl mt-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <textarea
                onChange={(e) => setQuestion(e.target.value)}
                rows={5}
                cols={50}
                value={question}
                className="p-4 w-full border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Try writing Learn ReactJS, JavaScript, Python..."
              ></textarea>
              <button
                onClick={FetchAnswer}
                className="mt-4 cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Ask AI
              </button>
              <div>
                <pre
                  id="output"
                  className="mt-4 transition-all p-4 w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-800 whitespace-pre-wrap break-words overflow-auto max-h-80"
                >
                  {answer}
                </pre>
              </div>
              <div className="flex gap-5">
                <button
                  onClick={Copy}
                  className="mt-3 px-4 py-1 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg"
                >
                  Copy
                </button>
                <button
                  onClick={Save}
                  className="mt-3 px-4 py-1 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg"
                >
                  Save
                </button>
              </div>
              {/*  */}
              <div className="mt-10">

            <Logout/>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Todo refresh={refresh} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Ask;
