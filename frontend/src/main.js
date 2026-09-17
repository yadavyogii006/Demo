import { API_URL, apiFetch } from "./api.js";

const statusEl = document.getElementById("status");
const healthValue = document.getElementById("health-value");
const projectCount = document.getElementById("project-count");
const projectGrid = document.getElementById("project-grid");
const helloForm = document.getElementById("hello-form");
const nameInput = document.getElementById("name-input");
const helloReply = document.getElementById("hello-reply");

document.querySelectorAll("[data-api-path]").forEach((link) => {
  const path = link.getAttribute("data-api-path");
  link.href = `${API_URL}${path}`;
});

function setStatus(ok, label) {
  statusEl.className = "status " + (ok ? "ok" : "down");
  statusEl.lastElementChild.textContent = label;
}

async function loadHealth() {
  try {
    const res = await apiFetch("/health");
    const data = await res.json();
    const ok = res.ok && data.status === "ok";
    setStatus(ok, ok ? "live" : "degraded");
    healthValue.textContent = ok ? "ok" : data.status || "error";
  } catch {
    setStatus(false, "offline");
    healthValue.textContent = "down";
  }
}

function renderProjects(projects) {
  if (!projects.length) {
    projectGrid.innerHTML = '<div class="empty">No projects yet.</div>';
    projectCount.textContent = "0";
    return;
  }

  projectCount.textContent = String(projects.length);
  projectGrid.innerHTML = projects
    .map(
      (project) => `
        <article class="card">
          <h3>${escapeHtml(project.name)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="tags">
            ${(project.tech || [])
              .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

async function loadProjects() {
  try {
    const res = await apiFetch("/api/projects");
    if (!res.ok) throw new Error("Could not load projects");
    renderProjects(await res.json());
  } catch {
    projectCount.textContent = "0";
    projectGrid.innerHTML =
      '<div class="error">Projects could not be loaded. Check the /api/projects endpoint.</div>';
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

helloForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name) {
    helloReply.className = "reply bad";
    helloReply.textContent = "Enter a name first.";
    nameInput.focus();
    return;
  }

  helloReply.className = "reply muted";
  helloReply.textContent = "Talking to the API…";

  try {
    const res = await apiFetch("/hello/" + encodeURIComponent(name));
    const data = await res.json();
    if (!res.ok) throw new Error();
    helloReply.className = "reply";
    helloReply.textContent = data.message;
  } catch {
    helloReply.className = "reply bad";
    helloReply.textContent = "The hello endpoint did not respond.";
  }
});

loadHealth();
loadProjects();
