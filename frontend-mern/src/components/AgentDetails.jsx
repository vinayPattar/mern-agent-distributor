import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';

const AgentDetails = () => {
  const [agent, setAgent] = useState(null);
  const email = localStorage.getItem("Email");
  console.log(email)

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await api.get(`/agent/agent-info?email=${email}`)
        console.log(response.data.agent);
        setAgent(response.data.agent);
      } catch (err) {
        console.error("Failed to fetch agent info:", err);
      }
    };

    fetchAgent();
  }, [email]);

  return (
    <div className=' w-full h-full ml-80 mt-10'>
      {agent ? (
        <div>
          <h2>Agent Info</h2>
          <p><strong>Name:</strong> {agent.name}</p>
          <p><strong>Email:</strong> {agent.email}</p>
          <p><strong>Phone No:</strong> {agent.phoneno}</p>
        </div>
      ) : (
        <p>Loading agent info...</p>
      )}
    </div>
  );
};

export default AgentDetails;
