// preview //

const inputs = {
    name: "rName",
    email: "rEmail",
    phone: "rPhone",
    linkedin: "rLinkedIn",
    github: "rGitHub",
    summary: "rSummary",
    languages: "rLanguages",
    achievements: "rAchievements"
};

Object.keys(inputs).forEach(id => {
    const input = document.getElementById(id);

    input.addEventListener("input", () => {
        document.getElementById(inputs[id]).textContent = input.value;
        saveData();
    });
});

//  Skills 

document.getElementById("skills").addEventListener("input", () => {

    let skills = document.getElementById("skills").value.split(",");

    let container = document.getElementById("rSkills");

    container.innerHTML = "";

    skills.forEach(skill => {

        if(skill.trim() !== ""){

            let badge = document.createElement("span");

            badge.className = "skill";

            badge.textContent = skill.trim();

            container.appendChild(badge);

        }

    });

    saveData();

});

//  Profile Photo 

document.getElementById("photo").addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        document.getElementById("previewPhoto").src = e.target.result;

        localStorage.setItem("photo", e.target.result);

    }

    reader.readAsDataURL(file);

});

//  Dark Mode 

document.getElementById("themeBtn").addEventListener("click", ()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
    );

});

// Local Storage

function saveData(){

    const data = {};

    Object.keys(inputs).forEach(id=>{

        data[id]=document.getElementById(id).value;

    });

    data.skills=document.getElementById("skills").value;

    localStorage.setItem(
        "resumeData",
        JSON.stringify(data)
    );

}

function loadData(){

    const saved=JSON.parse(
        localStorage.getItem("resumeData")
    );

    if(saved){

        Object.keys(saved).forEach(key=>{

            const element=document.getElementById(key);

            if(element){

                element.value=saved[key];

                element.dispatchEvent(new Event("input"));

            }

        });

    }

    const photo=localStorage.getItem("photo");

    if(photo){

        document.getElementById("previewPhoto").src=photo;

    }

    if(localStorage.getItem("theme")==="true"){

        document.body.classList.add("dark");

    }

}

loadData();

//  PDF (Placeholder)

function downloadPDF(){

    window.print();

}

// ==========================
// Add Education
// ==========================

document.getElementById("addEducation").addEventListener("click", function(){

    const container = document.getElementById("educationContainer");

    const div = document.createElement("div");

    div.className = "education";

    div.innerHTML = `
        <input class="college" placeholder="College">
        <input class="degree" placeholder="Degree">
        <input class="year" placeholder="Year">
        <button class="removeBtn">Remove</button>
    `;

    container.appendChild(div);

    updateEducation();

});

// ==========================
// Add Experience
// ==========================

document.getElementById("addExperience").addEventListener("click", function(){

    const container = document.getElementById("experienceContainer");

    const div = document.createElement("div");

    div.className = "experience";

    div.innerHTML = `
        <input class="company" placeholder="Company">
        <input class="role" placeholder="Role">
        <textarea class="expDesc" placeholder="Description"></textarea>
        <button class="removeBtn">Remove</button>
    `;

    container.appendChild(div);

    updateExperience();

});

// ==========================
// Add Project
// ==========================

document.getElementById("addProject").addEventListener("click", function(){

    const container = document.getElementById("projectContainer");

    const div = document.createElement("div");

    div.className = "project";

    div.innerHTML = `
        <input class="projectName" placeholder="Project Name">
        <textarea class="projectDesc" placeholder="Description"></textarea>
        <button class="removeBtn">Remove</button>
    `;

    container.appendChild(div);

    updateProjects();

});

// ==========================
// Update Education Preview
// ==========================

function updateEducation(){

    const preview = document.getElementById("rEducation");

    preview.innerHTML = "";

    document.querySelectorAll(".education").forEach(card=>{

        card.querySelectorAll("input").forEach(i=>{

            i.oninput = updateEducation;

        });

        const college = card.querySelector(".college").value;

        const degree = card.querySelector(".degree").value;

        const year = card.querySelector(".year").value;

        preview.innerHTML += `
            <div>
                <h3>${college}</h3>
                <p>${degree}</p>
                <small>${year}</small>
            </div><br>
        `;

    });

}

// ==========================
// Update Experience Preview
// ==========================

function updateExperience(){

    const preview = document.getElementById("rExperience");

    preview.innerHTML = "";

    document.querySelectorAll(".experience").forEach(card=>{

        card.querySelectorAll("input,textarea").forEach(i=>{

            i.oninput = updateExperience;

        });

        preview.innerHTML += `
            <div>
                <h3>${card.querySelector(".company").value}</h3>
                <strong>${card.querySelector(".role").value}</strong>
                <p>${card.querySelector(".expDesc").value}</p>
            </div><br>
        `;

    });

}

// ==========================
// Update Projects Preview
// ==========================

function updateProjects(){

    const preview = document.getElementById("rProjects");

    preview.innerHTML = "";

    document.querySelectorAll(".project").forEach(card=>{

        card.querySelectorAll("input,textarea").forEach(i=>{

            i.oninput = updateProjects;

        });

        preview.innerHTML += `
            <div>
                <h3>${card.querySelector(".projectName").value}</h3>
                <p>${card.querySelector(".projectDesc").value}</p>
            </div><br>
        `;

    });

}


// Remove Card


document.addEventListener("click",function(e){

    if(e.target.classList.contains("removeBtn")){

        e.target.parentElement.remove();

        updateEducation();

        updateExperience();

        updateProjects();

    }

});

// Initialize previews
updateEducation();
updateExperience();
updateProjects();

function updateProgress(){

    let total = 8;

    let completed = 0;

    if(document.getElementById("name").value.trim()!="") completed++;
    if(document.getElementById("email").value.trim()!="") completed++;
    if(document.getElementById("phone").value.trim()!="") completed++;
    if(document.getElementById("summary").value.trim()!="") completed++;
    if(document.getElementById("skills").value.trim()!="") completed++;
    if(document.getElementById("languages").value.trim()!="") completed++;
    if(document.getElementById("achievements").value.trim()!="") completed++;
    if(document.getElementById("linkedin").value.trim()!="") completed++;

    let percent = Math.round((completed/total)*100);

    document.getElementById("progressBar").style.width = percent + "%";

    document.getElementById("progressText").innerHTML =
        percent + "% Completed";

}

document.querySelectorAll("input,textarea").forEach(input=>{

    input.addEventListener("input",updateProgress);

});

updateProgress();