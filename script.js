// Clock
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('clock').textContent = time;
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  // Quote
  const quotes = [
    "First, solve the problem. Then, write the code. – John Johnson",
    "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
    "Code is like humor. When you have to explain it, it’s bad. – Cory House",
    "Fix the cause, not the symptom. – Steve Maguire",
    "Simplicity is the soul of efficiency. – Austin Freeman"
  ];
  document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
  
  // Load/Save config
  function getConfig() {
    const saved = localStorage.getItem("devConfig");
    if (!saved) {
      const config = {
        devName: "Ahmed",
        devLinks: [
          { name: "GitHub", url: "https://github.com" },
          { name: "StackOverflow", url: "https://stackoverflow.com" },
          { name: "Portfolio", url: "https://techahmed.com" },
          { name: "Blog", url: "https://blog.techahmed.com" }
        ]
      };
      localStorage.setItem("devConfig", JSON.stringify(config));
      return config;
    }
    return JSON.parse(saved);
  }
  
  function saveConfig(config) {
    localStorage.setItem("devConfig", JSON.stringify(config));
  }
  
  function render() {
    const { devName, devLinks } = getConfig();
    document.getElementById("greeting").textContent = `🚀 Keep coding, ${devName}!`;
  
    const linksDiv = document.getElementById("links");
    linksDiv.innerHTML = "";
    devLinks.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      linksDiv.appendChild(a);
    });
  }
  render();
  
  // Config modal
  const modal = document.getElementById("configModal");
  const nameInput = document.getElementById("nameInput");
  const linksInput = document.getElementById("linksInput");
  
  document.getElementById("configBtn").onclick = () => {
    const { devName, devLinks } = getConfig();
    nameInput.value = devName;
    linksInput.value = JSON.stringify(devLinks, null, 2);
    modal.style.display = "flex";
  };
  
  document.getElementById("closeConfigBtn").onclick = () => {
    modal.style.display = "none";
  };
  
  document.getElementById("saveConfigBtn").onclick = () => {
    try {
      const newName = nameInput.value.trim() || "Dev";
      const newLinks = JSON.parse(linksInput.value);
      if (!Array.isArray(newLinks)) throw new Error("Links must be an array.");
      saveConfig({ devName: newName, devLinks: newLinks });
      render();
      modal.style.display = "none";
    } catch (e) {
      alert("Invalid data: " + e.message);
    }
  };
  
  // Export
  document.getElementById("exportBtn").onclick = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(localStorage.getItem("devConfig"));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "dev-config.json");
    dlAnchor.click();
  };
  
  // Import
  document.getElementById("importBtn").onclick = () => {
    document.getElementById("fileInput").click();
  };
  document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.devName || !Array.isArray(data.devLinks)) {
          throw new Error("Invalid config file.");
        }
        localStorage.setItem("devConfig", JSON.stringify(data));
        render();
        alert("Config imported!");
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  });
  