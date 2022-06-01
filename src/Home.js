// import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  // uses the custom hook created in the useFetch.js file from lession 20. data: blogs means the data should be called blogs
  const { data: blogs, isPending, error } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {/* when there is an error output */}
      {error && <div> {error} </div>}
      {/* shows the loading.... message before geting the data */}
      {isPending && <div> Loading..... </div>}
      {/* creates the blog lists by fetching the data from the db.json file from the db folder */}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />} {/* conditiona AND logic been used to the blogs */}
    </div>
  );
};

export default Home;
