import { getType, IArrayRandom, IArrayUniq, IArrayDemote, IDemoteArray } from "./index.js"

export const arrayRandom: IArrayRandom<any[]> = arr => arr.sort(() => Math.random() - 0.5);

export const arrayUniq: IArrayUniq<any[]> = arr => Array.from(new Set(arr))

export const arrayDemote: IArrayDemote<IDemoteArray<any>> = (arr, result = []) => {
    arr.forEach(i => getType(i) === "array" ? arrayDemote(i, result) : result.push(i))
    return result;
}