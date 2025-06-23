import { eventsData } from "../data/data.js";
window.addEventListener("DOMContentLoaded", (event) => {
  let main = document.querySelector(".eventsContainer");
  let eventsMapRes = eventsData.map((event) => CreateHelper(event));

  eventsMapRes.map((eventElement) => {
    main.appendChild(eventElement);

  });
});

function CreateHelper(event) {
    let eventContainer = document.createElement("div");
    eventContainer.className = "eventContainer";
    eventContainer.style.backgroundImage = `url(${event.image})`;
    
    
    let eventTitle = document.createElement("p");
    eventTitle.className = "eventTitle";
    eventTitle.innerText = event.title;
    
    let eventDescription = document.createElement("p");
    eventDescription.className = "eventDescription";
    eventDescription.innerText = event.description;
    
    let eventLink = document.createElement("a");
    eventLink.className = "eventLink";
    eventLink.href = event.link;
    eventLink.target = "_blank";

    let eventLinkIcon = document.createElement("img");
    eventLinkIcon.src = "./assets/icons/solar_play-bold.png";

    eventLink.appendChild(eventLinkIcon);

    let eventFooterContiner = document.createElement("div");
    eventFooterContiner.className = "eventFooterContiner";
    eventFooterContiner.appendChild(eventDescription);
    event.contentType==='video'&&eventFooterContiner.appendChild(eventLink);
    
    eventContainer.appendChild(eventTitle);
    eventContainer.appendChild(eventFooterContiner);
    
    return eventContainer;
}
