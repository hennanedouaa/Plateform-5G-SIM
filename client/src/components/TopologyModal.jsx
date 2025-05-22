import React, { useRef, useEffect } from 'react';

export default function TopologyModal({
  upfCoords,
  numGNBs,
  gnbAssignments,
  links,
  dnsName,
  dnsUpfConnections,
  onClose,
}) {
  const graphRef = useRef(null);

  useEffect(() => {
    console.log("Received data in TopologyModal:", {
      upfCoords,
      numGNBs,
      gnbAssignments,
      links,
      dnsName,
      dnsUpfConnections,
    });

    if (!graphRef.current) return;

    // Clear old graph
    graphRef.current.innerHTML = "";

    // Example: simple circles for UPFs as a demo (replace with your graph logic)
    upfCoords.forEach(({ x, y }, idx) => {
      const div = document.createElement("div");
      div.textContent = `UPF ${idx + 1}`;
      div.style.position = "absolute";
      div.style.left = `${x}px`;
      div.style.top = `${y}px`;
      div.style.background = "lightblue";
      div.style.padding = "4px 8px";
      div.style.borderRadius = "4px";
      graphRef.current.appendChild(div);
    });
  }, [upfCoords, numGNBs, gnbAssignments, links, dnsName, dnsUpfConnections]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative shadow-lg" style={{ position: "relative", height: 400 }}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close Modal"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Created Topology</h2>

        {/* Graph visualization container */}
        <div
          ref={graphRef}
          style={{ position: "relative", border: "1px solid #ddd", height: 300, marginTop: 20 }}
        />
      </div>
    </div>
  );
}
