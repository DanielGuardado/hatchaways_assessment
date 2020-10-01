import React from "react";

export default function Tags({ tags }) {
  return (
    <ul>
      {tags.map((tag, idx) => (
        <li key={idx}>{tag}</li>
      ))}
    </ul>
  );
}
