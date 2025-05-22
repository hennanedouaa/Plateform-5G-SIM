import React, { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { FaVideo, FaMicrophone } from "react-icons/fa";
import { Trash, Save2, CloseSquare } from "iconsax-react";
import axios from 'axios';

export default function SimulationConfig() {
  const [packetType, setPacketType] = useState("Video Traffic");
  const [packetSize, setPacketSize] = useState("");
  const [transmissionInterval, setTransmissionInterval] = useState("");
  const [simulationQueue, setSimulationQueue] = useState([]);
  const [saveMessage, setSaveMessage] = useState(false);

  const handleAddToQueue = () => {
    if (packetType && packetSize && transmissionInterval) {
      setSimulationQueue([
        ...simulationQueue,
        {
          packetType,
          packetSize: `${packetSize} bytes`,
          transmissionInterval: `${transmissionInterval} ms`,
        },
      ]);
      setPacketSize("");
      setTransmissionInterval("");
    }
  };

const handleSave = () => {
  axios.post('http://localhost:5000/save_simulation', { simulationQueue })
    .then(response => {
      console.log(response.data);
      setSaveMessage(true);
    })
    .catch(error => {
      console.error('There was an error saving the simulation!', error);
    });
};



  const handleClearQueue = () => {
    setSimulationQueue([]);
  };

  const handleDeleteItem = (index) => {
    const updatedQueue = simulationQueue.filter((_, i) => i !== index);
    setSimulationQueue(updatedQueue);
  };

  const inputStyle = "px-2 py-1 text-sm rounded border w-full";
  const labelStyle = "block mb-1 text-sm font-medium text-gray-700";

  return (
    <div className="bg-[#EFF2F6] min-h-screen py-8 text-[#1F2937] text-sm">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Simulation Configuration</h1>
        <p className="text-[#4B5563] mb-6 text-lg">
          Configure packet parameters for your simulation
        </p>

        <div className="flex gap-6">
          {/* Packet Configuration */}
          <div className="bg-white p-6 rounded-xl shadow mb-6 flex-1">
            <h2 className="text-lg font-semibold mb-4">Packet Configuration</h2>
            <div className="mb-4">
              <label className={labelStyle}>Packet Type</label>
              <select
                value={packetType}
                onChange={(e) => setPacketType(e.target.value)}
                className={inputStyle}
              >
                <option value="Video Traffic">Video Traffic</option>
                <option value="Voice Traffic">Voice Traffic</option>
              </select>
            </div>
            <div className="mb-4">
              <label className={labelStyle}>Packet Size (Bytes)</label>
              <input
                type="number"
                value={packetSize}
                onChange={(e) => setPacketSize(e.target.value)}
                className={inputStyle}
                placeholder="Enter packet size"
              />
            </div>
            <div className="mb-4">
              <label className={labelStyle}>Transmission Interval (ms)</label>
              <input
                type="number"
                value={transmissionInterval}
                onChange={(e) => setTransmissionInterval(e.target.value)}
                className={inputStyle}
                placeholder="Enter interval"
              />
            </div>
            <button
              className="bg-[#1DA189] text-white px-4 py-2 rounded hover:bg-[#168270] w-full"
              onClick={handleAddToQueue}
            >
              + Add to Simulation Queue
            </button>
          </div>

          {/* Simulation Queue */}
          <div className="bg-white p-6 rounded-xl shadow mb-6 flex-1">
            <h2 className="text-lg font-semibold mb-4">Simulation Queue</h2>
            {simulationQueue.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-4 mb-2 border border-[1.8px] border-[#E5E7EB] rounded">
                <div className="flex items-center">
                  {item.packetType === "Video Traffic" ? (
                    <FaVideo size={20} className="mr-2" color="#3B82F6" />
                  ) : (
                    <FaMicrophone size={20} className="mr-2" color="#10B981" />
                  )}
                  <div>
                    <p className="font-medium">{item.packetType}</p>
                    <p className="text-xs text-gray-400">
                      {item.packetSize} / {item.transmissionInterval}
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteItem(index)}
                >
                  <Trash size={20} color="#EF4444" variant="Outline" />
                </button>
              </div>
            ))}
            <button
              className="bg-[#1DA189] text-white px-4 py-2 rounded hover:bg-[#168270] w-full mb-2 flex items-center justify-center gap-2"
              onClick={handleSave}
            >
              <Save2 size={20} color="#FFFFFF" variant="Outline" />
              <span>Save Queue</span>
            </button>
            <button
              className="border-[1.8px] border-[#D1D5DB] text-[#1F2937] px-4 py-2 rounded hover:bg-gray-200 w-full flex items-center justify-center gap-2"
              onClick={handleClearQueue}
            >
              <CloseSquare size={20} color="#1F2937" />
              <span>Clear Queue</span>
            </button>
          </div>
        </div>

        {/* Save Confirmation */}
        {saveMessage && (
          <div
            className="bg-[#D1FAE5] text-[#065F46] px-4 py-3 rounded text-sm flex items-center gap-2 border border-[1px]"
            style={{ borderColor: "#34D399" }}
          >
            <HiCheckCircle className="text-[#047857] text-xl" />
            <span>
              Simulation configuration saved successfully!{" "}
              <a href="#" className="underline text-[#047857] font-medium">
                Run Simulation!
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
