import { FaPaw } from "react-icons/fa";
import { GiNinjaHeroicStance } from "react-icons/gi";
import { VscGithub } from "react-icons/vsc";
import { GoRepo, GoBrowser } from "react-icons/go";
import { RiGamepadLine } from "react-icons/ri";
import { HiFire } from "react-icons/hi";

const bear = [
  {
    id: "profile",
    title: "Profile",
    icon: <FaPaw />,
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: <GiNinjaHeroicStance />,
        excerpt: "Hey there! My name is USA..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: <VscGithub />,
        excerpt: "Here are some stats about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: <GoBrowser />,
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: <GoRepo />,
    md: [
      {
        id: "terraform",
        title: "Terraform",
        file:
          "https://raw.githubusercontent.com/umair-akb/Automate-AWS-Lambda-Git-Actions/main/README.md",
        icon: <HiFire />,
        excerpt: "Deploy Terraform IaC with one Click",
        link: "https://github.com/umair-akb/Automate-AWS-Lambda-Git-Actions/"
      },
      {
        id: "macos-portfolio",
        title: "MacOS Portfolio",
        file:
          "https://raw.githubusercontent.com/umair-akb/macos-portfolio/main/README.md",
        icon: <RiGamepadLine />,
        excerpt: "My portfolio website simulating macOS's GUI...",
        link: "https://github.com/umair-akb/macos-portfolio/"
      }
    ]
  }
];

export default bear;
