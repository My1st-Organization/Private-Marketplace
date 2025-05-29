"use strict";
import { fetchWorkflows } from "./workflow.jsx";


const Logger = {
  log: console.log.bind(console),
  error: console.error.bind(console)
};

const marketplace = document.getElementById("marketplace");
const searchBox = document.getElementById("searchBox");
const readmeViewer = document.getElementById("readmeViewer");
const readmeContent = document.getElementById("readmeContent");
const closeReadmeBtn = document.getElementById("closeReadme");

let actions = [];

async function fetchActions() {
  try {
    Logger.log("Fetching actions metadata...");
    const res = await fetch('https://api.github.com/repos/bunnyorg/Org-marketplace/contents/actions');
    if (!res.ok) {
      throw new Error(`Http error! Status:', ${res.status}`);
    }
    actions = await res.json();
    Logger.log("Actions fetched successfully:",actions);
    renderActions(actions);
  } catch (error) {
      console.error('Failed to fetch actions:',error);
      marketplace.innerHTML = "<p>Error loading actions. Please try again later.</p>";
  }
}

function renderActions (actionsToRender) {
  try {
    marketplace.innerHTML = "";
    if (actionsToRender.length ===0) {
      marketplace.innerHTML = "<p>No actions found</p>";
      return;
    }
    
    actionsToRender.forEach(action => {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = function(){loadReadmeAction(action)};
      
      const title = document.createElement("h4");
      title.innerText = action.name;
      card.appendChild(title);
      
      const desc = document.createElement("p");
      desc.innerText = "";
      
      card.appendChild(desc);

      marketplace.appendChild(card);
    });
  } catch {
    Logger.error("Error rendering actions:", error);
  }
}

async function loadReadmeAction(action) {
  
  try {
    Logger.log(`Loading README for: ${action.name}`);
    
    const readmePath = `https://api.github.com/repos/bunnyorg/Org-marketplace/contents/.github/catalogs/${workflow.name}.md`;
    const res = await fetch(readmePath, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      }
    })
    if (!res.ok) {
      throw new Error(`Failed to load README: ${res.status}`);
    }
    console.log(res);
    const readmeText = await res.text();
    readmeContent.innerHTML = `<h2>${workflow.name}</h2><pre>${escapeHTML(readmeText)}</pre>`;
    readmeViewer.classList.remove("hidden");
  } catch (error) {
    Logger.error(`Error loading README for ${workflow.name}:`, error);
    readmeContent.innerHTML = '<p>Error loading README. Please try again later.</p>';
    readmeViewer.classList.remove("hidden");
  }
}

async function extractDescriptionFromReadme(action, desc) {
  try {
    Logger.log(`Loading README for: ${action.name}`);
    
    const readmePath = `https://api.github.com/repos/bunnyorg/Org-marketplace/contents/actions/${workflow.name}/README.md`;
    const res = await fetch(readmePath, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      }
    })
    if (!res.ok) {
      throw new Error(`Failed to load README: ${res.status}`);
    }
    const readmeText = await res.text();
    const lines = readmeText.split("\n");
    let description = "";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.length > 0 && !line.startsWith("#Description: ")) {
        desc.innerText = line.replace("#Description on ","");
        break;
      } else {
        desc.innerText = "Description not available in ReadME";
      }
    }
  } catch (error) {
    Logger.error("Error extracting description:", error);
    return "";
  }
}

export function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = marked(str);
  return div.innerHTML;
}

searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();
  console.log(query);
  const filtered = workflows.filter(wf => wf.name.toLowerCase().includes(query));
  renderWorkflows(filtered);
});

closeReadmeBtn.addEventListener("click", () => {
  readmeViewer.classList.add("hidden");
});


document.addEventListener("DOMContentLoaded", fetchActions);




   
