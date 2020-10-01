import React, { useState } from "react";
import Tags from "./Tags";

import TestScores from "./TestScores";

export default function StundentsIndexItem({ student }) {
  const [expandedView, setExpandedView] = useState(false);
  const [tag, setTag] = useState("");
  const [studentTags, setStudentTags] = useState(
    Object.assign({}, student, { tags: [] })
  );
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  debugger;
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTags = studentTags["tags"].concat(tag);
    setStudentTags(Object.assign({}, studentTags, { tags: newTags }));
  };

  function getAvg(grades) {
    const total = grades.reduce((acc, c) => Number(acc) + Number(c), 0);
    return total / grades.length;
  }
  const average = getAvg(student.grades);

  return (
    <div className="card">
      {!expandedView ? (
        <a
          className="expand-btn"
          onClick={() => setExpandedView(!expandedView)}
        >
          +
        </a>
      ) : (
        <a
          className="expand-btn"
          onClick={() => setExpandedView(!expandedView)}
        >
          -
        </a>
      )}
      <div className="card-holder">
        <img className="profile-pic" src={student.pic} alt="Profile Pic" />
      </div>
      <div>
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
              {studentTags.tags.length > 0 && <Tags tags={studentTags.tags} />}
              <form onSubmit={handleSubmit}>
                <input
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
