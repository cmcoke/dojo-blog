import { useState } from "react";
import { useHistory } from "react-router-dom"; /* used to redirect to a different route */

const Create = () => {
  const [title, setTitle] = useState(""); /* creates a state that tracks the value of the input text field */
  const [body, setBody] = useState(""); /* creates a state that tracks the value of the textarea field */
  const [author, setAuthor] = useState("mario"); /* creates a state that tracks the value of the select field */
  const [isPending, setIsPending] = useState(false);
  const history = useHistory(); /* used to redirect to a different route */

  const handleSubmit = e => {
    e.preventDefault();
    const blog = { title, body, author }; /* creates an object that contains the values of the input text field, textarea, the author that was choosed */

    /* shows the 'Adding New Blog' button */
    setIsPending(true);

    /* when blog is created it is then added db.json file in the data folder and shown on the home page */
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log("new blog added");
      setIsPending(false); /* shows the 'Add Blog' button */
      // history.go(-1); /* used to redirect the user to the last paged viewed on the site. */
      history.push("/"); /* used to redirect the user to site' home page. */
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        {/* 'value={title}' is the initial value which is an empty string. 'onChange={e => setTitle(e.target.value)}' whenever a text is written in the field the 'setTitle(e.target.value)' will execute updating the initial value */}
        <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
        <label>Blog body:</label>
        {/* 'value={body}' is the initial value which is an empty string. 'onChange={e => setBody(e.target.value)}' whenever texts are written in the textare the 'setBody(e.target.value)' will execute updating the initial value */}
        <textarea required value={body} onChange={e => setBody(e.target.value)}></textarea>
        <label>Blog author:</label>
        {/* 'value={author}' is the initial value which is "mario". 'onChange={e => setAuthor(e.target.value)}' whenever an option is selected the 'setAuthor(e.target.value)' will execute updating the initial value */}
        <select value={author} onChange={e => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {/* if a new blog has not been submitted show the Add Blog button */}
        {!isPending && <button>Add Blog</button>}
        {/* if a new blog is being submitted show the Adding New Blog button */}
        {isPending && <button disabled>Adding New Blog</button>}
      </form>
    </div>
  );
};

export default Create;
