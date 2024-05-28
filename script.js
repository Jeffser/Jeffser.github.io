skills = [
    {name: "Python", stars: 5, icon: "nf-md-language_python"},
    {name: "Javascript", stars: 4, icon: "nf-md-language_javascript"},
    {name: "PHP", stars: 3, icon: "nf-md-language_php"},
    {name: "Bash Scripting", stars: 4, icon: "nf-md-bash"},
    {name: "Java", stars: 3, icon: "nf-md-language_java"},
    {name: "Linux", stars: 5, icon: "nf-md-linux"},
    {name: "SQL", stars: 4, icon: "nf-md-database"},
    {name: "Windows", stars: 4, icon: "nf-md-microsoft_windows"},
    {name: "Github", stars: 4, icon: "nf-md-github"},
    {name: "Microsoft Office", stars: 4, icon: "nf-md-microsoft_office"},
]
skills.forEach(skill => {
    let skillElement = document.createElement("div");
    skillElement.className = "skill";
    let starContainerElement = document.createElement("p");
    starContainerElement.id = "stars";
    for (let i=skill.stars; i>0; i--) {
        let star = document.createElement('span');
        star.className = "nf nf-md-star";
        starContainerElement.append(star)
    }
    for (let i=0.5; i<5-skill.stars; i++) {
        let star = document.createElement('span');
        star.className = "nf nf-md-star_outline";
        starContainerElement.append(star)
    }
    skillElement.innerHTML = `<h2 class="abril-fatface-regular"><span class="nf ${skill.icon}"></span>${skill.name}</h2>`
    skillElement.append(starContainerElement);
    document.querySelector("section#skills > div#skills").append(skillElement);
});
repositories = [
    {name: "Hyprccin", url: "https://github.com/jeffser/hyprccin", description: "My config files and scripts for Hyprland"},
    {name: "Website", url: "https://github.com/Jeffser/Jeffser.github.io", description: "The code for this website and older versions"},
    {name: "Java Store Demo", url: "https://github.com/JeffryFidelitas/portafolioJeffryEduarte/tree/main/tienda_Jeffry_Eduarte_Rojas", description: "Java backend web store demo using Springframework and SQL"},
    {name: "Emulation Website Demo", url: "https://github.com/JeffryFidelitas/ProyectoDesarrolloWeb", description: "Emulation website project for my web development class"},
    {name: "Alpaca", url: "https://github.com/Jeffser/Alpaca", description: "An Ollama client using GTK and Adwaita"}
]
repositories.forEach(repo => {
    let repoElement = document.createElement("a");
    repoElement.className = "repo";
    repoElement.innerHTML = `<h2 class="abril-fatface-regular">${repo.name}</h2><p>${repo.description}</p>`;
    repoElement.href = repo.url;
    document.querySelector("section#repos > div#repos").append(repoElement);
});
function showModal(content) {
    console.log(content)
    let modal = document.querySelector("section#modal");
    modal.style.display = "flex";
    let modalContent = document.querySelector("section#modal div#content");
    modalContent.innerHTML = content;
}