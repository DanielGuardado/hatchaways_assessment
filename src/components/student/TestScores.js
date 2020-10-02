import React from "react";

import "./TestScores.css";

export default function TestScores({ scores }) {
  return (
    <ul className="scores-ul">
      {scores.map((score, idx) => (
        <li key={idx}>
          Test {idx + 1}: {score}%
        </li>
      ))}
    </ul>
  );
}
