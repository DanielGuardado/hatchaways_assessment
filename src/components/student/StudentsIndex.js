import React, { useState, useEffect } from "react";
import StundentsIndexItem from "./StundentsIndexItem";
import _ from "underscore";
import "./Student.css";

const useFetch = (url) => {
  const [data, setData] = useState({});

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  }, []);
  return { data };
};

export default function StudentsIndex() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data } = useFetch("https://www.hatchways.io/api/assessment/students");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleTag = (e) => {
    setTag(e.target.value);
  };

  useEffect(() => {
    let results = [];
    if (!data) return;
    for (const item in data.students) {
      const lowerCaseFistName = data.students[item]["firstName"].toLowerCase();
      const lowerCaseLastName = data.students[item]["lastName"].toLowerCase();
      if (
        lowerCaseFistName.includes(search) ||
        lowerCaseLastName.includes(search)
      ) {
        results.push(data.students[item]);
      }
    }
    setSearchResults(results);
  }, [search]);

  return (
    <div className="main-container-students">
      <input
        id="name-input"
        placeholder="Search by name"
        type="text"
        name="search"
        onChange={handleSearch}
        value={search}
      />
      <input
        id="add-tag-input"
        placeholder="Search by tags"
        type="text"
        name="tag"
        onChange={handleTag}
        value={tag}
      />
      {data.students &&
        search.length === 0 &&
        data.students.map((student, idx) => (
          <StundentsIndexItem
            key={idx}
            student={student}
            handleTag={handleTag}
          />
        ))}
      {search.length > 0 &&
        searchResults.map((student, idx) => (
          <StundentsIndexItem
            key={idx}
            student={student}
            handleTag={handleTag}
          />
        ))}
    </div>
  );
}
