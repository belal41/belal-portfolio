import { projects } from "./data/projects.js";
import { certificates } from "./data/certificates.js";

const projectGrid = document.querySelector("#projects-grid");
projectGrid.innerHTML = projects.map((p, i) => `
  <article class="project-card reveal">
    <div class="project-image"><img src="${p.image}" alt="${p.title} dashboard preview" loading="lazy"></div>
    <div class="project-body">
      <span class="project-index">${String(i+1).padStart(2,"0")} / PROJECT</span>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="techs">${p.technologies.map(t=>`<span>${t}</span>`).join("")}</div>
      <div class="project-links">
        ${p.github ? `<a href="${p.github}" target="_blank" rel="noreferrer">GitHub ↗</a>` : ""}
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noreferrer">Live Demo ↗</a>` : ""}
        ${p.powerBI ? `<a href="${p.powerBI}" target="_blank" rel="noreferrer">Power BI ↗</a>` : ""}
      </div>
    </div>
  </article>
`).join("");

const certGrid = document.querySelector("#certificates-grid");
certGrid.innerHTML = certificates.map((c, i) => `
  <article class="cert-card reveal">
    <div class="cert-img" tabindex="0" role="button" aria-label="Open ${c.title} certificate" data-image="${c.image}" data-title="${c.title}">
      <img src="${c.image}" alt="${c.title} certificate" loading="lazy">
    </div>
    <div class="cert-info">
      <h3>${c.title}</h3>
      <p>${c.organization} · ${c.date}</p>
      ${c.verificationLink ? `<a class="cert-link" href="${c.verificationLink}" target="_blank" rel="noreferrer">Verify certificate ↗</a>` : ""}
    </div>
  </article>
`).join("");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const modal = document.querySelector("#image-modal");
const modalImage = document.querySelector("#modal-image");
document.addEventListener("click", e => {
  const trigger = e.target.closest(".cert-img");
  if(trigger){
    modalImage.src = trigger.dataset.image;
    modalImage.alt = trigger.dataset.title;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  }
  if(e.target.closest("[data-close-modal]")){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    modalImage.src = "";
  }
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape" && modal.classList.contains("open")){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    modalImage.src = "";
  }
});
