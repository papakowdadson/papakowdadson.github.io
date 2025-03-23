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
    
    let eventImage = document.createElement("div");
    eventImage.className = "eventImage";
    eventImage.style.backgroundSize = "cover";
    eventImage.style.backgroundRepeat = "no-repeat";
    eventImage.style.backgroundImage = `url(${event.image})`;
    
    let imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer";
    imageContainer.appendChild(eventImage);
    
    let eventTitle = document.createElement("p");
    eventTitle.className = "eventTitle";
    eventTitle.innerText = event.title;
    
    let eventDescription = document.createElement("p");
    eventDescription.className = "eventDescription";
    eventDescription.innerText = event.description;
    
    let eventDate = document.createElement("p");
    eventDate.className = "eventDate";
    eventDate.innerText = event.date;
    
    let eventLink = document.createElement("a");
    eventLink.className = "eventLink";
    eventLink.innerText = "More Info";
    eventLink.href = event.link;
    eventLink.target = "_blank";
    
    eventContainer.appendChild(imageContainer);
    eventContainer.appendChild(eventTitle);
    eventContainer.appendChild(eventDescription);
    eventContainer.appendChild(eventDate);
    eventContainer.appendChild(eventLink);
    
    return eventContainer;
}
