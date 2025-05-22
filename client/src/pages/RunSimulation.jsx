import React, { useEffect, useState } from "react";
import TopologyGraph from "../components/TopologyGraph";
import { Play } from "iconsax-react";
import axios from 'axios';

export default function RunSimulation() {
  const [topologyData, setTopologyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/simulation/static_topology')
      .then(response => {
        console.log('Response data:', response.data);
        setTopologyData(response.data);
      })
      .catch(error => {
        console.error('Error details:', error.response ? error.response.data : error.message);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!topologyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#EFF2F6] min-h-screen py-8 text-[#1F2937] text-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-2">Run Simulation</h1>
          <button className="bg-btngreen hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center">
            <Play size="32" color="#FFFFFF" variant="Bold" className="mr-2" />
            Start Simulation
          </button>
        </div>

        <TopologyGraph
          upfCoords={topologyData.upfCoords}
          gnbAssignments={topologyData.gnbAssignments}
          links={topologyData.links}
          dnsName={topologyData.dnsName}
          dnsUpfConnections={topologyData.dnsUpfConnections}
        />
      </div>
    </div>
  );
}
