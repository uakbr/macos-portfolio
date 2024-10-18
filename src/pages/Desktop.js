import React, { Component } from 'react';
import { connect } from 'react-redux';
import nightwind from 'nightwind/helper';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import TopBar from '../components/menus/TopBar';
import Dock from '../components/dock/Dock';
import Launchpad from '../components/Launchpad';
import Window from '../components/Window';
import Spotlight from '../components/Spotlight';
import apps from '../configs/apps';
import wallpapers from '../configs/wallpapers';
import MissionControl from '../components/MissionControl';
import NotificationCenter from '../components/NotificationCenter';
import LiveWallpaper from '../components/LiveWallpaper';
import FileSystem from '../components/FileSystem';
import ErrorBoundary from '../components/ErrorBoundary';

import { toggleDark } from '../redux/action';

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApps: {},
      appsZ: {},
      maxApps: {},
      minApps: {},
      maxZ: 2,
      showLaunchpad: false,
      currentTitle: 'Finder',
      hideDock: false,
      spotlight: false,
      spotlightBtnRef: null,
      showMissionControl: false,
      showNotificationCenter: false,
      notifications: [],
    };
  }

  componentDidMount() {
    this.getAppsData();
    this.detectColorScheme();
  }

  getAppsData = () => {
    let showApps = {},
      appsZ = {},
      maxApps = {},
      minApps = {};

    apps.forEach((app) => {
      showApps = {
        ...showApps,
        [app.id]: app.show,
      };
      appsZ = {
        ...appsZ,
        [app.id]: 2,
      };
      maxApps = {
        ...maxApps,
        [app.id]: false,
      };
      minApps = {
        ...minApps,
        [app.id]: false,
      };
    });

    this.setState({ showApps, appsZ, maxApps, minApps });
  };

  toggleLaunchpad = (target) => {
    let r = document.querySelector(`#launchpad`);
    if (target) {
      r.style.transform = 'scale(1)';
      r.style.transition = 'ease-in 0.2s';
    } else {
      r.style.transform = 'scale(1.1)';
      r.style.transition = 'ease-out 0.2s';
    }

    this.setState({ showLaunchpad: target });
  };

  toggleSpotlight = () => {
    this.setState({ spotlight: !this.state.spotlight });
  };

  setWindowsPosition = (id) => {
    let r = document.querySelector(`#window-${id}`);
    if (r) {
      const rect = r.getBoundingClientRect();
      r.style.setProperty('--window-transform-x', rect.x.toFixed(1) + 'px');
      r.style.setProperty('--window-transform-y', rect.y.toFixed(1) + 'px');
    }
  };

  closeApp = (id) => {
    let showApps = this.state.showApps;
    showApps[id] = false;
    this.setState({
      showApps: showApps,
      hideDock: false,
    });
  };

  openApp = (id) => {
    let showApps = this.state.showApps;
    showApps[id] = true;

    let appsZ = this.state.appsZ;
    let maxZ = this.state.maxZ + 1;
    appsZ[id] = maxZ;

    this.setState({
      showApps: showApps,
      appsZ: appsZ,
      maxZ: maxZ,
      currentTitle: apps.find((app) => {
        return app.id === id;
      }).title,
    });

    let minApps = this.state.minApps;
    if (minApps[id]) {
      var r = document.querySelector(`#window-${id}`);
      r.style.transform = `translate(${r.style.getPropertyValue(
        '--window-transform-x'
      )}, ${r.style.getPropertyValue('--window-transform-y')}) scale(1)`;
      r.style.transition = 'ease-in 0.3s';
      minApps[id] = false;
      this.setState({ minApps });
    }
  };

  setAppMax = (id, target) => {
    let maxApps = this.state.maxApps;
    if (target === undefined) target = !maxApps[id];
    maxApps[id] = target;
    this.setState({
      maxApps: maxApps,
      hideDock: target,
    });
  };

  setAppMin = (id, target) => {
    let minApps = this.state.minApps;
    if (target === undefined) target = !minApps[id];
    minApps[id] = target;
    this.setState({
      minApps: minApps,
    });
  };

  minimizeApp = (id) => {
    this.setWindowsPosition(id);

    var dockItem = document.querySelector(`#dock-${id}`);
    if (!dockItem) return;
    const dockAppRect = dockItem.getBoundingClientRect();

    var windowElement = document.querySelector(`#window-${id}`);
    if (!windowElement) return;
    const appRect = windowElement.getBoundingClientRect();
    const posY =
      document.body.offsetHeight -
      appRect.y.toFixed(1) -
      (windowElement.offsetHeight / 2).toFixed(1);
    const posX =
      dockAppRect.x.toFixed(1) -
      (windowElement.offsetWidth / 2).toFixed(1) +
      25;

    windowElement.style.transform = `translate(${posX}px, ${posY}px) scale(0.2)`;
    windowElement.style.transition = 'ease-out 0.3s';

    this.setAppMin(id, true);
  };

  renderAppWindows = () => {
    return apps.map((app) => {
      if (app.desktop && this.state.showApps[app.id]) {
        const props = {
          title: app.title,
          id: app.id,
          width: app.width,
          height: app.height,
          minWidth: app.minWidth,
          minHeight: app.minHeight,
          z: this.state.appsZ[app.id],
          max: this.state.maxApps[app.id],
          min: this.state.minApps[app.id],
          close: this.closeApp,
          setMax: this.setAppMax,
          setMin: this.minimizeApp,
          focus: this.openApp,
        };

        return (
          <Window key={`desktop-app-${app.id}`} {...props}>
            {app.content}
          </Window>
        );
      } else {
        return null;
      }
    });
  };

  toggleMissionControl = () => {
    this.setState((prevState) => ({
      showMissionControl: !prevState.showMissionControl,
    }));
  };

  toggleNotificationCenter = () => {
    this.setState((prevState) => ({
      showNotificationCenter: !prevState.showNotificationCenter,
    }));
  };

  detectColorScheme = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.props.toggleDark(prefersDarkMode);
  };

  addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
    };
    this.setState((prevState) => ({
      notifications: [newNotification, ...prevState.notifications],
    }));
  };

  getOpenApps = () => {
    return apps
      .filter((app) => this.state.showApps[app.id])
      .map((app) => ({
        ...app,
        focus: this.openApp,
      }));
  };

  render() {
    const { t } = this.props.useTranslation();

    return (
      <div className="w-full h-full overflow-hidden">
        {/* Live Wallpaper */}
        <LiveWallpaper />

        {/* Top Bar */}
        <TopBar
          title={this.state.currentTitle}
          toggleSpotlight={this.toggleSpotlight}
          toggleMissionControl={this.toggleMissionControl}
          toggleNotificationCenter={this.toggleNotificationCenter}
        />

        {/* Desktop Icons */}
        <FileSystem openItem={this.openApp} />

        {/* App Windows */}
        <ErrorBoundary>
          {this.renderAppWindows()}
        </ErrorBoundary>

        {/* Spotlight */}
        {this.state.spotlight && (
          <Spotlight
            openApp={this.openApp}
            toggleLaunchpad={this.toggleLaunchpad}
            toggleSpotlight={this.toggleSpotlight}
            btnRef={this.state.spotlightBtnRef}
          />
        )}

        {/* Launchpad */}
        <Launchpad
          show={this.state.showLaunchpad}
          toggleLaunchpad={this.toggleLaunchpad}
        />

        {/* Dock */}
        <Dock
          open={this.openApp}
          hide={this.state.hideDock}
        />

        {/* Mission Control */}
        {this.state.showMissionControl && (
          <MissionControl
            openApps={this.getOpenApps()}
            closeMissionControl={this.toggleMissionControl}
          />
        )}

        {/* Notification Center */}
        <NotificationCenter
          show={this.state.showNotificationCenter}
          notifications={this.state.notifications}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dark: state.dark,
  brightness: state.brightness,
});

const mapDispatchToProps = {
  toggleDark,
};

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
