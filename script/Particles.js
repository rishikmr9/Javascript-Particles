import { MathUtils } from "./Utils.js";





export default class Particles{
    
    particles;
    #particleElem;



    /**
     * Create particle effects.
     * 
     * Create a *div* element with *visuals_layer* class in our html
     * and give these css rules to it in your stylesheet.
     * ```css
     * .visuals_layer{
     *     position: fixed;
     *     width: 100%;
     *     height: 100%;
     *     top: 0;
     *     left: 0;
     *     z-index: 100;
     *     pointer-events: none;
     * }
     * ```
     * @param {number} particlesAmt amount of particles
     */
    constructor(particlesAmt = 1){
        this.particles = particlesAmt;
        
        // default particle element
        this.#particleElem = document.createElement("div");
        this.#particleElem.classList.add("particle");

    }




    createParticleElem(){        
        return this.#particleElem.cloneNode(true);
    }





    /**
     * Get displacement position(x, y) from a given inital position
     * @param {number} direction the angle representing the direction
     * @param {number} length the distance from a starting point
     * @returns an object with x and y value
     */
    getDisplacement(direction, length, initPosition){

        const angle = direction;
        const hypoteneus = length;

        /* apply the trygonometric equation to find x(adjacent) and y(opposite) */
        // x: opposite = sin A * hypoteneus
        // y: odjacent = cos A * hypoteneus
        const x = initPosition.x + Math.sin(angle) * hypoteneus; 
        const y= initPosition.y + Math.cos(angle) * hypoteneus; 

        return {x, y};

    }





    getVisualLayer(){
        return document.querySelector(".visuals_layer");
    }




    /**
     * Set your own custom particle element.
     * This method adds a ***.particle*** css class to the element.
     * Make sure to add a ***.particle*** css class with atleast these css rules in your stylesheet:
     * ```css
     * .particle{
     *     position: absolute;
     *     top: 0;
     *     left: 0;
     *     width: 3px;
     *     height: 3px;
     *  }
     * ```
     * @param {HTMLElement} elem 
     */
    setParticleElem(elem){
        elem.classList.add("particle");
        return this.#particleElem = elem;
    }





    spread(initPosition, spreadLength){

        let visualLayer = this.getVisualLayer();        

        for (let i = 0; i < this.particles; i++) {

            /* generate a random length, direction and speed for the particle */

            let direction = MathUtils.randomInt(0, 360);

            // length should be between spreadLength and half of spreadLength
            let length = MathUtils.randomInt(spreadLength/2, spreadLength);

            // speed = animation duration
            let speed = MathUtils.randomInt(5, 6);



            let particle = this.createParticleElem();
            visualLayer.appendChild(particle);

            
            
            let position = this.getDisplacement(direction, length, initPosition);

            let tl = gsap.timeline({defaults: {duration: speed, ease: "power3.out"}});

            tl.fromTo(particle, {

                x: initPosition.x,
                y: initPosition.y,
                opacity: 1,
                
            },{
                
                x: position.x,
                y: position.y,
                opacity: 0,

            }).eventCallback("onComplete", (e) => {
                visualLayer.removeChild(particle);
            });
            
            
        }


    }

}