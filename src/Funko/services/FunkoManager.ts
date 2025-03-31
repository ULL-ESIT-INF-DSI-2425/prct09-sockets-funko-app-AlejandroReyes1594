import fs from "fs";
import path from "path";
import { Funko } from "../models/Funko.js";

/**
 * Clase que maneja la gestión de Funkos en archivos JSON.
 */
export class FunkoManager {
  private userDir: string;

  constructor(private username: string) {
    this.userDir = path.join("data", username);
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
  }

  private getFunkoFilePath(id: number): string {
    return path.join(this.userDir, `${id}.json`);
  }

  addFunko(funko: Funko): void {
    const filePath = this.getFunkoFilePath(funko.id);
    if (fs.existsSync(filePath)) {
      console.log("Error: El Funko ya existe.");
      return;
    }
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
    console.log("Funko añadido correctamente.");
  }

  updateFunko(funko: Funko): void {
    const filePath = this.getFunkoFilePath(funko.id);
    if (!fs.existsSync(filePath)) {
      console.log("Error: El Funko no existe.");
      return;
    }
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
    console.log("Funko actualizado correctamente.");
  }

  removeFunko(id: number): void {
    const filePath = this.getFunkoFilePath(id);
    if (!fs.existsSync(filePath)) {
      console.log("Error: El Funko no existe.");
      return;
    }
    fs.unlinkSync(filePath);
    console.log("Funko eliminado correctamente.");
  }

  listFunkos(): Funko[] {
    if (!fs.existsSync(this.userDir)) {
      return []; // Evita error si no hay datos
    }
    const files = fs.readdirSync(this.userDir);
    return files.map((file) => {
      const filePath = path.join(this.userDir, file);
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });
  }
  

  getFunko(id: number): Funko | null {
    const filePath = this.getFunkoFilePath(id);
    if (!fs.existsSync(filePath)) {
      console.log("Error: El Funko no existe.");
      return null;
    }
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
}
