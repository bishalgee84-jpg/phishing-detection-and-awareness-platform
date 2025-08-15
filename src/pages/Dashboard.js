import React, { useState, useEffect } from 'react';
import DetectionResult from '../components/DetectionResult';
import { detectPhishing } from '../utils/phishingDetector';

const Dashboard = () => {
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState(null);
  const [details, setDetails] = useState('');

  // Mock emails for auto-detection simulation
  const mockEmails = [
    'Dear user, click http://192.168.1.1/login to update your password.',
    'Hello, your invoice is at https://example.com/invoice.',
    'Urgent: Update your PayPal account at http://phishsite.com/paypal.'
  ];

  useEffect(() => {
    // Simulate auto-fetching an email on page load
    const randomEmail = mockEmails[Math.floor(Math.random() * mockEmails.length)];
    setEmailContent(randomEmail);
    const detection = detectPhishing(randomEmail);
    setResult(detection.isPhishing ? 'phishing' : 'safe');
    setDetails(detection.reason);
  }, []);

  const handlePaste = (e) => {
    const content = e.target.value;
    setEmailContent(content);
    if (content) {
      const detection = detectPhishing(content);
      setResult(detection.isPhishing ? 'phishing' : 'safe');
      setDetails(detection.reason);
    } else {
      setResult(null);
      setDetails('');
    }
  };

  return (
    <div>
      <h2>Dashboard - Auto Phishing Detection</h2>
      <p>Auto-detected email: {emailContent}</p>
      {result && <DetectionResult result={result} details={details} />}
      <textarea
        placeholder="Paste email content here for additional checks (auto-detects on change)"
        value={emailContent}
        onChange={handlePaste}
        rows={5}
        className="textarea"
      />
    </div>
  );
};

export default Dashboard;