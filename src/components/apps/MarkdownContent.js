import React from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownContent({ markdownText }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
}

export default MarkdownContent;
