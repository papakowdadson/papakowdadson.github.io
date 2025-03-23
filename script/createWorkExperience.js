import { workExperiences } from "../data/data.js";
window.addEventListener("DOMContentLoaded", (event) => {
  //Data of Top 3 Projects
  let main = document.querySelector(".workExperienceContainer");
  let workExperiencesMapRes = workExperiences.map((workExperience) =>
    CreateHelper(workExperience)
  );
  workExperiencesMapRes.map((workExperienceElement) => {
    main.appendChild(workExperienceElement);
  });
});

function CreateHelper(workExperience) {
  let workExperienceContainer = document.createElement("div");
  workExperienceContainer.className = "workExperienceContainer";

  workExperienceContainer.innerHTML = `
    <div class="workExperienceHeader">
      <p class="position">${workExperience.position}</p>
      <p class="company">${workExperience.company}</p>
    </div>
      `;

  return workExperienceContainer;
}
