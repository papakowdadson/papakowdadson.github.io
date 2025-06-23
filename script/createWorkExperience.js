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
  workExperienceContainer.className = "workExperienceItemContainer";

  workExperienceContainer.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center">
        <div style="width:20px;height:20px;background-color:#0296e9;border-radius:50%"></div>
        <v-divider style="width:2px;height:100%;background-color:#fffcfc"></v-divider>
    </div>
    <div style="width:100%">
      <div class="workExperienceHeader">
        <p class="contentHeader">${workExperience.position}</p>
      </div>
      <div style="margin-top:0.5rem;">
        ${workExperience.achievements
          .map((achievement) => {
            return `<p style="font-weight: normal">- ${achievement.achievement}</p>`;
          })
          .join("")}
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:0.5rem;  margin-bottom: 0.8rem;
">
          <p style="font-weight: semi-bold; font-size: 14px">${
            workExperience.company
          }</p>
          <p style="font-weight: semi-bold; font-size: 14px">${
            workExperience.startTime
          } - ${workExperience.endTime}</p>
      </div>
    </div>
    `;

  return workExperienceContainer;
}
