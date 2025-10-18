import Particles from "./Particles.js";


const particles = new Particles(20);

/* for a custom particle element */
// let elem = document.createElement("p");
// elem.innerHTML = "*";
// particles.setParticleElem(elem);



document.addEventListener("click", (e) => {    

    let initialPosition = {x: e.clientX, y: e.clientY};

    particles.spread(initialPosition, 100);

});