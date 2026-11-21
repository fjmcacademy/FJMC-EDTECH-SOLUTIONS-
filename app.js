// EDIT THIS LIST to add your own applications and software.
const products = [
  {
    id: "fjmc-academy", name: "FJMC Academy", category: "Education", icon: "✳",
    tagline: "A digital learning platform for focused exam preparation.",
    description: "FJMC Academy is an education platform designed to support students with structured courses, learning resources and online test practice. Replace this text with your application's real purpose, audience and a clear explanation of the problem it solves.",
    features: ["Online courses and learning material", "Practice tests and test series", "Student dashboard and progress", "Administrative content management"],
    steps: ["Create an account or sign in.", "Choose a course or learning resource.", "Study, practise and review your progress."],
    platform: "Web", status: "Add current status", developer: "YourStudio", url: "#"
  },
  {
    id: "omr-scanner", name: "FJMC OMR Scanner", category: "Productivity", icon: "▦",
    tagline: "A smarter workflow for evaluating OMR answer sheets.",
    description: "Describe how your OMR application works, who it is built for, and how it helps users save time. Add accurate details about supported input formats, evaluation and result management.",
    features: ["Create or configure question papers", "Scan answer sheets", "Review and manage results", "Export reports"],
    steps: ["Prepare the answer key and paper settings.", "Upload or scan answer sheets.", "Review the generated results and reports."],
    platform: "Web / Desktop", status: "Add current status", developer: "YourStudio", url: "#"
  },
  {
    id: "shape-cam", name: "ShapeCam Pro", category: "Creative Tools", icon: "◫",
    tagline: "A flexible camera and screen workspace for teaching.",
    description: "Explain the main features of ShapeCam Pro here. Include the supported devices, recording workflow, overlay tools and the type of users who will benefit from the application.",
    features: ["Camera overlay and shape tools", "Screen and window recording", "Audio source options", "Flexible teaching workspace"],
    steps: ["Open the application and select your workspace.", "Choose the tools and sources you need.", "Start your session and save your recording."],
    platform: "Desktop", status: "Add current status", developer: "YourStudio", url: "#"
  },
  {
    id: "teaching-board", name: "FJMC Teaching Board", category: "Education", icon: "▤",
    tagline: "A digital board for lessons, explanations and live classes.",
    description: "Use this section to explain your teaching board, its drawing tools, document support, recording options and online or offline capabilities. Keep the information specific to the version you are presenting.",
    features: ["Digital writing and annotation", "Document and PDF support", "Teaching and presentation tools", "Live-class workflow"],
    steps: ["Open a board or teaching document.", "Annotate and explain your material.", "Save or share your lesson as supported."],
    platform: "Desktop", status: "Add current status", developer: "YourStudio", url: "#"
  }
];

const grid = document.getElementById("product-grid");
const search = document.getElementById("search");
const empty = document.getElementById("empty-state");
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

function renderProducts(query = "") {
  if (!grid) return;
  const filtered = products.filter(p => (p.name + " " + p.category + " " + p.tagline).toLowerCase().includes(query.toLowerCase()));
  grid.innerHTML = filtered.map((p, i) => `
    <article class="product-card" style="--card-index:${i}">
      <div class="card-top"><span class="product-icon">${p.icon}</span><span class="card-category">${p.category}</span></div>
      <h3>${p.name}</h3><p>${p.tagline}</p>
      <a class="card-link" href="software.html?id=${encodeURIComponent(p.id)}" target="_blank" rel="noopener">Explore software <span>↗</span></a>
    </article>`).join("");
  if (empty) empty.hidden = filtered.length !== 0;
  const count = document.getElementById("product-count");
  if (count) count.textContent = String(products.length).padStart(2, "0");
}
if (search) search.addEventListener("input", e => renderProducts(e.target.value));
renderProducts();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = products.find(p => p.id === id);
if (document.getElementById("detail-root")) {
  if (!product) {
    document.getElementById("detail-root").innerHTML = '<section class="not-found"><div class="eyebrow">PRODUCT NOT FOUND</div><h1>We could not find that software.</h1><a class="button-primary" href="index.html">Back to products</a></section>';
  } else {
    document.title = `${product.name} | YourStudio`;
    const set = (elementId, value) => { const el = document.getElementById(elementId); if (el) el.textContent = value; };
    set("detail-icon", product.icon); set("detail-category", product.category.toUpperCase());
    set("detail-title", product.name); set("detail-tagline", product.tagline);
    set("detail-description", product.description); set("info-category", product.category);
    set("info-platform", product.platform); set("info-status", product.status);
    set("info-developer", product.developer);
    const launch = document.getElementById("launch-link");
    launch.href = product.url;
    if (!product.url || product.url === "#") { launch.textContent = "Application link coming soon"; launch.removeAttribute("target"); launch.setAttribute("aria-disabled", "true"); launch.classList.add("is-disabled"); }
    document.getElementById("feature-grid").innerHTML = product.features.map((f, i) => `<div class="feature-item"><span>0${i+1}</span><strong>${f}</strong></div>`).join("");
    document.getElementById("steps").innerHTML = product.steps.map((s, i) => `<div class="step"><span>0${i+1}</span><p>${s}</p></div>`).join("");
  }
}