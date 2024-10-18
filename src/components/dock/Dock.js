import React from 'react';
import { useMotionValue } from 'framer-motion';
import apps from '../../configs/apps';
import DockItem from './DockItem';
import '../../styles/Dock.css'; // Updated import path

function Dock({ open, hide }) {
  const mouseX = useMotionValue(null);

  return (
    <div
      className="dock"
      onMouseMove={(e) => mouseX.set(e.nativeEvent.clientX)}
      onMouseLeave={() => mouseX.set(null)}
      style={{
        zIndex: hide ? 0 : 99999,
      }}
    >
      <ul className="dock-items">
        {apps.map((app, index) => (
          <DockItem
            key={app.id}
            app={{ ...app, index }}
            mouseX={mouseX}
            openApp={open}
          />
        ))}
      </ul>
    </div>
  );
}

export default Dock;
