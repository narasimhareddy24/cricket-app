import React, { useState, useRef } from "react";
import { FloatingIndicator, Tabs } from "@mantine/core";
import Status from "./Status.jsx";
import "../styles/status.css";

function Rankings() {
  const [type, setType] = useState("batsmen"); // Default to batting
  const [format, setFormat] = useState("test"); // Default to Test format
  const [rootRef, setRootRef] = useState(null);

  // Use a ref to store controlsRefs instead of state
  const controlsRefs = useRef({});

  const setControlRef = (val) => (node) => {
    if (node) {
      controlsRefs.current[val] = node;
    }
  };

  return (
    <div>
      {/* Normal Tabs for Rankings (Batting, Bowling, All-rounders) */}
      <Tabs value={type} onChange={setType}>
        <Tabs.List className="tabs-list">
          <Tabs.Tab value="batsmen" className="tab">
            Batting
          </Tabs.Tab>
          <Tabs.Tab value="bowlers" className="tab">
            Bowling
          </Tabs.Tab>
          <Tabs.Tab value="allrounders" className="tab">
            All-rounders
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* Floating Tabs for Status (Test, ODI, T20) */}
      <Tabs variant="none" value={format} onChange={setFormat}>
        <Tabs.List ref={setRootRef} className="tabs-list">
          <Tabs.Tab value="test" ref={setControlRef("test")} className="tab">
            Test
          </Tabs.Tab>
          <Tabs.Tab value="odi" ref={setControlRef("odi")} className="tab">
            ODI
          </Tabs.Tab>
          <Tabs.Tab value="t20" ref={setControlRef("t20")} className="tab">
            T20
          </Tabs.Tab>

          <FloatingIndicator
            target={controlsRefs.current[format] || null}
            parent={rootRef}
            className="indicator"
          />
        </Tabs.List>
      </Tabs>

      {/* Pass both type and format to the Status component */}
      <Status type={type} format={format} />
    </div>
  );
}

export default Rankings;