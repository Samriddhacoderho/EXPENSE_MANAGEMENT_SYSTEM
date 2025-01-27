import React from 'react';
import '../css_files/Home.css';


function App() {
  return (
    <div className="app">
      {/* Top navigation bar */}
      <nav className="nav">
        <div className="nav-container">
          <h1 className="nav-logo">Expense Tracker</h1>
          
        </div>
      </nav>

      {/* Main content area */}
      <div className="hero">
        <h2 className="hero-title">
          Take Control of Your <span className="highlight">Expenses</span> <br />
          With Ease & Precision
        </h2>
        <p className="hero-subtitle">
          Visualize your spending patterns, stay on top of your budget, and
          achieve financial freedom!
        </p>
        <button className="btn-cta">Get Started Now</button>
      </div>

      {/* Features */}
      <div className="features">
        <h3 className="features-title">Why Choose Us?</h3>
        <div className="features-grid">
          {[
            {
              icon: "💰",
              title: "Track Expenses",
              description:
                "Keep track of where your money goes and find ways to save more.",
            },
            {
              icon: "📊",
              title: "See Your Data",
              description:
                "View your spending with simple charts that make sense.",
            },
            {
              icon: "🔒",
              title: "Stay Safe",
              description:
                "Your money info is locked up tight - we take security seriously.",
            },
          ].map((item, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{item.icon}</div>
              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sign up prompt */}
      <div className="cta">
        <div className="cta-container">
          <h4 className="cta-title">Want to save lots of money?</h4>
          <p className="cta-subtitle">
          Join a community of people who’ve transformed the way they manage their finances.
          </p>
          <button className="btn-cta">Start Now</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            © {new Date().getFullYear()} Expense Tracker
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
