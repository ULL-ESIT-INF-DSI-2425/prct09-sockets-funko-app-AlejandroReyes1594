import fs from "fs";
import path from "path";

/**
 * Función que obtiene y valida los argumentos de la línea de comandos.
 */
function obtenerArgumentos(): void {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Uso: node jsonToCsv.js <archivo JSON de entrada> <archivo CSV de salida>");
    process.exit(1);
  }

  const inputFile = path.resolve(args[0]);
  const outputFile = path.resolve(args[1]);

  leerArchivoJson(inputFile, outputFile);
}

/**
 * Función que lee un archivo JSON y lo procesa.
 * \@param inputPath Ruta del archivo JSON de entrada.
 * \@param outputPath Ruta del archivo CSV de salida.
 */
function leerArchivoJson(inputPath: string, outputPath: string): void {
  fs.readFile(inputPath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo JSON: ${err.message}`);
      process.exit(1);
    }

    procesarJson(data, outputPath);
  });
}

/**
 * Función que convierte un JSON a CSV.
 * \@param data Contenido del archivo JSON.
 * \@param outputPath Ruta donde se guardará el archivo CSV.
 */
function procesarJson(data: string, outputPath: string): void {
  if (!data.trim()) {
    console.warn("El archivo JSON está vacío.");
    process.exit(1);
  }

  try {
    const jsonData = JSON.parse(data);

    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.warn("El JSON no tiene un formato válido.");
      process.exit(1);
    }

    const headers = Object.keys(jsonData[0]);
    const csvData = [
      headers.join(","), 
      ...jsonData.map((row) => headers.map((key) => row[key]).join(","))
    ].join("\n");

    escribirArchivoCsv(outputPath, csvData);
  } catch (parseErr) {
    console.error(`Error al parsear el JSON: ${parseErr.message}`);
    process.exit(1);
  }
}

/**
 * Función que escribe el contenido CSV en un archivo.
 * \@param outputPath Ruta del archivo CSV de salida.
 * \@param csvData Datos en formato CSV.
 */
function escribirArchivoCsv(outputPath: string, csvData: string): void {
  fs.writeFile(outputPath, csvData, "utf8", (writeErr) => {
    if (writeErr) {
      console.error(`Error al escribir el archivo CSV: ${writeErr.message}`);
      process.exit(1);
    }
    console.log(`Archivo CSV generado en: ${outputPath}`);
  });
}

/**
 * Función principal que inicia el programa.
 */
function main(): void {
  obtenerArgumentos();
}

main();

