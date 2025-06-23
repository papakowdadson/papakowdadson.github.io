window.addEventListener("DOMContentLoaded", function() {
    const text = "Hi👋🏼, it's Dadson... The guy on a journey to Software Engineering!";
    const spans = {
        "Dadson": "primaryColor",
        "Software Engineering": "primaryColor"
    };
    const introHeader = document.querySelector(".typwriterContainer");
    let index = 0;
    let currentHTML = "";

    // CSS for the cursor that prevents height increase
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            position: relative;
        }
        
        .cursor::after {
            content: '';
            position: absolute;
            right: -2px;
            bottom: 0;
            height: 1.2em; /* line height */
            border-right: 2px solid;
            animation: blink 0.75s step-end infinite;
        }
        
        @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: #fff }
        }
    `;
    document.head.appendChild(style);
  
    function typeWriter() {
        if (index < text.length) {
            currentHTML += text[index];
            let displayHTML = currentHTML;
            
            for (let [word, className] of Object.entries(spans)) {
                const regex = new RegExp(word, 'g');
                displayHTML = displayHTML.replace(regex, `<span class='${className}'>${word}</span>`);
            }
            
            introHeader.innerHTML = displayHTML;
            introHeader.classList.add('cursor');
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove the cursor after typing is complete
            setTimeout(() => {
                introHeader.classList.remove('cursor');
            }, 1000);
        }
    }
  
    typeWriter();
});