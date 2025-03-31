import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoManager } from "../services/FunkoManager.js";
import { Funko } from "../models/Funko.js";
import { FunkoType } from "../models/FunkoType.js";
import { FunkoGenre } from "../models/FunkoGenre.js";
import { formatSuccess } from "../utils/chalkUtils.js";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
  .command(
    "add",
    "Añadir un Funko",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
      name: { type: "string", demandOption: true },
      desc: { type: "string", demandOption: true },
      type: { type: "string", demandOption: true },
      genre: { type: "string", demandOption: true },
      franchise: { type: "string", demandOption: true },
      number: { type: "number", demandOption: true },
      exclusive: { type: "boolean", demandOption: true },
      specialFeatures: { type: "string", demandOption: false },
      marketValue: { type: "number", demandOption: true },
    },
    (argv) => {
      const manager = new FunkoManager(argv.user);
      const funko = new Funko(
        argv.id,
        argv.name,
        argv.desc,
        argv.type as FunkoType,
        argv.genre as FunkoGenre,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.specialFeatures || "", // Evita error si no se pasa
        argv.marketValue
      );
      manager.addFunko(funko);
      console.log(formatSuccess("Funko añadido con éxito!"));
    }
  )
  .command(
    "list",
    "Listar Funkos",
    { user: { type: "string", demandOption: true } },
    (argv) => {
      const manager = new FunkoManager(argv.user);
      const funkos = manager.listFunkos();
      if (funkos.length === 0) {
        console.log("No hay Funkos en la colección.");
      } else {
        console.log(`${argv.user} Funko Pop collection`);
        console.log("--------------------------------");
        funkos.forEach((funko) => {
          console.log(
            `ID: ${funko.id}\nName: ${funko.name}\nDescription: ${funko.description}\nType: ${funko.type}\nGenre: ${funko.genre}\n`
          );
          console.log("--------------------------------");
        });
      }
    }
  )
  .command(
    "read",
    "Leer un Funko",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
    },
    (argv) => {
      const manager = new FunkoManager(argv.user);
      const funko = manager.getFunko(argv.id);
      if (funko) {
        console.log(
          `ID: ${funko.id}\nName: ${funko.name}\nDescription: ${funko.description}\nType: ${funko.type}\nGenre: ${funko.genre}\n`
        );
      } else {
        console.log("Funko not found at", argv.user, "collection!");
      }
    }
  )
  .command(
    "update",
    "Actualizar un Funko",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
      name: { type: "string", demandOption: true },
      desc: { type: "string", demandOption: true },
      type: { type: "string", demandOption: true },
      genre: { type: "string", demandOption: true },
      franchise: { type: "string", demandOption: true },
      number: { type: "number", demandOption: true },
      exclusive: { type: "boolean", demandOption: true },
      specialFeatures: { type: "string", demandOption: false },
      marketValue: { type: "number", demandOption: true },
    },
    (argv) => {
      const manager = new FunkoManager(argv.user);
      const funko = new Funko(
        argv.id,
        argv.name,
        argv.desc,
        argv.type as FunkoType,
        argv.genre as FunkoGenre,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.specialFeatures || "",
        argv.marketValue
      );
      manager.updateFunko(funko);
      console.log("Funko updated at", argv.user, "collection!");
    }
  )
  .command(
    "remove",
    "Eliminar un Funko",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
    },
    (argv) => {
      const manager = new FunkoManager(argv.user);
      manager.removeFunko(argv.id);
      console.log("Funko removed from", argv.user, "collection!");
    }
  )
  .help().argv;
