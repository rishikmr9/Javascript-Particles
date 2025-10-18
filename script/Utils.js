export function createEnum(obj) {
    return Object.freeze(obj);
}

export class MathUtils{
    static randomInt(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
}