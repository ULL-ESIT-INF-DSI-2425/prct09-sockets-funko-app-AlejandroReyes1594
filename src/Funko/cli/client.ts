import * as net from 'net';
import { RequestType } from '../types/RequestType.js';
import { ResponseType } from '../types/ResponseType.js';
import chalk from 'chalk';

export class FunkoClient {
  private client: net.Socket;

  constructor(private host: string, private port: number) {
    this.client = new net.Socket();
  }

  sendRequest(request: RequestType) {
    this.client.connect(this.port, this.host, () => {
      console.log(chalk.blue(`Conectado al servidor en ${this.host}:${this.port}`));
      console.log(chalk.blue(`Enviando solicitud: ${JSON.stringify(request)}`));
      this.client.write(JSON.stringify(request));
    });

    this.client.on('data', (data) => {
      try {
        const response: ResponseType = JSON.parse(data.toString());
        console.log(chalk.blue('Respuesta recibida del servidor:'));
        console.log(response);

        if (response.success) {
          console.log(chalk.green(response.message));
          if (response.funkoPops) {
            response.funkoPops.forEach((funko) => console.log(funko));
          }
        } else {
          console.log(chalk.red(response.message));
        }
      } catch (error) {
        console.log(chalk.red('Error al procesar la respuesta del servidor:', error.message));
      }
    });

    this.client.on('error', (err) => {
      console.log(chalk.red(`Error: ${err.message}`));
    });

    this.client.on('close', () => {
      console.log(chalk.yellow('Conexión cerrada.'));
    });
  }
}
