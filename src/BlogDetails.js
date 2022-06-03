import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending, error } = useFetch("http://localhost:8000/blogs/" + id);
  const history = useHistory();

  // removes the blog once the 'delete' button has been clicked
  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE"
    }).then(() => {
      history.push("/"); /* used to redirect the user to site' home page. */
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div> Loading..... </div>}
      {error && <div> {error} </div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
