// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Loader
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("hide"),
    500,
  );
});

// Typing effect
const roles = [
  "Information Technology Student",
  "Aspiring Software Developer",
  "Web Developer",
];
const typed = document.getElementById("typed");
let r = 0,
  c = 0,
  deleting = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) {
    deleting = true;
    return setTimeout(type, 1400);
  } else if (c > 0) c--;
  else {
    deleting = false;
    r = (r + 1) % roles.length;
  }
  setTimeout(type, deleting ? 40 : 80);
}
type();

// Nav: scroll state, progress bar, back-to-top, active link
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");
const sections = [...document.querySelectorAll("main section")];
const navLinks = [...document.querySelectorAll(".links a")];

window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (y / max) * 100 + "%";
    nav.classList.toggle("scrolled", y > 30);
    toTop.classList.toggle("show", y > 500);
    let current = sections[0].id;
    sections.forEach((s) => {
      if (y >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + current),
    );
  },
  { passive: true },
);

toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// Mobile menu
const burger = document.getElementById("burger");
const links = document.getElementById("links");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
navLinks.forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  }),
);

// Theme toggle (remembers choice)
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}
document.getElementById("theme").addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// Scroll reveal + animated skill bars
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      e.target
        .querySelectorAll(".bar i")
        .forEach((b) => (b.style.width = b.dataset.level + "%"));
      io.unobserve(e.target);
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 90 + "ms";
  io.observe(el);
});
