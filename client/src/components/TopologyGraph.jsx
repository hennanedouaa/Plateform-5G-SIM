import React from "react";
import { RiSignalTowerFill } from "react-icons/ri";
import { FaServer, FaLaptop } from "react-icons/fa";
import { Cloud } from "iconsax-react";

const TopologyGraph = ({ upfCoords, gnbAssignments, links, dnsName, dnsUpfConnections }) => {
  // Node radii constants
  const UPF_RADIUS = 20;
  const GNB_RADIUS = 16;
  const UE_RADIUS = 12;
  const DN_RADIUS = 20;

  // Base dimensions for the topology
  const baseWidth = 800;
  const baseHeight = 500;

  // Calculate UPF positions (centered, with y-axis inverted)
  const upfPositions = upfCoords.map((coord, index) => ({
    id: index,
    name: `UPF ${index + 1}`,
    x: baseWidth * 0.5 + (coord.x - 0.5) * 300, // Center cluster with 300px spread
    y: (1 - coord.y) * baseHeight, // Invert y-axis
    type: "upf"
  }));

  // Position gNBs vertically on the left side
  const gnbCount = Object.keys(gnbAssignments).length;
  const gnbPositions = Array(gnbCount).fill().map((_, index) => ({
    id: index,
    x: baseWidth * 0.15, // Left side
    y: baseHeight * (0.2 + (index * 0.6 / Math.max(1, gnbCount - 1))), // Evenly spaced vertically
    type: "gnb"
  }));

  // Position UEs near their gNBs (slightly to the left)
  const uePositions = gnbPositions.map((gnb, index) => ({
    id: index,
    x: gnb.x - 50,
    y: gnb.y,
    type: "ue"
  }));

  // DNS position (right side)
  const dnsPosition = {
    id: 'dns',
    x: baseWidth * 0.85,
    y: baseHeight * 0.5,
    type: "dns",
    name: dnsName || "DNS"
  };

  // Process links from props
  const processedLinks = links.map(link => {
    const findNode = (name) => {
      if (name.startsWith("UPF")) {
        const index = parseInt(name.split(" ")[1]) - 1;
        return upfPositions[index];
      }
      if (name.startsWith("gNB")) {
        const index = parseInt(name.split(" ")[1]) - 1;
        return gnbPositions[index];
      }
      if (name === dnsName) return dnsPosition;
      return null;
    };

    const source = findNode(link.nodeA);
    const target = findNode(link.nodeB);

    if (!source || !target) return null;

    return {
      ...link,
      source,
      target,
      interfaceType: link.type === "upf-upf" ? "N9" : 
                   link.type === "gnb-upf" ? "N3" :
                   link.type === "upf-dns" ? "N6" : "",
      // Add specific color for gNB-UPF links
      stroke: link.type === "gnb-upf" ? "#d97706" : link.stroke || "#2563eb"
    };
  }).filter(Boolean);

  // Add automatic gNB-UPF connections based on assignments
  Object.entries(gnbAssignments).forEach(([gnbId, upfIndices]) => {
    const gnbIndex = parseInt(gnbId);
    upfIndices.forEach(upfIndex => {
      if (!processedLinks.some(l => 
        (l.source === gnbPositions[gnbIndex] && l.target === upfPositions[upfIndex]) ||
        (l.source === upfPositions[upfIndex] && l.target === gnbPositions[gnbIndex])
      )) {
        processedLinks.push({
          source: gnbPositions[gnbIndex],
          target: upfPositions[upfIndex],
          type: "gnb-upf",
          interfaceType: "N3",
          stroke: "#d97706", // Changed to amber-600 color
          strokeWidth: 2
        });
      }
    });
  });

  // Add DNS connections
  dnsUpfConnections.forEach(upfIndex => {
    if (upfPositions[upfIndex]) {
      processedLinks.push({
        source: upfPositions[upfIndex],
        target: dnsPosition,
        type: "upf-dns",
        interfaceType: "N6",
        stroke: "#ea580c",
        strokeWidth: 3
      });
    }
  });

  // Add UE connections
  uePositions.forEach((ue, index) => {
    processedLinks.push({
      source: ue,
      target: gnbPositions[index],
      type: "ue-gnb",
      stroke: "#10b981",
      strokeWidth: 1.5,
      strokeDasharray: "4"
    });
  });

  // Helper functions remain the same
  const getNodeRadius = (type) => {
    switch (type) {
      case "upf": return UPF_RADIUS;
      case "gnb": return GNB_RADIUS;
      case "ue": return UE_RADIUS;
      case "dns": return DN_RADIUS;
      default: return 15;
    }
  };

  const calculateLinkEndpoints = (source, target) => {
    const sourceRadius = getNodeRadius(source.type);
    const targetRadius = getNodeRadius(target.type);

    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;

    const offsetX = dx / distance;
    const offsetY = dy / distance;

    return {
      x1: source.x + offsetX * sourceRadius,
      y1: source.y + offsetY * sourceRadius,
      x2: target.x - offsetX * targetRadius,
      y2: target.y - offsetY * targetRadius
    };
  };

  const renderNodeIcon = (node) => {
    const radius = getNodeRadius(node.type);
    const iconProps = {
      style: { 
        fontSize: radius * 1.2,
        color: getNodeColor(node.type)
      }
    };

    switch (node.type) {
      case "upf":
        return <FaServer {...iconProps} />;
      case "gnb":
        return <RiSignalTowerFill {...iconProps} />;
      case "ue":
        return <FaLaptop {...iconProps} />;
      case "dns":
        return <Cloud variant="Bold" size={radius * 1.5} color={getNodeColor(node.type)} />;
      default:
        return null;
    }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case "upf": return "#2563eb";
      case "gnb": return "#10b981";
      case "ue": return "#10b981";
      case "dns": return "#8b5cf6";
      default: return "#666";
    }
  };

  const allNodes = [...upfPositions, ...gnbPositions, ...uePositions, dnsPosition];

  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${baseWidth} ${baseHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Render all links */}
        {processedLinks.map((link, index) => {
          const endpoints = calculateLinkEndpoints(link.source, link.target);

          return (
            <g key={`link-${index}`}>
              <line
                x1={endpoints.x1}
                y1={endpoints.y1}
                x2={endpoints.x2}
                y2={endpoints.y2}
                stroke={link.stroke}
                strokeWidth={link.strokeWidth || 2}
                strokeDasharray={link.strokeDasharray}
                strokeOpacity={0.8}
              />
              {link.interfaceType && (
                <text
                  x={(endpoints.x1 + endpoints.x2) / 2}
                  y={(endpoints.y1 + endpoints.y2) / 2 - 8}
                  textAnchor="middle"
                  fill={link.stroke}
                  fontSize={12}
                  fontWeight="bold"
                >
                  {link.interfaceType}
                </text>
              )}
            </g>
          );
        })}

        {/* Render all nodes */}
        {allNodes.map((node) => {
          const radius = getNodeRadius(node.type);
          const fillColor = node.type === "upf" ? "#dbeafe" : 
                          node.type === "dns" ? "#f5f3ff" : "#fff";

          return (
            <g key={`node-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
              {node.type !== "ue" && (
                <circle
                  r={radius}
                  fill={fillColor}
                  stroke={getNodeColor(node.type)}
                  strokeWidth={2}
                />
              )}
              <foreignObject
                x={-radius}
                y={-radius}
                width={radius * 2}
                height={radius * 2}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}>
                  {renderNodeIcon(node)}
                </div>
              </foreignObject>
              <text
                y={radius + 16}
                textAnchor="middle"
                fill="#475569"
                fontSize={12}
              >
                {node.name || node.type}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TopologyGraph;