import { useEffect, useState } from "react";
import "./App.css";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [blogs, setBlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(
    !!localStorage.getItem("adminToken")
  );

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 100) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch blogs
  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) =>
        console.log("Error fetching blogs:", error)
      );
  }, []);

  // Admin page
  if (window.location.pathname === "/admin") {
    if (isAdmin) {
      return (
        <AdminDashboard
          onLogout={() => {
            localStorage.removeItem("adminToken");
            setIsAdmin(false);
          }}
        />
      );
    }

    return (
      <AdminLogin
        onLogin={() => setIsAdmin(true)}
      />
    );
  }

  return (
    <div className="portfolio">

      {/* Navbar */}
      <nav className="navbar">
        <h2>My Portfolio</h2>

        <div className="nav-links">
          <a
            href="#home"
            className={activeSection === "home" ? "active" : ""}
          >
            Home
          </a>

          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
          >
            About
          </a>

          <a
            href="#skills"
            className={activeSection === "skills" ? "active" : ""}
          >
            Skills
          </a>

          <a
            href="#projects"
            className={activeSection === "projects" ? "active" : ""}
          >
            Projects
          </a>

          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
          >
            Contact
          </a>

          <a
            href="#blog"
            className={activeSection === "blog" ? "active" : ""}
          >
            Blog
          </a>
        </div>
      </nav>

      {/* Home */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <p className="welcome">WELCOME TO MY PORTFOLIO</p>

          <h1>
            Hi, I'm <span>Utkarsh</span>
          </h1>

          <h2>Frontend Developer</h2>

          <p className="intro">
            I am a BCA student who enjoys building simple and useful
            websites using modern web technologies.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn">
              View My Projects
            </a>

            <a href="#contact" className="btn secondary-btn">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <p className="section-label">ABOUT ME</p>

        <h2>Who I Am</h2>

        <p>
          I am currently pursuing BCA and learning frontend and full-stack
          web development. I like creating clean, responsive and
          user-friendly websites.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <p className="section-label">MY SKILLS</p>

        <h2>Technologies I Use</h2>

        <div className="skills">
          <div>HTML</div>
          <div>CSS</div>
          <div>JavaScript</div>
          <div>React</div>
          <div>Node.js</div>
          <div>Express.js</div>
          <div>MongoDB</div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <p className="section-label">MY WORK</p>

        <h2>Projects</h2>

        <div className="project-grid">

          <div className="project-card">
            <h3>Portfolio & Blog CMS</h3>

            <p>
              A MERN stack project for managing a personal portfolio
              and blog posts.
            </p>
          </div>

          <div className="project-card">
            <h3>Netflix Clone</h3>

            <p>
              A frontend project created using HTML and CSS with a
              Netflix-inspired design.
            </p>
          </div>

          <div className="project-card">
            <h3>Snake Game</h3>

            <p>
              A simple game project created as part of my programming
              practice.
            </p>
          </div>

        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="section">
  <p className="section-label">BLOG</p>

  <h2>Latest Posts</h2>

  {blogs.length === 0 ? (
    <p>No blog posts available.</p>
  ) : (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog._id}>
          <h3>{blog.title}</h3>

          <p>{blog.content}</p>

          <div className="blog-meta">
            <span>{blog.category}</span>
            <span>{blog.author}</span>
          </div>
        </div>
      ))}
    </div>
  )}
</section>

      {/* Contact */}
      <section id="contact" className="section contact-section">
        <p className="section-label">CONTACT</p>

        <h2>Let's Connect</h2>

        <p>
          Interested in working together or discussing a project?
          Feel free to get in touch.
        </p>

        <button className="btn">
          Contact Me
        </button>
      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2026 Utkarsh. Personal Portfolio & Blog CMS.
        </p>
      </footer>

    </div>
  );
}

export default App;