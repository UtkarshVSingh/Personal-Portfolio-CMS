import "./App.css";

function App() {
  return (
    <div className="portfolio">
      {/* Navbar */}
      <nav className="navbar">
        <h2>My Portfolio</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="#blog">Blog</a>
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
              A MERN stack project for managing a personal portfolio and
              blog posts.
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

        <div className="blog-card">
          <h3>Welcome to My Blog</h3>
          <p>
            Blog posts will be loaded from our backend API in the next
            stage of the project.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact-section">
        <p className="section-label">CONTACT</p>
        <h2>Let's Connect</h2>

        <p>
          Interested in working together or discussing a project? Feel free
          to get in touch.
        </p>

        <button className="btn">Contact Me</button>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Utkarsh. Personal Portfolio & Blog CMS.</p>
      </footer>
    </div>
  );
}

export default App;