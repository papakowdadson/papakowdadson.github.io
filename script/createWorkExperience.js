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
        <v-divider style="width:2px;height:100%;background-color:#676767"></v-divider>
    </div>
    <div style="width:100%">
      <div class="workExperienceHeader">
        <p class="contentHeader">${workExperience.position}</p>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:0.5rem;">
          <p style="font-weight: semi-bold; font-size: 1em; color: #0296e9">${
            workExperience.company
          }</p>
          <p style="font-weight: semi-bold; font-size: 1em; color: #676767">${
            workExperience.startTime
          } - ${workExperience.endTime}</p>
      </div>
      <div style="margin-top:0.5rem; margin-bottom: 1.5rem;">
        ${workExperience.achievements
          .map((achievement) => {
            return `
            <div style="display:flex;flex-direction:row;align-items:flex-start;margin-bottom: 0.5rem;">
              <span style="
                      display: inline;
                      margin-right: 0.4rem;
                      color: #0296e9;"> >
               </span>

              <div style="
              font-weight: normal;
              line-height: 1.6;
              ">
               ${achievement.achievement} 
              ${
                achievement.project
                  ? `
                    <span style="
                      display: inline;
                      margin-left: 0.4rem;
                      padding: 0.2rem 0.5rem;
                      background-color: #0294e93e;
                      color: #0296e9;
                      border: 1px solid #0296e9;
                      border-radius: 10px;
                      font-size: 0.8rem;
                      font-weight: 500;
                      white-space: nowrap;
                    ">
                      ${achievement.project}
                    </span>
                    `
                    : ""
                }
              </div>
            </div>
            
              `;
          })
          .join("")}
      </div>    
    </div>
    `;

  return workExperienceContainer;
}
