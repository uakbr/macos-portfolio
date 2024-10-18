import React from 'react';
import { motion } from 'framer-motion';

function DockItem({ app, mouseX, openApp }) {
  return (
    <motion.button
      id={`dock-${app.id}`}
      className="dock-item"
      whileHover={{ scale: 1.2 }}
      onClick={() => openApp(app.id)}
      aria-label={app.title}
    >
      <img src={app.img} alt={app.title} />
    </motion.button>
  );
}

export default DockItem;
