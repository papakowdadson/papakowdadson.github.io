import { eventsData } from "../data/data.js";

window.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".eventsContainer");
  if (!main || !eventsData.length) return;

  let activeFilter = "All Events";
  let activeIndex = 0;

  const categories = ["All Events", ...new Set(eventsData.map(({ eventType }) => eventType))];
  const filteredEvents = () =>
    activeFilter === "All Events"
      ? eventsData
      : eventsData.filter(({ eventType }) => eventType === activeFilter);

  const header = document.createElement("div");
  header.className = "eventsHeader";
  header.innerHTML = `
    <h2>Beyond the Code</h2>
    <p>Keynotes, tech summits, hackathons, and community meetups spanning paratransit mobility, fintech APIs, cloud native, and social impact.</p>
  `;

  const stats = document.createElement("div");
  stats.className = "eventStats";
  stats.innerHTML = `
    <div class="eventStat"><strong>${eventsData.length}</strong><span>EVENTS</span></div>
    <div class="eventStat eventStatGreen"><strong>4</strong><span>SPEAKER / PITCH</span></div>
    <div class="eventStat eventStatGold"><strong>$60k+</strong><span>GRANTS &amp; WINS</span></div>
  `;

  const filters = document.createElement("div");
  filters.className = "eventFilters";
  categories.forEach((category) => {
    const filter = document.createElement("button");
    filter.className = `eventFilter${category === activeFilter ? " isActive" : ""}`;
    filter.type = "button";
    filter.textContent = category;
    filter.addEventListener("click", () => {
      activeFilter = category;
      activeIndex = 0;
      filters.querySelectorAll(".eventFilter").forEach((item) => {
        item.classList.toggle("isActive", item === filter);
      });
      renderCard();
    });
    filters.appendChild(filter);
  });

  const carousel = document.createElement("div");
  carousel.className = "eventCarousel";
  const carouselMeta = document.createElement("div");
  carouselMeta.className = "eventCarouselMeta";
  const counter = document.createElement("span");
  counter.className = "eventCounter";
  const navigation = document.createElement("div");
  navigation.className = "eventNavigation";

  ["Previous event", "Next event"].forEach((label, direction) => {
    const button = document.createElement("button");
    button.className = "eventNavigationButton";
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.innerHTML = direction === 0 ? "&#8249;" : "&#8250;";
    button.dataset.direction = direction === 0 ? "-1" : "1";
    navigation.appendChild(button);
  });
  carouselMeta.append(counter, navigation);

  const cards = document.createElement("div");
  cards.className = "eventCards";
  carousel.append(carouselMeta, cards);

  const dots = document.createElement("div");
  dots.className = "eventDots";

  function renderCard() {
    const events = filteredEvents();

    counter.innerHTML = `<strong>${String(activeIndex + 1).padStart(2, "0")}</strong><span>/ ${String(events.length).padStart(2, "0")}</span>`;
    cards.innerHTML = events.map((event) => {
      const formattedDate = new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      const tags = event.eventType.split(" & ").map((tag) => `#${tag.replace(/\s+/g, "")}`);

      return `
        <article class="eventCard">
          <div class="eventCardImage" style="background-image: url('${event.image}')">
            <span class="eventType">${event.role}</span>
            <div class="eventCardDetails"><span>⌖ ${event.location}</span><span>${formattedDate}</span></div>
          </div>
          <div class="eventCardBody">
            <span class="eventOrganization">${event.title}</span>
            <h3>${event.subtitle}</h3>
            <p>${event.description}</p>
            <div class="eventCardFooter">
              <div class="eventTags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
              <a href="${event.link}" target="_blank" rel="noreferrer">View Recap <span>→</span></a>
            </div>
          </div>
        </article>
      `;
    }).join("");
    dots.innerHTML = events
      .map((_, index) => `<button class="eventDot${index === activeIndex ? " isActive" : ""}" data-index="${index}" type="button" aria-label="Show event ${index + 1}"></button>`)
      .join("");
  }

  main.replaceChildren(header, stats, filters, carousel, dots);
  renderCard();
  bindCarousel(cards, dots, navigation, counter, () => filteredEvents(), (index) => {
    activeIndex = index;
  });
});

function bindCarousel(track, nav, navigation, counter, getEvents, setActiveIndex) {
  const updateActive = (index) => {
    setActiveIndex(index);
    const dots = nav.querySelectorAll(".eventDot");
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("isActive", dotIndex === index);
    });
    const events = getEvents();
    counter.innerHTML = `<strong>${String(index + 1).padStart(2, "0")}</strong><span>/ ${String(events.length).padStart(2, "0")}</span>`;
  };

  const scrollToCard = (index) => {
    const cards = Array.from(track.querySelectorAll(".eventCard"));
    const target = cards[index];
    if (!target) return;
    const offset = target.offsetLeft - track.offsetLeft;
    track.scrollTo({ left: offset, behavior: "smooth" });
    updateActive(index);
  };

  navigation.querySelectorAll(".eventNavigationButton").forEach((button) => {
    button.addEventListener("click", () => {
      const dots = Array.from(nav.querySelectorAll(".eventDot"));
      const cards = Array.from(track.querySelectorAll(".eventCard"));
      const currentIndex = Number(Array.from(dots).findIndex((dot) => dot.classList.contains("isActive")));
      const direction = Number(button.dataset.direction || 1);
      const nextIndex = (currentIndex + direction + cards.length) % cards.length;
      scrollToCard(nextIndex);
    });
  });

  nav.addEventListener("click", (event) => {
    const dot = event.target.closest(".eventDot");
    if (dot) scrollToCard(Number(dot.dataset.index || 0));
  });

  track.addEventListener("scroll", () => {
    const cards = Array.from(track.querySelectorAll(".eventCard"));
    if (!cards.length) return;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "16");
    const index = Math.round(track.scrollLeft / (cardWidth + gap));
    updateActive(Math.min(index, cards.length - 1));
  }, { passive: true });

  updateActive(0);
}
