skills = [
    {name: "Python", stars: 5, icon: "nf-md-language_python"},
    {name: "Javascript", stars: 4, icon: "nf-md-language_javascript"},
    {name: "PHP", stars: 3, icon: "nf-md-language_php"},
    {name: "Bash Scripting", stars: 4, icon: "nf-md-bash"},
    {name: "Java", stars: 3.5, icon: "nf-md-language_java"},
    {name: "Linux", stars: 5, icon: "nf-md-linux"},
    {name: "SQL", stars: 4, icon: "nf-md-database"},
    {name: "Windows", stars: 4, icon: "nf-md-microsoft_windows"},
    {name: "Github", stars: 4, icon: "nf-md-github"},
    {name: "Microsoft Office", stars: 4, icon: "nf-md-microsoft_office"},
]
skills.forEach(skill => {
    let skillElement = document.createElement("div");
    skillElement.className = "skill hidden from-bottom";
    skillElement.style.transitionDelay = "100ms";
    let starContainerElement = document.createElement("p");
    starContainerElement.id = "stars";
    for (let i=skill.stars; i>0; i--) {
        let star = document.createElement('span');
        if (i==.5) star.className = "nf nf-md-star_half";
        else star.className = "nf nf-md-star";
        starContainerElement.append(star)
    }
    for (let i=0.5; i<5-skill.stars; i++) {
        let star = document.createElement('span');
        star.className = "nf nf-md-star_outline";
        starContainerElement.append(star)
    }
    skillElement.innerHTML = `<h1><span class="nf ${skill.icon}"></span>${skill.name}</h1>`
    skillElement.append(starContainerElement);
    document.querySelector("section#skills > div#skill-container").append(skillElement);
});

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('show');
        else entry.target.classList.remove('show');
    }
});

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

window.onscroll = function() {
    const goTopButton = document.getElementById("go-to-top");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) goTopButton.style.opacity = "50%";
    else goTopButton.style.opacity = "0%";
}