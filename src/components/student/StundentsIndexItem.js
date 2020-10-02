import React, { useState } from "react";

import Tags from "./Tags";
import TestScores from "./TestScores";
import "./StundentsIndexItem.css";

export default function StundentsIndexItem({
  handleTagClick,
  handleTagFilter,
  student,
}) {
  const [expandedView, setExpandedView] = useState(false);
  const [studentTags, setStudentTags] = useState(Object.assign({}, student));
  const [tag, setTag] = useState("");

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTags = studentTags["tags"].concat(tag);
    handleTagFilter(
      student.id,
      Object.assign({}, studentTags, { tags: newTags })
    );
    setStudentTags(Object.assign({}, studentTags, { tags: newTags }));
    setTag("");
  };

  function getAvg(grades) {
    const total = grades.reduce((acc, c) => Number(acc) + Number(c), 0);
    return total / grades.length;
  }
  const average = getAvg(student.grades);

  return (
    <div className="card">
      <button
        className="expand-btn"
        onClick={() => setExpandedView(!expandedView)}
      >
        {expandedView ? "-" : "+"}
      </button>
      <div className="card-holder">
        <img className="profile-pic" src={student.pic} alt="Profile Pic" />
      </div>
      <div className="details-holder">
        <div className="name">
          {student.firstName} {student.lastName}
        </div>
        <div className="details">
          <div>Email: {student.email}</div>
          <div>Company: {student.company}</div>
          <div>Skill: {student.skill}</div>
          <div>Average: {average}%</div>
          {expandedView && (
            <>
              <TestScores scores={student.grades} />
              {studentTags.tags.length > 0 && (
                <Tags handleTagClick={handleTagClick} tags={studentTags.tags} />
              )}
              <form onSubmit={handleSubmit}>
                <input
                  value={tag}
                  onChange={handleTag}
                  placeholder="Add a tag"
                  id="add-tag-input"
                />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
