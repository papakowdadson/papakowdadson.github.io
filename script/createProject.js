// For Creating Top projects in main profile
window.addEventListener("DOMContentLoaded", (event) => {
  //Data of all Projects
  const projectsData = [
    {
      title: "Trofare",
      image: "./assets/imageicon/Trofare.jpeg",
      type: "Mobile",
      description: "Trofare aims at digitizing public transportation in developing countries ( Africa ). \n Trofare is developing an intelligent public transportation network aimed at enhancing commuters' efficiency, alleviating traffic congestion, minimizing wait times, enhancing road safety, and lowering pollution levels, particularly CO2 and CO emissions via ride-sharing.",
      appLink: {
        name: "Trofare",
        url: "https://play.google.com/store/apps/details?id=com.aimscommunity.trofare",
      },
      tools: ["Flutter", "Nodejs", "MongoDb", "Firebase","Reactjs"],
      otherLink: [
        {
          name: "Trofare",
          url: "https://play.google.com/store/apps/details?id=com.aimscommunity.trofare",
        },
        {
          name: "Trofare Admin",
          url: "https://play.google.com/store/apps/details?id=com.aimscommunity.trofareAdmin",
        },
        {
          name: "Trofare Driver",
          url: "https://play.google.com/store/apps/details?id=com.aimscommunity.trofare",
        },
        {
          name: "Trofare Intercity",
          url: "https://play.google.com/store/apps/details?id=com.aimscommunity.trofare",
        },
      ],
    },
    {
      title: "SalvageMe",
      image: "./assets/imageicon/SalvageMeLanding.JPG",
      type: "Web",
      description: "SalvageMe is a dedicated NGO focused on promoting literacy, education, and environmental conservation through its innovative approach.\n By collecting, refurbishing and redistributing new and gently used educational materials, including physical books and e-books, we aim to lower the rate of new book production, thus helping to conserve trees and mitigate carbon emissions associated with book production and disposal.",
      appLink: { name: "SalvageMe", url: "https://salvage-me.vercel.app/" },
      tools: ["React", "Nodejs"],
      otherLink: [
        { name: "Ayoba", url: "www.google.com" },
        { name: "Dashboard", url: "https://salvage-me-admin.vercel.app/" },
      ],
    },
    {
      title: "C-Auth",
      image: "./assets/imageicon/cAuth.JPG",
      type: "Web",
      description: "A Smart Contract for awarding government projects and payment.",
      appLink: { name: "C-Auth", url: "https://c-auth.vercel.app/" },
      tools: ["React", "Nodejs", "Solidity"],
      otherLink: [
        {
          name: "C-Auth",
          url: "https://c-auth.vercel.app/",
        },
      ],
    },
  ];
  
  const langauageColors = ['#0296E9','#BB02E9','#E90202','#E94702','#14FD07','#02D9E9'] //Colors for language or framework used


  let main = document.querySelector(".profileMain");

  let projectsDataMapRes = projectsData.map((project) => CreateHelper(project));

  projectsDataMapRes.map((projectElement) => {
    main.appendChild(projectElement);
  });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-myproject');
          observer.unobserve(entry.target); // Stop observing once faded in
        }
      });
    });
  
    const fadeElements = document.querySelectorAll('.myProject');
    fadeElements.forEach(element => {
      observer.observe(element);
    });



  function CreateHelper(project) {
    let projectImage = document.createElement("div");
    projectImage.className = "projectImage";
    projectImage.classList.add(`${project.type == "Mobile" ?"imageMobile":"imageWeb"}`)
    projectImage.style.backgroundSize = "cover";
    projectImage.style.backgroundRepeat = "no-repeat";
    projectImage.style.backgroundImage = `url(${project.image})`;

    let imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer";
    imageContainer.appendChild(projectImage);

    let projectTitle = document.createElement("p");
    projectTitle.className = "projectTitle";
    projectTitle.innerText = project.title;

    let projectType = document.createElement("div");
    projectType.className = "projectType";
    projectType.innerHTML = `${project.type} App`;

    let _contentHeader1 = document.createElement("p");
    _contentHeader1.className = "contentHeader";
    _contentHeader1.innerText = "Application Description";

    let projectDescriptionContent = document.createElement("p");
    projectDescriptionContent.className = "projectDescriptionContent";
    projectDescriptionContent.innerText = project.description;

    let _projectInnerContainer1 = document.createElement("div");
    _projectInnerContainer1.className = "projectInnerContainer";

    _projectInnerContainer1.appendChild(_contentHeader1);
    _projectInnerContainer1.appendChild(projectDescriptionContent);

    let _contentHeader2 = document.createElement("p");
    _contentHeader2.className = "contentHeader";
    _contentHeader2.innerText = "Application Link";

    let projectLinkVisitIcon = document.createElement("img");
    projectLinkVisitIcon.src = "./assets/imageicon/visitLinkActive.png";
    projectLinkVisitIcon.width=16

    let projectLink = document.createElement("a");
    projectLink.className = "projectLink";
    projectLink.href = project.appLink.url;
    projectLink.innerHTML = 'View Application';
    projectLink.append(projectLinkVisitIcon)

    let _projectInnerContainer2 = document.createElement("div");
    _projectInnerContainer2.className = "projectInnerContainer";

    _projectInnerContainer2.appendChild(_contentHeader2);
    _projectInnerContainer2.appendChild(projectLink);

    let _contentHeader3 = document.createElement("p");
    _contentHeader3.className = "contentHeader";
    _contentHeader3.innerText = "Tools:";

    let projectListMapRes = project.tools.map((tool,index) => toolsHelper(tool,index));

    let projectList1 = document.createElement("div");
    projectList1.className = "projectList";
    projectListMapRes.forEach((element) => {
      projectList1.appendChild(element);
    });

    let _projectInnerContainer4 = document.createElement("div");
    _projectInnerContainer4.className = "projectInnerContainer";
    _projectInnerContainer4.classList.add("hideContent");
    _projectInnerContainer4.appendChild(_contentHeader3);
    _projectInnerContainer4.appendChild(projectList1);

    let _contentHeader4 = document.createElement("p");
    _contentHeader4.className = "contentHeader";
    _contentHeader4.innerText = "Other Links:";

    let otherLinksMapRes = project.otherLink.map((other) =>
      otherLinksHelper(other)
    );

    let projectList2 = document.createElement("div");
    projectList2.className = "projectList";
 
    otherLinksMapRes.forEach((element) => {
        projectList2.appendChild(element);
    });

    let _projectInnerContainer3 = document.createElement("div");
    _projectInnerContainer3.className = "projectInnerContainer";

    _projectInnerContainer3.classList.add("hideContent");    
    _projectInnerContainer3.appendChild(_contentHeader4);
    _projectInnerContainer3.appendChild(projectList2);



    let toggle = false;
    const viewMore = document.createElement("p");
    viewMore.classList.add("viewMore");
    viewMore.innerText = "View More";
    viewMore.addEventListener("click", (e) => {
      e.preventDefault();

      toggle = !toggle;

      if (toggle) {
        _projectInnerContainer4.classList.remove("hideContent");
        _projectInnerContainer3.classList.remove("hideContent");
        viewMore.innerText = "View Less";

      } else {
        _projectInnerContainer4.classList.add("hideContent");
        _projectInnerContainer3.classList.add("hideContent");
        viewMore.innerText = "View More";
      }
    });

    let _contentContainer = document.createElement("div");
    _contentContainer.className = "contentContainer";
    _contentContainer.appendChild(projectTitle);
    _contentContainer.appendChild(projectType);
    _contentContainer.appendChild(_projectInnerContainer1);
    _contentContainer.appendChild(_projectInnerContainer2);
    _contentContainer.appendChild(_projectInnerContainer4);
    _contentContainer.appendChild(_projectInnerContainer3);
    _contentContainer.appendChild(viewMore);

    let projectContainer = document.createElement("div");
    projectContainer.className = "myProject";

    projectContainer.appendChild(imageContainer);
    projectContainer.appendChild(_contentContainer);
    
    let projectBackgroundImageContainer = document.createElement("div");
    projectBackgroundImageContainer.style.backgroundSize = "cover";
    projectBackgroundImageContainer.style.backgroundRepeat = "no-repeat";
    projectBackgroundImageContainer.style.backgroundImage = `url(${project.image})`;
    projectBackgroundImageContainer.appendChild(projectContainer);
    projectBackgroundImageContainer.className="myProjectBackground";




    return projectBackgroundImageContainer;
  }

  function toolsHelper(tool,index) {
    let ligther = document.createElement("div");
    ligther.className = "ligther";
    ligther.style.backgroundColor=langauageColors[index%6]
    let p = document.createElement("p");
    p.innerText = tool;
    let projectToolItem = document.createElement("div");
    projectToolItem.className = "projectToolItem";
    projectToolItem.appendChild(ligther);
    projectToolItem.appendChild(p);
    return projectToolItem;
  }

  function otherLinksHelper(other) {
    let visitIcon = document.createElement("img");
    visitIcon.src = "./assets/imageicon/visitLinkActive.png";
    let link = document.createElement("a");
    link.href = other.url;
    link.innerHTML = other.name;
    link.appendChild(visitIcon);
    link.style.display='flex';
    link.style.alignItems='center';
    

    let projectOtherLinkItem = document.createElement("div");
    projectOtherLinkItem.className = "projectOtherLinkItem";
    projectOtherLinkItem.appendChild(link);

    return projectOtherLinkItem;
  }
});
