function goHome(){
    document.getElementById("home").scrollIntoView();
}
function goAbout(){
    document.getElementById("about").scrollIntoView();
}
function goSkills(){
    document.getElementById("skills").scrollIntoView();
}
function goExperience(){
    document.getElementById("experience").scrollIntoView();
}
var typed = new Typed(".home-intro", {
    strings: ["Web Developer", "Python Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});