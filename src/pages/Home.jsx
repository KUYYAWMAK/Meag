import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const Home = () => {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handlePublish = async () => {
    try {
      const response = await axios.post('/publish', { topic, message });
      console.log(response.data);
      // Clear the inputs after publishing
      setTopic('');
      setMessage('');
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              rows="5"
            ></textarea>
          </div>
          <button
            onClick={handlePublish}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;