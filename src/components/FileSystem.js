import React, { useState } from 'react';
import './styles/FileSystem.css';

function FileSystem({ openItem }) {
  const [items, setItems] = useState([
    { id: 'file1', name: 'Resume.pdf', x: 50, y: 50 },
    { id: 'file2', name: 'Project.zip', x: 150, y: 50 },
    // Add more items as needed
  ]);
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
      item,
    });
  };

  const handleClick = () => {
    if (contextMenu) setContextMenu(null);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setContextMenu(null);
  };

  return (
    <div className="file-system" onClick={handleClick}>
      {items.map((item) => (
        <div
          key={item.id}
          className="desktop-item"
          onContextMenu={(e) => handleContextMenu(e, item)}
          style={{ top: item.y, left: item.x }}
        >
          <img src="img/icons/file.png" alt={item.name} />
          <span>{item.name}</span>
        </div>
      ))}

      {contextMenu && (
        <ul
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li onClick={() => openItem(contextMenu.item)}>Open</li>
          <li>Get Info</li>
          <li onClick={() => deleteItem(contextMenu.item.id)}>Delete</li>
        </ul>
      )}
    </div>
  );
}

export default FileSystem;
