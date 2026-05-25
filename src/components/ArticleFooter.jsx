// src/components/ArticleFooter.jsx

import React from 'react';
import './ArticleFooter.css'; 
// Make sure to import the CSS file!

const ArticleFooter = ({ previousArticle, nextArticle }) => {
    return (
        <div className="article-footer-container">
            <div className="article-navigation">
                {/* Previous Article Link */}
                {previousArticle ? (
                    <a href={`/article/${previousArticle.slug}`} className="nav-button prev">
                        ← Previous: {previousArticle.title}
                    </a>
                ) : (
                    <div className="nav-button disabled">
                        ← Start of Series
                    </div>
                )}

                {/* Separator */}
                <div className="separator">|</div>

                {/* Next Article Link */}
                {nextArticle ? (
                    <a href={`/article/${nextArticle.slug}`} className="nav-button next">
                        Next: {nextArticle.title} →
                    </a>
                ) : (
                    <div className="nav-button disabled">
                        End of Series →
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleFooter;
