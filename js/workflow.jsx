import { escapeHTML } from "./app.jsx";

const marketplace = document.getElementById("marketplace");

const Logger = {
  log: console.log.bind(console),
  error: console.error.bind(console)
};

let workflows = [];

export async function fetchWorkflows() {
  try {
    Logger.log("Fetching workflows metadata...");
    const res = await fetch('https://api.github.com/repos/bunnyorg/Org-marketplace/contents/.github/workflows');
    if (!res.ok) {
      throw new Error(`Http error! Status:', ${res.status}`);
    }
    workflows = await res.json()
    Logger.log("Workflows fetched successfully:",workflows);
    renderWorkflows(workflows);
  } catch (error) {
      console.error('Failed to fetch workflows:',error);
      marketplace.innerHTML = "<p>Error loading worflows. Please try again later.</p>";
  }
}

function renderWorkflows (workflowsToRender) {
  try {
    marketplace.innerHTML = "";
    if (workflowsToRender.length ===0) {
      marketplace.innerHTML = "<p>No workflows found</p>";
      return;
    }
    
    workflowsToRender.forEach(workflow => {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = function(){loadReadmeWorkflow(workflow)};
      
      const title = document.createElement("h4");
      title.innerText = workflow.name;
      card.appendChild(title);
      
      const desc = document.createElement("p");
      desc.innerText = "";
      extractDescriptionFromReadme(workflow, desc);
      card.appendChild(desc);

      marketplace.appendChild(card);
    });
  } catch {
    Logger.error("Error rendering workflows:", error);
  }
}

async function loadReadmeWorkflow(workflow) {
  
  try {
    Logger.log(`Loading README for: ${workflow.name}`);
    
    const readmePath = `https://api.github.com/repos/bunnyorg/Org-marketplace/contents/.github/catalogs/${workflow.name}.md`;
    const res = await fetch(readmePath, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      }
    })
    if (!res.ok) {
      throw new Error(`Failed to load README: ${res.status}`);
    }
    const readmeText = await res.text();
    
    readmeContent.innerHTML = `<h2>${workflow.name}</h2><pre>${escapeHTML(readmeText)}</pre>`;
    readmeViewer.classList.remove("hidden");
  } catch (error) {
    Logger.error(`Error loading README for ${workflow.name}:`, error);
    readmeContent.innerHTML = '<p>Error loading README. Please try again later.</p>';
    readmeViewer.classList.remove("hidden");
  }
}

async function extractDescriptionFromReadme(workflow, desc) {
  try {
    Logger.log(`Loading README for: ${workflow.name}`);
    
    const readmePath = `https://api.github.com/repos/bunnyorg/Org-marketplace/contents/.github/catalogs/${workflow.name}.md`;
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
