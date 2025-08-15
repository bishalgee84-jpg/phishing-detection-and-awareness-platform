import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from '../components/Quiz';

const Awareness = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // Fetch awareness content
    axios.get('http://localhost:5000/api/content')
      .then(res => setContents(res.data))
      .catch(err => console.error(err));
  }, []);

  // Mock quiz for demo
  const mockQuiz = {
    question: 'Is "http://bank.com/login" suspicious?',
    answer: 'No'
  };

  return (
    <div>
      <h2>Awareness Section</h2>
      <p>Learn to spot phishing: Avoid clicking links in unsolicited emails.</p>
      <h3>Quiz</h3>
      <Quiz question={mockQuiz.question} answer={mockQuiz.answer} />
      <h3>Articles</h3>
      {contents.map(content => (
        <div key={content._id} className="content">
          <h4>{content.title}</h4>
          <p>{JSON.stringify(content.content)}</p>
        </div>
      ))}
    </div>
  );
};

export default Awareness;