import fs from "fs";
import path from "path";

/**
 * Función que obtiene los argumentos de la línea de comandos y valida su cantidad.
 */
function obtenerArgumentos(): void {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Uso: node logContador.js <archivo> <palabra clave>");
    process.exit(1);
  }

  const rutaArchivo = args[0];
  const palabraClave = args[1].toUpperCase();
  procesarArchivo(rutaArchivo, palabraClave);
}

/**
 * Función que lee un archivo y cuenta las ocurrencias de una palabra clave.
 * \@param- rutaArchivo Ruta del archivo a leer.
 * \@param- palabraClave Palabra clave a buscar.
 */
function procesarArchivo(rutaArchivo: string, palabraClave: string): void {
  const rutaResuelta = path.resolve(rutaArchivo);

  fs.readFile(rutaResuelta, "utf8", (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo: ${err.message}`);
      process.exit(1);
    }

    contarOcurrencias(data, palabraClave);
  });
}

/**
 * Función que cuenta cuántas veces aparece una palabra clave en un texto.
 * \@param- contenido Contenido del archivo.
 * \@param- palabraClave Palabra clave a buscar.
 */
function contarOcurrencias(contenido: string, palabraClave: string): void {
  if (!contenido.trim()) {
    console.warn("El archivo está vacío.");
    process.exit(1);
  }

  const ocurrencias = contenido.split("\n").filter((line) => line.includes(palabraClave)).length;
  console.log(`La palabra clave "${palabraClave}" aparece ${ocurrencias} veces en el archivo.`);
}

/**
 * Función principal que inicia el programa.
 */
function main(): void {
  obtenerArgumentos();
}

main();
