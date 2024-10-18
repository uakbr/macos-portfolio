import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import '../../styles/Window.css';

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimized: false,
      x: props.x || 100,
      y: props.y || 100,
      width: props.width || 800,
      height: props.height || 600,
    };
  }

  minimizeWindow = () => {
    this.setState({ minimized: true });
    setTimeout(() => {
      this.props.setMin(this.props.id);
      this.setState({ minimized: false });
    }, 500);
  };

  onDragStop = (e, d) => {
    const { x, y } = d;
    this.setState({ x, y });
  };

  onResizeStop = (e, direction, ref, delta, position) => {
    this.setState({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position,
    });
  };

  render() {
    const { id, z, max, min, show } = this.props;
    const { x, y, width, height } = this.state;

    if (min) return null;

    return (
      <Rnd
        id={`window-${id}`}
        className="window"
        style={{ zIndex: z }}
        size={{ width, height }}
        position={{ x, y }}
        onDragStop={this.onDragStop}
        onResizeStop={this.onResizeStop}
        bounds="parent"
        minWidth={this.props.minWidth || 300}
        minHeight={this.props.minHeight || 200}
        enableResizing={!max}
        disableDragging={max}
      >
        <motion.div
          className="window-content"
          animate={
            this.state.minimized
              ? { scaleY: 0.1, scaleX: 0.5, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.5 }}
        >
          <div className="window-header">
            <div className="window-controls">
              <button className="close-btn" onClick={() => this.props.close(id)} />
              <button className="minimize-btn" onClick={this.minimizeWindow} />
              <button className="maximize-btn" onClick={() => this.props.setMax(id)} />
            </div>
            <div className="window-title">{this.props.title}</div>
          </div>
          <div className="window-body">{this.props.children}</div>
        </motion.div>
      </Rnd>
    );
  }
}

export default Window;
