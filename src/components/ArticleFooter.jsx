import React from 'react';

// Note: If you are using a CSS module approach, you might import 
// './ArticleFooter.module.css' instead of relying on global CSS
import './ArticleFooter.css'; // Make sure you create this CSS file for the components

const ArticleFooter = ({ prevTitle, nextTitle, relatedTopics }) => {
  return (
    <div className="article-footer-wrapper">
      
      {/* === 1. NAVIGATION (PREV/NEXT) === */}
      <div className="article-navigation">
        <div className="nav-button-container">
          <h3>← Previous Article</h3>
          {/* Use a link or React Router's <Link> component here */}
          <a href="/previous-url" className="nav-btn">
            {prevTitle || '[Title of Previous Article]'}
          </a>
        </div>
        
        <div className="nav-button-container">
          <h3>Next Article →</h3>
          {/* Use a link or React Router's <Link> component here */}
          <a href="/next-url" className="nav-btn">
            {nextTitle || '[Title of Next Article]'}
          </a>
        </div>
      </div>

      {/* === 2. DEEP DIVE / RELATED CONTENT === */}
      {relatedTopics && (
        <div className="deep-dive-container">
          <h2>📚 Related Reading</h2>
          <div className="related-items-grid">
            {relatedTopics.map((topic, index) => (
              <div key={index} className="related-item">
                <a href={topic.url}>{topic.title}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ArticleFooter;

