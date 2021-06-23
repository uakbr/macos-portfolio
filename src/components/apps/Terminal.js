import React, { Component } from "react";
import terminal from "../../configs/terminal";

const emojis = [
  "\\(o_o)/",
  "(˚Δ˚)b",
  "(^-^*)",
  "(╯‵□′)╯",
  "\\(°ˊДˋ°)/",
  "╰(‵□′)╯"
];

const getEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789富强民主文明和谐自由平等公正法治爱国敬业诚信友善";

// rain animation is adopted from: https://codepen.io/P3R0/pen/MwgoKv
class HowDare extends Component {
  constructor(props) {
    super(props);
    this.font_size = 12;
    this.emoji = getEmoji();
    this.intervalId = null;
  }

  componentDidMount() {
    const $container = document.querySelector("#how-dare-container");
    this.$canvas = document.querySelector("#how-dare");
    this.$canvas.height = $container.offsetHeight;
    this.$canvas.width = $container.offsetWidth;
    this.ctx = this.$canvas.getContext("2d");

    const columns = this.$canvas.width / this.font_size;
    this.drops = [];
    // x: x coordinate, 1: y-coordinate
    for (let x = 0; x < columns; x++) this.drops[x] = 1;

    this.intervalId = setInterval(this.rain.bind(this), 33);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  rain() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    this.ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

    this.ctx.fillStyle = "#2e9244";
    this.ctx.font = `${this.font_size}px arial`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)];

      this.ctx.fillText(
        text,
        i * this.font_size,
        this.drops[i] * this.font_size
      );

      // sends the drop back to the top randomly after it has crossed the screen
      // adding randomness to the reset to make the drops scattered on the Y axis
      if (
        this.drops[i] * this.font_size > this.$canvas.height &&
        Math.random() > 0.975
      )
        this.drops[i] = 0;

      // increments Y coordinate
      this.drops[i]++;
    }
  }

  render() {
    return (
      <div
        id="how-dare-container"
        className="fixed w-full h-full bg-black text-white"
        onClick={() => this.props.setRMRF(false)}
      >
        <canvas id="how-dare"></canvas>
        <div className="font-avenir absolute text-center h-28 mx-auto -mt-20 bottom-0 left-0 right-0 top-1/2">
          <div className="text-4xl">{this.emoji}</div>
          <div className="text-3xl mt-4">HOW DARE YOU!</div>
          <div className="mt-4">Click to go back</div>
        </div>
      </div>
    );
  }
}

export default class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      rmrf: false
    };
    this.history = [];
    this.curHistory = 0;
    this.curInputTimes = 0;
    this.curDirPath = [];
    this.curChildren = terminal;
    this.commands = {
      cd: this.cd,
      ls: this.ls,
      cat: this.cat,
      clear: this.clear,
      help: this.help
    };
  }

  componentDidMount() {
    this.reset();
    this.generateInputRow(this.curInputTimes);
  }

  reset = () => {
    const $terminal = document.querySelector("#terminal-content");
    $terminal.innerHTML = "";
  };

  getCurDirName = () => {
    if (this.curDirPath.length === 0) return "~";
    else return this.curDirPath[this.curDirPath.length - 1];
  };

  getCurChildren = () => {
    let children = terminal;
    for (let name of this.curDirPath) {
      children = children.find((item) => {
        return (item.title === name) & (item.type === "folder");
      }).children;
    }
    return children;
  };

  // move into a specified folder
  cd = (args) => {
    if (args === undefined || args === "~") {
      // move to root
      this.curDirPath = [];
      this.curChildren = terminal;
    } else if (args === ".") {
      // stay in the current folder
      return;
    } else if (args === "..") {
      // move to parent folder
      if (this.curDirPath.length === 0) return;
      this.curDirPath.pop();
      this.curChildren = this.getCurChildren();
    } else {
      // move to certain child folder
      const target = this.curChildren.find((item) => {
        return (item.title === args) & (item.type === "folder");
      });
      if (target === undefined) {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`cd: no such file or directory: ${args}`}</span>
        );
      } else {
        this.curChildren = target.children;
        this.curDirPath.push(target.title);
      }
    }
  };

  // display content of a specified folder
  ls = () => {
    let result = [];
    for (let item of this.curChildren) {
      result.push(
        <span
          key={`terminal-result-ls-${this.curInputTimes}-${item.id}`}
          className={`${
            item.type === "file" ? "text-white" : "text-purple-300"
          }`}
        >
          {item.title}
        </span>
      );
    }
    this.generateResultRow(
      this.curInputTimes,
      <div className="grid grid-cols-4 w-full">{result}</div>
    );
  };

  // display content of a specified file
  cat = (args) => {
    const file = this.curChildren.find((item) => {
      return (item.title === args) & (item.type === "file");
    });

    if (file === undefined) {
      this.generateResultRow(
        this.curInputTimes,
        <span>{`cat: ${args}: No such file or directory`}</span>
      );
    } else {
      this.generateResultRow(this.curInputTimes, <span>{file.content}</span>);
    }
  };

  // clear terminal
  clear = () => {
    this.curInputTimes += 1;
    this.reset();
  };

  help = () => {
    const help = (
      <ul className="list-disc ml-6 pb-1.5">
        <li>
          <span className="text-red-400">cat {"<file>"}</span> - See the content
          of {"<file>"}
        </li>
        <li>
          <span className="text-red-400">cd {"<dir>"}</span> - Move into
          {" <dir>"}, "cd .." to move to the parent directory, "cd" or "cd ~" to
          return to root
        </li>
        <li>
          <span className="text-red-400">ls</span> - See files and directories
          in the current directory
        </li>
        <li>
          <span className="text-red-400">clear</span> - Clear the screen
        </li>
        <li>
          <span className="text-red-400">help</span> - Display this help menu
        </li>
        <li>
          <span className="text-red-400">rm -rf /</span> - :)
        </li>
        <li>
          press <span className="text-red-400">up arrow / down arrow</span> -
          Select history commands
        </li>
        <li>
          press <span className="text-red-400">tab</span> - Auto complete
        </li>
      </ul>
    );
    this.generateResultRow(this.curInputTimes, help);
  };

  autoComplete = (text) => {
    if (text === "") return text;

    const input = text.split(" ");
    const cmd = input[0];
    const args = input[1];

    let result = text;

    if (args === undefined) {
      const guess = Object.keys(this.commands).find((item) => {
        return item.substring(0, cmd.length) === cmd;
      });
      if (guess !== undefined) result = guess;
    } else if (cmd === "cd" || cmd === "cat") {
      const type = cmd === "cd" ? "folder" : "file";
      const guess = this.curChildren.find((item) => {
        return (
          item.type === type && item.title.substring(0, args.length) === args
        );
      });
      if (guess !== undefined) result = cmd + " " + guess.title;
    }
    return result;
  };

  keyPress = (e) => {
    const keyCode = e.key;
    const $input = document.querySelector(
      `#terminal-input-${this.curInputTimes}`
    );
    const input_text = $input.value.trim();
    const input = input_text.split(" ");

    if (keyCode === "Enter") {
      // ----------- run command -----------
      this.history.push(input_text);

      const cmd = input[0];
      const args = input[1];

      // we can't edit the past input
      $input.setAttribute("readonly", true);

      if (input_text.substr(0, 6) === "rm -rf") this.setState({ rmrf: true });
      else if (cmd && Object.keys(this.commands).includes(cmd)) {
        this.commands[cmd](args);
      } else {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`zsh: command not found: ${cmd}`}</span>
        );
      }

      // point to the last history command
      this.curHistory = this.history.length;

      // generate new input row
      this.curInputTimes += 1;
      this.generateInputRow(this.curInputTimes);
    } else if (keyCode === "ArrowUp") {
      // ----------- previous history command -----------
      if (this.history.length > 0) {
        if (this.curHistory > 0) this.curHistory--;
        const historyCommand = this.history[this.curHistory];
        $input.value = historyCommand;
      }
    } else if (keyCode === "ArrowDown") {
      // ----------- next history command -----------
      if (this.history.length > 0) {
        if (this.curHistory < this.history.length) this.curHistory++;
        if (this.curHistory === this.history.length) $input.value = "";
        else {
          const historyCommand = this.history[this.curHistory];
          $input.value = historyCommand;
        }
      }
    } else if (keyCode === "Tab") {
      // ----------- auto complete -----------
      $input.value = this.autoComplete(input_text);
      // prevent tab outside the terminal
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
    }
  };

  focusOnInput = (id) => {
    document.querySelector(`#terminal-input-${id}`).focus();
  };

  generateInputRow = (id) => {
    const newRow = (
      <div key={`terminal-input-row-${id}`} className="w-full h-6 flex">
        <div className="w-max flex items-center">
          <span className="text-yellow-200">
            usa@macbook-pro{" "}
            <span className="text-green-300">{this.getCurDirName()}</span>
          </span>
          <span className="ml-1.5 text-red-400">{">"}</span>
        </div>
        <input
          id={`terminal-input-${id}`}
          className="flex-1 w-full px-1 text-white outline-none bg-transparent"
          onKeyDown={this.keyPress}
          autoFocus={true}
        />
      </div>
    );
    let content = this.state.content;
    content.push(newRow);
    this.setState({ content });
  };

  generateResultRow = (id, result) => {
    const newRow = (
      <div
        key={`terminal-result-row-${id}`}
        className="w-full h-max leading-5 flex"
      >
        {result}
      </div>
    );
    let content = this.state.content;
    content.push(newRow);
    this.setState({ content });
  };

  render() {
    return (
      <div
        className="terminal font-terminal relative nightwind-prevent nightwind-prevent-block w-full h-full bg-gray-800 bg-opacity-90 text-white text-sm font-normal overflow-y-scroll"
        onClick={() => this.focusOnInput(this.curInputTimes)}
      >
        {this.state.rmrf && (
          <HowDare setRMRF={(value) => this.setState({ rmrf: value })} />
        )}
        <div className="w-full h-max pt-2 px-1.5 ">
          <span className="text-green-300">ヽ(ˋ▽ˊ)ノ</span>: Hey, you found the
          terminal! Type `help` to get started.
        </div>
        <div id="terminal-content" className="mt-2 px-1.5 pb-2">
          {this.state.content}
        </div>
      </div>
    );
  }
}
