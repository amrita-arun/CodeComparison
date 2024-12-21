"use client";

import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const HighlightedCode = ({ userCode, unmatched }) => {
  // Provide default values to prevent errors
  const codeLines = (userCode || "").split("\n");
  const unmatchedSet = new Set(unmatched || []);

  // Process and highlight lines
  const highlightedCode = codeLines.map((line) => {
    unmatched.forEach((method) => {
      const regex = new RegExp(`\\b${method}\\b`, "g");
      line = line.replace(
        regex,
        `<span class="bg-yellow-400 text-black font-bold">${method}</span>`
      );
    });
    return line;
  });

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white">
      {highlightedCode.map((line, index) => (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: line }}
          className="whitespace-pre-wrap"
        ></div>
      ))}
    </div>
  );
};

export default HighlightedCode;
