const terminalCommands = {
  help: {
    description: "List available commands",
    action: () => {
      return Object.keys(terminalCommands).join(', ');
    },
  },
  about: {
    description: "About me",
    action: () => {
      return "I'm Umair Akbar, a software developer...";
    },
  },
  projects: {
    description: "List of projects",
    action: () => {
      return "1. Terraform Automation\n2. MacOS Portfolio\n...";
    },
  },
  clear: {
    description: "Clear the terminal",
    action: (clearScreen) => {
      clearScreen();
      return '';
    },
  },
  // ... other commands ...
};

export default terminalCommands;
