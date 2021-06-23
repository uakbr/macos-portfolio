const terminal = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              I am a Cloud Native Infrastructure Engineer and DevOps Professional. I have a deep understanding of Infrastructure Automation, Cloud Architecture, and Public/Private Cloud Provisioning. My experience includes scaling up infrastructure to meet diverse needs while ensuring compliance with enterprise policies, automation of infrastructure operations using open source toolsets such as Ansible, Terraform, Packer and Puppet.
              I work with Cloud and Infrastructure as Code (Iac), this includes Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure
            </div>
            <div className="mt-1">
              I got my master's degree in cybersecurity and information assurance.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content:
          "Machine Learning / Deep Learning / Continual Learning / Meta-Learning / Reinforcement Learning / Natural Language Processing"
      },
      {
        id: "about-who-cares",
        title: "who-cares.txt",
        type: "file",
        content:
          "I deliver scalable, resilient, and beautifully designed architectures and models."
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:umair@tesla.com.ai"
                target="_blank"
                rel="noreferrer"
              >
                umair@tesla.com.ai
              </a>{" "}
              /{" "}
              <a
                className="text-blue-300"
                href="mailto:usa@umairakbar.me"
                target="_blank"
                rel="noreferrer"
              >
                usa@umairakbar.me
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/umair-akb"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/umair-akb
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/umair-akbar"
                target="_blank"
                rel="noreferrer"
              >
                https://www.linkedin.com/in/umair-akbar
              </a>
            </li>
            <li>
              Blog:{" "}
              <a
                className="text-blue-300"
                href="https://hakk.gg"
                target="_blank"
                rel="noreferrer"
              >
                https://hakk.gg
              </a>
            </li>
            <li>
              Hackernews:{" "}
              <a
                className="text-blue-300"
                href="https://www.news.ycombinator.com"
                target="_blank"
                rel="noreferrer"
              >
                https://www.news.ycombinator.com
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;