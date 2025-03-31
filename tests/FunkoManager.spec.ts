import { describe, it, expect } from "vitest";
import { FunkoManager } from "../src/Funko/services/FunkoManager.js";
import { Funko } from "../src/Funko/models/Funko.js";
import { FunkoType } from "../src/Funko/models/FunkoType.js";
import { FunkoGenre } from "../src/Funko/models/FunkoGenre.js";

describe("FunkoManager", () => {
  const manager = new FunkoManager("testUser");
  const funko = new Funko(1, "Test Funko", "Descripción", FunkoType.Pop, FunkoGenre.VideoGames, "Franquicia", 1, false, "Brilla en la oscuridad", 50);

  it("Añadir un Funko", () => {
    manager.addFunko(funko);
    expect(manager.getFunko(1)).toEqual(funko);
  });

  it("Eliminar un Funko", () => {
    manager.removeFunko(1);
    expect(manager.getFunko(1)).toBeNull();
  });
});
