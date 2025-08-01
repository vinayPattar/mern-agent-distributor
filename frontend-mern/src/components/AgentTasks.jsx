// components/AgentTasks.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../services/api"

function AgentTasks() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/agent/agents-with-tasks');
      setAgents(res.data);
      console.log(res.data)
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Agents</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((a) => (
          <div key={a.agent.id} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold">{a.agent.name}</h3>
            <p className="text-sm text-gray-600">{a.agent.email}</p>

            {a.tasks.length > 1 && <> <p className='text-lg font-semibold my-2'>Tasks Assigned</p>
              <table className="table-auto w-full mt-3 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">FirstName</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {a.tasks.map((t, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border">{t.firstName}</td>
                      <td className="p-2 border">{t.phone}</td>
                      <td className="p-2 border">{t.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table></>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentTasks;
