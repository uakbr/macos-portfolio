import React from 'react';
import { connect } from 'react-redux';
import { setVolume, setBrightness, toggleWIFI, toggleBluetooth } from '../../redux/action';

function ControlCenterMenu(props) {
  return (
    <div className="control-center-menu">
      <div className="control-item">
        <p>Volume</p>
        <input
          type="range"
          min="0"
          max="100"
          value={props.volume}
          onChange={(e) => props.setVolume(Number(e.target.value))}
        />
      </div>
      <div className="control-item">
        <p>Brightness</p>
        <input
          type="range"
          min="0"
          max="100"
          value={props.brightness}
          onChange={(e) => props.setBrightness(Number(e.target.value))}
        />
      </div>
      <div className="control-item">
        <p>Wi-Fi</p>
        <button onClick={() => props.toggleWIFI(!props.wifi)}>
          {props.wifi ? 'On' : 'Off'}
        </button>
      </div>
      <div className="control-item">
        <p>Bluetooth</p>
        <button onClick={() => props.toggleBluetooth(!props.bluetooth)}>
          {props.bluetooth ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  volume: state.volume,
  brightness: state.brightness,
  wifi: state.wifi,
  bluetooth: state.bluetooth,
});

const mapDispatchToProps = {
  setVolume,
  setBrightness,
  toggleWIFI,
  toggleBluetooth,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlCenterMenu);
