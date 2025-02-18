import React, { useState, useEffect } from 'react';
const mqtt = require("mqtt");
import Sidebar from './Sidebar';

// MQTT settings
const mqttHost = 'broker.hivemq.com';
const protocol = 'mqtt';
const port = '1883';
let mqttClient = null;

const Home = () => {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  // Connect to MQTT Broker on component mount
  useEffect(() => {
    const clientId = 'client' + Math.random().toString(36).substring(7);
    const hostURL = `${protocol}://${mqttHost}:${port}`;

    const options = {
      keepalive: 60,
      clientId: clientId,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    };

    mqttClient = mqtt.connect(hostURL, options);

    mqttClient.on('error', (err) => {
      console.log('Error: ', err);
      mqttClient.end();
    });

    mqttClient.on('reconnect', () => {
      console.log('Reconnecting...');
    });

    mqttClient.on('connect', () => {
      console.log('Client connected: ' + clientId);
    });

    mqttClient.on('message', (topic, message) => {
      console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic);
    });

    // Cleanup connection on component unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  // Function to publish message
  const publishMessage = (topic, message) => {
    console.log(`Sending Topic: ${topic}, Message: ${message}`);
    if (mqttClient && mqttClient.connected) {
      mqttClient.publish(topic, message, {
        qos: 0,
        retain: false,
      });
    }
  };

  // Handle publish button click
  const handlePublish = () => {
    console.log(`Publishing topic: ${topic} with message: ${message}`);
    publishMessage(topic, message); // Publish message via MQTT
    setTopic(''); // Clear the topic input
    setMessage(''); // Clear the message input
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
