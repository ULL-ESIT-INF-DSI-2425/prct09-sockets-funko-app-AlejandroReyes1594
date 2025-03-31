import net from "net";
import readline from "readline";
import { Message, ChatMessage } from "./types.js";
import chalk from "chalk";

const PORT = 60300;
const client = new net.Socket();

/**
 * Configura la interfaz de lectura para la entrada del usuario.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Conecta el cliente al servidor y solicita el nombre de usuario.
 */
client.connect(PORT, "127.0.0.1", () => {
  console.log(chalk.green("Conectado al servidor de chat"));

  rl.question(chalk.cyan("Introduce tu nombre: "), (name) => {
    console.log(chalk.cyan(`¡Bienvenido, ${name}! Escribe mensajes para enviarlos.`));

    /**
     * Escucha la entrada del usuario y envía mensajes al servidor.
     * \@param input Mensaje ingresado por el usuario.
     */
    rl.on("line", (input) => {
      const message: ChatMessage = {
        type: "message",
        sender: name,
        content: input
      };
      client.write(JSON.stringify(message));
    });
  });
});

/**
 * Maneja los mensajes recibidos del servidor.
 * \@param data Datos recibidos en formato JSON.
 */
client.on("data", (data) => {
  try {
    const message: Message = JSON.parse(data.toString());

    if (message.type === "server") {
      console.log(chalk.gray(` ${message.content}`));
    } else if (message.type === "message") {
      console.log(chalk.blue(`[${message.sender}]: ${message.content}`));
    }
  } catch (error) {
    console.error(chalk.red("Error al procesar mensaje:", error));
  }
});

/**
 * Maneja la desconexión del cliente.
 */
client.on("close", () => {
  console.log(chalk.yellow("Desconectado del servidor"));
  process.exit(0);
});

/**
 * Maneja errores de conexión del cliente.
 * \@param err Objeto de error con información del problema.
 */
client.on("error", (err) => {
  console.error(chalk.red("Error de conexión:", err.message));
});
