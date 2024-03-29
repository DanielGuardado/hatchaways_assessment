import React, { useState, useEffect } from "react";

import StundentsIndexItem from "./StundentsIndexItem";
import "./StudentIndex.css";

export default function StudentsIndex() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tag, setTag] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        "https://www.hatchways.io/api/assessment/students"
      );
      const data = await response.json();
      const newData = data.students.map((el) =>
        Object.assign({}, el, { tags: [] })
      );

      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const results = [];

    for (const key in data) {
      const lowerCaseFistName = data[key]["firstName"].toLowerCase();
      const lowerCaseLastName = data[key]["lastName"].toLowerCase();
      if (
        lowerCaseFistName.includes(search) ||
        lowerCaseLastName.includes(search)
      ) {
        results.push(data[key]);
      }
    }
    setSearchResults(results);
  }, [search, data]);

  useEffect(() => {
    const results = [];
    for (const key in data) {
      const tagItems = data[key]["tags"];
      if (tagItems.length > 0) {
        for (const t of tagItems) {
          if (t.includes(tag) && !results.includes(data[key]))
            results.push(data[key]);
        }
      }
    }
    setSearchResults(results);
  }, [tag, data]);

  const handleTagFilter = (id, dataObject) => {
    for (const key in data) {
      if (data[key].id === id) {
        data[key] = dataObject;
      }
    }
  };

  const handleTagClick = (tag) => {
    setTag(tag);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const handleTagSearch = (e) => {
    setTag(e.target.value.toLowerCase());
  };

  return (
    <div className="main-container-students">
      <input
        id="name-input"
        placeholder="Search by name"
        type="text"
        name="search"
        onChange={handleSearch}
        value={search}
        onClick={() => setTag("")}
      />
      <input
        id="tag-input"
        placeholder="Search by tags"
        type="text"
        name="tag"
        onChange={handleTagSearch}
        value={tag}
        onClick={() => setSearch("")}
      />
      {search.length === 0 && tag.length === 0
        ? data.map((student, idx) => (
            <StundentsIndexItem
              key={idx}
              student={student}
              handleTagFilter={handleTagFilter}
              handleTagClick={handleTagClick}
            />
          ))
        : (search.length || tag.length) > 0 &&
          searchResults.map((student, idx) => {
            return (
              <StundentsIndexItem
                key={idx}
                handleTagClick={handleTagClick}
                student={student}
                handleTagFilter={handleTagFilter}
              />
            );
          })}
    </div>
  );
}
