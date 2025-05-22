import React, { useState, useEffect } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Save2 } from "iconsax-react";
import TopologyModal from "../components/TopologyModal";
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/topology';

export default function TopologyConfig() {
  const [state, setState] = useState({
    numUPFs: 0,
    upfConfigs: [],
    numGNBs: 0,
    gnbAssignments: {},
   
    links: [],
    
    dnsUpfConnections: [],
    saveMessage: false,
    showTopologyModal: false,
    upfTypeError: "",
    isLoading: true
  });

  const UPF_TYPES = ["PCA", "edge", "intermediate"];
  const inputStyle = "px-2 py-1 text-sm rounded border w-full";
  const labelStyle = "block mb-1 text-sm font-medium text-gray-700";

  // Load saved topology on component mount
  useEffect(() => {
    const loadTopology = async () => {
      try {
        const response = await axios.get(`${API_URL}/load`);
        if (response.data.data) {
          setState(prev => ({
            ...prev,
            ...response.data.data,
            isLoading: false
          }));
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Error loading topology:", error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    loadTopology();
  }, []);

  // Auto-connect PCA UPF to DN whenever UPF configs change
  useEffect(() => {
    const pcaIndex = state.upfConfigs.findIndex(config => config.type === "PCA");
    if (pcaIndex !== -1) {
      setState(prev => ({
        ...prev,
        dnsUpfConnections: [pcaIndex]
      }));
    } else {
      setState(prev => ({
        ...prev,
        dnsUpfConnections: []
      }));
    }
  }, [state.upfConfigs]);

  // UPF config handlers
  const handleUPFChange = (index, field, value) => {
    const newConfigs = [...state.upfConfigs];
    
    if (field === "type" && value === "PCA") {
      const pcaExists = state.upfConfigs.some((config, idx) => idx !== index && config.type === "PCA");
      if (pcaExists) {
        setState(prev => ({ ...prev, upfTypeError: "Only one UPF can be of type PCA" }));
        return;
      }
      setState(prev => ({ 
        ...prev, 
        upfTypeError: "" 
      }));
    }
    
    newConfigs[index] = { ...newConfigs[index], [field]: value };
    setState(prev => ({ ...prev, upfConfigs: newConfigs, upfTypeError: "" }));
  };

  const handleUPFGeneration = () => {
    setState(prev => ({
      ...prev,
      upfConfigs: Array.from({ length: prev.numUPFs }, () => ({ type: "", x: "", y: "" })),
      upfTypeError: ""
    }));
  };

  // gNB assignment handlers
  const handleGnbAssignmentChange = (gnbIndex, upfIndex) => {
    if (state.upfConfigs[upfIndex]?.type !== "edge") return;
    
    setState(prev => {
      const currentList = prev.gnbAssignments[gnbIndex] || [];
      const exists = currentList.includes(upfIndex);
      return {
        ...prev,
        gnbAssignments: {
          ...prev.gnbAssignments,
          [gnbIndex]: exists ? currentList.filter(i => i !== upfIndex) : [...currentList, upfIndex]
        }
      };
    });
  };

  // Link management
  const handleAddLink = () => {
    setState(prev => ({ ...prev, links: [...prev.links, { nodeA: "", nodeB: "" }] }));
  };

  const handleLinkChange = (index, field, value) => {
    setState(prev => {
      const newLinks = [...prev.links];
      newLinks[index][field] = value;
      return { ...prev, links: newLinks };
    });
  };

  const handleRemoveLink = (index) => {
    setState(prev => {
      const newLinks = [...prev.links];
      newLinks.splice(index, 1);
      return { ...prev, links: newLinks };
    });
  };

  // Save handler
  const handleSave = async () => {
    try {
      const payload = {
        upfConfigs: state.upfConfigs,
        gnbAssignments: state.gnbAssignments,
        links: state.links,
        
        dnsUpfConnections: state.dnsUpfConnections,
       
        numGNBs: state.numGNBs,
        numUPFs: state.numUPFs
      };

      const response = await axios.post(`${API_URL}/save`, payload);
      if (response.data.status === "success") {
        setState(prev => ({ ...prev, saveMessage: true }));
        setTimeout(() => setState(prev => ({ ...prev, saveMessage: false })), 3000);
      }
    } catch (error) {
      console.error("Error saving topology:", error);
    }
  };

  // Reset handler
  const handleReset = async () => {
    try {
      await axios.post(`${API_URL}/reset`);
      setState({
        numUPFs: 0,
        upfConfigs: [],
        numGNBs: 0,
        gnbAssignments: {},
        links: [],
        
        dnsUpfConnections: [],
        saveMessage: false,
        showTopologyModal: false,
        upfTypeError: "",
        isLoading: false
      });
    } catch (error) {
      console.error("Error resetting topology:", error);
    }
  };

  const canAssignToGnb = (upfIndex) => state.upfConfigs[upfIndex]?.type === "edge";

  if (state.isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-[#EFF2F6] min-h-screen py-8 text-[#1F2937] text-sm">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Topology Configuration</h1>
        <p className="text-[#4B5563] mb-6 text-lg">
          Configure your network topology and UE distribution
        </p>

        {/* UPF Setup */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <label className={labelStyle}>Number of UPFs</label>
          <div className="flex gap-2 mb-4 items-center">
            <input
              type="number"
              value={state.numUPFs}
              onChange={(e) => setState(prev => ({ ...prev, numUPFs: parseInt(e.target.value) || 0 }))}
              className={`${inputStyle} flex-1`}
              placeholder="Enter number of UPFs"
            />
            <button
              className="flex-none bg-[#1DA189] text-white px-3 py-1 text-sm rounded hover:bg-[#168270] whitespace-nowrap"
              onClick={handleUPFGeneration}
            >
              Set UPFs
            </button>
          </div>

          {state.upfTypeError && (
            <div className="text-red-600 mb-3 text-sm">{state.upfTypeError}</div>
          )}

          {/* PCA-DN Connection Info */}
          {state.upfConfigs.some(config => config.type === "PCA") && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <HiCheckCircle className="text-blue-600 text-lg" />
                <span className="text-blue-800 text-sm font-medium">
                  PCA UPF is automatically connected to DN (Data Network)
                </span>
              </div>
            </div>
          )}

          {state.upfConfigs.map((config, idx) => (
            <div key={idx} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-600">
                    UPF {idx + 1} Type
                  </label>
                  <select
                    value={config.type}
                    onChange={(e) => handleUPFChange(idx, "type", e.target.value)}
                    className={inputStyle}
                  >
                    <option value="">Select UPF Type</option>
                    {UPF_TYPES.map((type) => {
                      const isDisabled = type === "PCA" && 
                        state.upfConfigs.some((c, i) => i !== idx && c.type === "PCA");
                      return (
                        <option 
                          key={type} 
                          value={type}
                          disabled={isDisabled}
                          className={isDisabled ? "text-gray-400 bg-gray-100" : ""}
                        >
                          {type} {isDisabled && '(already assigned)'} {type === "PCA" && "(auto-connects to DN)"}
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-600">
                    X Coordinate
                  </label>
                  <input
                    type="number"
                    value={config.x}
                    onChange={(e) => handleUPFChange(idx, "x", e.target.value)}
                    className={inputStyle}
                    placeholder="Enter X coordinate"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-600">
                    Y Coordinate
                  </label>
                  <input
                    type="number"
                    value={config.y}
                    onChange={(e) => handleUPFChange(idx, "y", e.target.value)}
                    className={inputStyle}
                    placeholder="Enter Y coordinate"
                  />
                </div>
              </div>
              
              {/* Show DN connection status for PCA UPF */}
              {config.type === "PCA" && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm">
                  <span className="text-green-800 font-medium">
                    ✓ This UPF is connected to the DN (Data Network)
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* gNB Setup */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <label className={labelStyle}>Number of gNBs</label>
          <input
            type="number"
            value={state.numGNBs}
            onChange={(e) => setState(prev => ({ ...prev, numGNBs: parseInt(e.target.value) || 0 }))}
            className={`${inputStyle} mb-4`}
            placeholder="Enter number of gNBs"
          />

          {Array.from({ length: state.numGNBs }).map((_, gnbIndex) => (
            <div key={gnbIndex} className="mb-4">
              <label className="font-semibold mb-2 block text-sm">
                gNB {gnbIndex + 1} - Select UPFs (only edge UPFs can be connected):
              </label>
              <div className="flex flex-wrap gap-3">
                {state.upfConfigs.map((config, upfIndex) => (
                  <label
                    key={upfIndex}
                    className={`flex items-center gap-1 text-sm ${!canAssignToGnb(upfIndex) ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <input
                      type="checkbox"
                      checked={state.gnbAssignments[gnbIndex]?.includes(upfIndex) || false}
                      onChange={() => handleGnbAssignmentChange(gnbIndex, upfIndex)}
                      disabled={!canAssignToGnb(upfIndex)}
                      className={!canAssignToGnb(upfIndex) ? 'cursor-not-allowed' : 'cursor-pointer'}
                    />
                    UPF {upfIndex + 1} ({config.type || "unspecified"})
                    {!canAssignToGnb(upfIndex) && config.type && (
                      <span className="text-xs text-red-500">(only edge UPFs allowed)</span>
                    )}
                  </label>
                ))}
              </div>
              {state.upfConfigs.length > 0 && !state.upfConfigs.some(config => config.type === "edge") && (
                <p className="text-sm text-gray-500 mt-1">
                  No edge UPFs available. Configure UPFs with type "edge" to connect gNBs.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Save and Reset Buttons */}
        <div className="flex items-center gap-4 mb-6 justify-end">
          <button
            onClick={handleSave}
            className="bg-[#1DA189] text-white px-6 py-2 flex items-center rounded hover:bg-[#168270] transition-colors duration-300"
          >
            <Save2 size={20} color="#FFFFFF" variant="Outline" />
            <span className="ml-2">Save Configuration</span>
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded border border-gray-400 hover:border-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Success message */}
        {state.saveMessage && (
          <div className="bg-[#D1FAE5] text-[#065F46] px-4 py-3 rounded text-sm flex items-center gap-2 border border-[#34D399]">
            <HiCheckCircle className="text-[#047857] text-xl" />
            <span>
              Configuration saved successfully!{" "}
              <a href="/RunSimulation" className="underline text-[#047857] font-medium">
                View Topology!
              </a>
            </span>
          </div>
        )}
      </div>
      
      {state.showTopologyModal && (
        <TopologyModal
          upfConfigs={state.upfConfigs}
          numGNBs={state.numGNBs}
          gnbAssignments={state.gnbAssignments}
          links={state.links}
          dnsName={state.dnsName}
          dnsUpfConnections={state.dnsUpfConnections}
          onClose={() => setState(prev => ({ ...prev, showTopologyModal: false }))}
        />
      )}
    </div>
  );
}