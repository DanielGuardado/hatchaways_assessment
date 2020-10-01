import { useState, useEffect } from "react";

export default useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const [item] = data.students;
    setData(item);
    setLoading(false);
  }, []);
  return { data, loading };
};
