import { useState, useEffect } from "react";
import axios from "axios";

const useGetData = (query) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unmount;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "http://openlibrary.org/search.json",
          params: {
            q: query,
            mode: "everything",
          },
          cancelToken: new axios.CancelToken((token) => (unmount = token)),
        });
        setData(res.data.docs.map((item) => item.title));
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError("Somthing went wrong");
      }
    })();

    // If query changes before fetching is complete, cancel the old fetch.
    return () => unmount();
  }, [query]);
  return { loading, data, error };
};

export default useGetData;
