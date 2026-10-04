import { useState } from "react";

function AddBlog({ onBlogAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("Utkarsh");

  const addBlog = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category.trim()) {
      alert("Please fill all blog fields.");
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Please login as admin first.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/blogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content,
            category,
            author,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add blog.");
        return;
      }

      console.log("Blog added:", data);

      // Only send valid blog data to Dashboard
      onBlogAdded(data);

      setTitle("");
      setContent("");
      setCategory("");

      alert("Blog added successfully!");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Something went wrong while adding the blog.");
    }
  };

  return (
    <div className="add-blog">
      <h3>Add New Blog</h3>

      <form onSubmit={addBlog}>
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button type="submit">
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;