import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useMyContext } from '../store/Context';

const AgentTask = () => {
  const [agentData, setAgentData] = useState(null);
  const { email } = useMyContext();

  console.log("Agent Email:", email);

  useEffect(() => {
    const fetchAgentTasks = async () => {
      if (email) {
        try {
          const response = await api.get(`/agent/agent-tasks?email=${email}`);
          console.log(response.data)
          setAgentData(response.data);
        } catch (err) {
          console.error("Error fetching agent tasks", err);
        }
      }
    };

    fetchAgentTasks();
  }, [email]);

  if (!agentData) return <div className="p-6 ml-73">Loading...</div>;

  return (
    <div className="p-6 ml-73">
      <h2 className="text-2xl font-bold mb-4">Agent Task Details</h2>

      <div className="bg-white shadow-lg rounded-lg p-4">
        {/* Agent basic info */}
        <h3 className="text-xl font-semibold">{agentData.agent.name}</h3>
        <p className="text-sm text-gray-600">{agentData.agent.email}</p>

        {/* Tasks */}
        {agentData.tasks.length > 0 ? (
          <>
            <p className='text-lg font-semibold my-2'>Tasks Assigned</p>
            <table className="table-auto w-full mt-3 border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">First Name</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Notes</th>
                </tr>
              </thead>
              <tbody>
                {agentData.tasks.map((task, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{task.firstName}</td>
                    <td className="p-2 border">{task.phone}</td>
                    <td className="p-2 border">{task.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-gray-500 mt-4">No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

export default AgentTask;
