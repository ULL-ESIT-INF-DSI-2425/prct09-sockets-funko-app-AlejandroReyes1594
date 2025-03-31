import net from "net";
import chalk from "chalk";

const PORT = 60300;
const clients: net.Socket[] = [];

const server = net.createServer((socket) => {
  console.log(chalk.green("Nuevo cliente conectado"));

  clients.push(socket);
  const clientId = `Cliente-${clients.length}`;

  socket.write(JSON.stringify({ type: "server", content: `Bienvenido al chat, ${clientId}!` }) + "\n");
  broadcast(`${clientId} se ha unido al chat.`, socket);

  /**
   * Maneja los mensajes recibidos de los clientes.
   * \@param data Datos recibidos del cliente.
   */
  socket.on("data", (data) => {
    try {
      const message = JSON.parse(data.toString());

      if (message.type === "message") {
        console.log(chalk.blue(`[${message.sender}]: ${message.content}`));
        broadcast(`[${message.sender}]: ${message.content}`, socket);
      }
    } catch (error) {
      console.error(chalk.red("Error al procesar mensaje:", error));
    }
  });

  /**
   * Maneja la desconexión de un cliente.
   */
  socket.on("close", () => {
    console.log(chalk.yellow(`${clientId} se ha desconectado`));
    clients.splice(clients.indexOf(socket), 1);
    broadcast(` ${clientId} ha salido del chat.`, socket);
  });

  /**
   * Maneja los errores de conexión de un cliente.
   * \@param err Objeto de error con detalles del problema.
   */
  socket.on("error", (err) => {
    console.error(chalk.red("Error en cliente:", err.message));
  });
});

/**
 * Envía un mensaje a todos los clientes conectados, excepto al remitente.
 * \@param message Mensaje a enviar.
 * \@param sender Cliente que envió el mensaje original.
 */
function broadcast(message: string, sender: net.Socket) {
  clients.forEach((client) => {
    if (client !== sender) {
      client.write(JSON.stringify({ type: "message", sender: "Servidor", content: message }) + "\n");
    }
  });
}

/**
 * Inicia el servidor en el puerto definido.
 */
server.listen(PORT, () => {
  console.log(chalk.green(`Servidor de chat en ejecución en el puerto ${PORT}`));
});
