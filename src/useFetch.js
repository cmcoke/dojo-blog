// This is a custom hook that is used to fetch data from a url

import { useState, useEffect } from "react";

const useFetch = url => {
  /* url refers to the resources url */
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // get the data from the db.json file in the db folder
  useEffect(() => {
    // the abort controller aids in performing a useEffect Cleanup by stopping the fetch request from occuring
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal }) /* url refers to the resources url */
        .then(response => {
          /* if the resource url can't be reached output the error */
          if (!response.ok) {
            throw Error("Could not get data from that resource");
          }

          return response.json(); /* if the resource url can be reached return the json() */
        })
        .then(data => {
          setData(data); /* outputs the data to the screen */
          setIsPending(false); /* removes the loading..... message once the data was fetched successfully */
          setError(null); /* prevents the error message from appearing when there is no error */
        })
        .catch(err => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false); /* prevents the loading message from appearing */
            setError(err.message); /* outputs error message to the screen */
          }
        });
    }, 1000);

    // performs a useEffect Cleanup by aborting the fetch request
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
