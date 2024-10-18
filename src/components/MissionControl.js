import React from 'react';
import { motion } from 'framer-motion';
import '../styles/MissionControl.css'; // Updated import path

function MissionControl({ openApps, closeMissionControl }) {
  const positions = [
    { top: '10%', left: '10%' },
    { top: '10%', right: '10%' },
    { bottom: '10%', left: '10%' },
    { bottom: '10%', right: '10%' },
  ];

  return (
    <div className="mission-control-bg" onClick={closeMissionControl}>
      {openApps.map((app, index) => (
        <motion.div
          key={app.id}
          className="mission-control-window"
          style={positions[index % positions.length]}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => app.focus(app.id)}
        >
          {app.content}
          <span>{app.title}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default MissionControl;
