import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";

function AdminDashboard({ onLogout }) {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const token = localStorage.getItem("adminToken");

  // Get blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/blogs"
      );

      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // Start editing
  const startEdit = (blog) => {
    setEditingBlog({
      ...blog,
    });
  };

  // Update blog
  const updateBlog = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${editingBlog._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editingBlog.title,
            content: editingBlog.content,
            category: editingBlog.category,
            author: editingBlog.author,
          }),
        }
      );

      const updatedBlog = await response.json();

      if (!response.ok) {
        alert(updatedBlog.message || "Update failed");
        return;
      }

      setBlogs(
        blogs.map((blog) =>
          blog._id === updatedBlog._id
            ? updatedBlog
            : blog
        )
      );

      setEditingBlog(null);
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    onLogout();
  };

  return (
    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      <p>Welcome to your Portfolio CMS.</p>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      {/* Add Blog */}
      <AddBlog
        onBlogAdded={(newBlog) => {
          setBlogs([newBlog, ...blogs]);
        }}
      />

      <hr />

      <h2>Manage Blogs</h2>

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div className="admin-blog-card" key={blog._id}>

            {editingBlog?._id === blog._id ? (

              <div>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      title: e.target.value,
                    })
                  }
                />

                <textarea
                  value={editingBlog.content}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      content: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editingBlog.category}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      category: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editingBlog.author}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      author: e.target.value,
                    })
                  }
                />

                <button onClick={updateBlog}>
                  Save Changes
                </button>

                <button
                  onClick={() => setEditingBlog(null)}
                >
                  Cancel
                </button>
              </div>

            ) : (

              <div>
                <h3>{blog.title}</h3>

                <p>{blog.content}</p>

                <small>
                  {blog.category} • {blog.author}
                </small>

                <div className="blog-actions">

                  <button
                    onClick={() => startEdit(blog)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBlog(blog._id)}
                  >
                    Delete
                  </button>

                </div>
              </div>

            )}

          </div>
        ))
      )}

    </div>
  );
}

export default AdminDashboard;