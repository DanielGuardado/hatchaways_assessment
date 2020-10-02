import React from "react";

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
