import { certifications } from "../data/data.js";

window.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".certificationContainer");
  if (!main) return;

  const items = certifications || [];
  const showCarousel = items.length > 3;

  if (showCarousel) {
    const carousel = document.createElement("div");
    carousel.className = "certificationTrack";
    items.forEach((certification) => carousel.appendChild(createHelper(certification)));
    main.appendChild(carousel);

    const nav = document.createElement("div");
    nav.className = "certificationNav";
    items.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "certificationNavDot";
      dot.setAttribute("aria-label", `Show certification ${index + 1}`);
      dot.dataset.index = index;
      nav.appendChild(dot);
    });
    main.appendChild(nav);

    bindCarousel(carousel, nav);
  } else {
    const grid = document.createElement("div");
    grid.className = "certificationGrid";
    items.forEach((certification) => grid.appendChild(createHelper(certification)));
    main.appendChild(grid);
  }
});

function bindCarousel(track, nav) {
  const dots = nav.querySelectorAll(".certificationNavDot");
  if (!dots.length) return;

  const cards = Array.from(track.querySelectorAll(".certificationCard"));
  const updateActive = (index) => {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  };

  const scrollToCard = (index) => {
    const target = cards[index];
    if (!target) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16");
    const offset = target.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + offset - 8, behavior: "smooth" });
    updateActive(index);
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      scrollToCard(Number(dot.dataset.index || 0));
    });
  });

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      scrollToCard(index);
    });
  });

  track.addEventListener("scroll", () => {
    const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16");
    const index = Math.round(track.scrollLeft / (cardWidth + gap));
    updateActive(Math.min(index, cards.length - 1));
  });

  updateActive(0);
}

function createHelper(certification) {
  const card = document.createElement("div");
  card.className = "certificationCard";

  const logoRow = document.createElement("div");
  logoRow.className = "certificationLogoRow";

  if (certification.certificationLogo) {
    const certLogo = document.createElement("img");
    certLogo.className = "certificationLogo certificationBadge";
    certLogo.src = certification.certificationLogo;
    certLogo.alt = `${certification.title || "Certification"} logo`;
    logoRow.appendChild(certLogo);
  }

  if (certification.issuerLogo) {
    const issuerLogo = document.createElement("img");
    issuerLogo.className = "certificationLogo certificationIssuerLogo";
    issuerLogo.src = certification.issuerLogo;
    issuerLogo.alt = `${certification.issuer || "Issuer"} logo`;
    logoRow.appendChild(issuerLogo);
  }

  const title = document.createElement("p");
  title.className = "contentHeader";
  title.innerText = certification.title || "Certification";

  const issuer = document.createElement("p");
  issuer.className = "certificationIssuer";
  issuer.innerText = certification.issuer || "Issuer";

  const footer = document.createElement("div");
  footer.className = "certificationFooter";

  const issued = document.createElement("span");
  issued.className = "certificationIssuedDate";
  issued.innerText = formatDate(certification.date || "Issued");
  footer.appendChild(issued);

  if (certification.link) {
    const link = document.createElement("a");
    link.className = "certificationLink";
    link.href = certification.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.innerHTML = '<span>View Credential</span><img src="./assets/imageicon/visitLinkActive.png" alt="Credential Link" />';
    footer.appendChild(link);
  }

  card.appendChild(logoRow);
  card.appendChild(title);
  card.appendChild(issuer);
  card.appendChild(footer);

  return card;
}

function formatDate(date) {
  if (!date) return "Issued";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
