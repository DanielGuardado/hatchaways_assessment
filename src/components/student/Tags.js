import React from "react";

import "./Tags.css";

export default function Tags({ tags, handleTagClick }) {
  return (
    <ul className="tags-ul">
      {tags.map((tag, idx) => (
        <li onClick={() => handleTagClick(tag)} className="tags-li" key={idx}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
