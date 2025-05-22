import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaServer, FaChartLine, FaCloud } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa6";

export default function Results() {
  const [latency, setLatency] = useState(0);
  const [packetLoss, setPacketLoss] = useState(0);
  const [jitter, setJitter] = useState(0);

  useEffect(() => {
    const fetchNetworkMetrics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/network-metrics");
        const data = response.data;
        setLatency(data.latency);
        setPacketLoss(data.packetLoss);
        setJitter(data.jitter);
      } catch (error) {
        console.error("Error fetching network metrics:", error);
      }
    };

    fetchNetworkMetrics();
  }, []);

  const downloadQosReport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/qos-report", {
        responseType: 'blob', // Important for handling binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'qos_report.txt');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading QoS report:", error);
    }
  };

  return (
    <div className="bg-[#EFF2F6] min-h-screen py-8 text-[#1F2937] text-sm">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Simulation Results</h1>
        <p className="text-[#4B5563] mb-6 text-lg">
          Start the network simulation and monitor the results
        </p>

        <div className="flex gap-6 mb-6">
          {/* Latency Card */}
          <div className="bg-white px-4 py-3 rounded-xl shadow flex-1 flex justify-between items-center">
            <div>
              <p className="text-gray-900 text-[16px] font-semibold">Latency</p>
              <p className="text-2xl font-bold text-[#3B82F6]">{latency} ms</p>
              <p className="text-gray-400 text-[12px]">Delayed reception</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaChartLine className="text-blue-500" size={20} />
            </div>
          </div>

          {/* Packet Loss Card */}
          <div className="bg-white px-4 py-3 rounded-xl shadow flex-1 flex justify-between items-center">
            <div>
              <p className="text-gray-900 text-[16px] font-semibold">Packet Loss</p>
              <p className="text-2xl font-bold text-green-500">{packetLoss}%</p>
              <p className="text-gray-400 text-[12px]">Missing data</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaServer className="text-green-500" size={28} />
            </div>
          </div>

          {/* Jitter Card */}
          <div className="bg-white px-4 py-3 rounded-xl shadow flex-1 flex justify-between items-center">
            <div>
              <p className="text-gray-900 text-[16px] font-semibold">Jitter</p>
              <p className="text-2xl font-bold text-[#8B5CF6]">{jitter} ms</p>
              <p className="text-gray-400 text-[12px]">Irregular timing</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FaCloud className="text-purple-500" size={28} />
            </div>
          </div>
        </div>

        {/* Downloadable Report Section */}
        <div className="bg-white px-6 py-3 rounded-xl shadow flex items-center justify-between transition transform duration-200 hover:scale-105 cursor-pointer" onClick={downloadQosReport}>
          <div className="flex items-center">
            <FaFilePdf size={28} color="#006400" />
            <div className="ml-5 flex flex-col gap-2">
              <p className="font-bold text-[18px]">Le rapport de QoS</p>
              <p className="text-gray-500">enregistrer le fichier .txt</p>
            </div>
          </div>
          <button className="bg-yellow-100 text-yellow-500 p-2 rounded-full">
            <FiDownload size={20} className="text-yellow-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
