import { FunkoType } from "./FunkoType.js";
import { FunkoGenre } from "./FunkoGenre.js";

/**
 * Representa un Funko Pop con toda su información.
 */
export class Funko {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public type: FunkoType,
    public genre: FunkoGenre,
    public franchise: string,
    public number: number,
    public exclusive: boolean,
    public specialFeatures: string,
    public marketValue: number
  ) {}
}
