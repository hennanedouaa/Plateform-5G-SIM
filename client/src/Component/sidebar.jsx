import { PiGraphLight } from "react-icons/pi";
import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.svg";
import {
  Setting,
  Play,
  Chart1,
} from "iconsax-react";
import { useNavigate, useLocation } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // Automatically update active item based on current URL
    const path = location.pathname.split("/")[1];
    setActiveItem(path || "TopologyConfig");
  }, [location]);

  const getItemClass = (name) => {
    const isActive = activeItem.toLowerCase() === name.toLowerCase();
    return `
      rounded-lg py-3 px-3 flex items-center gap-2 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] transition font-jakarta
      ${isActive ? "bg-[#1C3D3D] text-white" : "text-[#F9F9F9] text-opacity-60 hover:bg-[#1D3D31]"}
    `;
  };

  const getIconColor = (name) => (activeItem.toLowerCase() === name.toLowerCase() ? "#FFFFFF" : "#96A9A2");

  return (
    <Sidebar className="h-screen px-2 w-[20.6%] bg-deepgreen shadow-lg border-0 z-20 text-[#C1B49A]">
      <div className="flex flex-col items-center mt-3 py-6 mb-6">
        <img src={logo} alt="5G SIM" className="h-28" />
      </div>

      <Sidebar.Items className="!border-none">
        <Sidebar.ItemGroup className="!border-none">
          <Sidebar.Item
            className={`${getItemClass("TopologyConfig")} items-center my-2 border-0`}
            icon={() => <PiGraphLight size="28" color={getIconColor("TopologyConfig")} />}
            onClick={() => navigate("/TopologyConfig")}
          >
            Topology Configuration
          </Sidebar.Item>

          <Sidebar.Item
            className={`${getItemClass("SimulationConfig")} flex items-center my-2`}
            icon={() => <Setting size="24" variant="outline" color={getIconColor("SimulationConfig")} />}
            onClick={() => navigate("/SimulationConfig")}
          >
            Simulation Configuration
          </Sidebar.Item>

          <Sidebar.Item
            className={`${getItemClass("RunSimulation")} flex items-center my-2`}
            icon={() => <Play size="24" variant="outline" color={getIconColor("RunSimulation")} />}
            onClick={() => navigate("/RunSimulation")}
          >
            Run Simulation
          </Sidebar.Item>

          <Sidebar.Item
            className={`${getItemClass("Results")} flex items-center my-2`}
            icon={() => <Chart1 size="24" variant="outline" color={getIconColor("Results")} />}
            onClick={() => navigate("/Results")}
          >
            Review Results
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;