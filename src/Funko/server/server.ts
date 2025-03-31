import * as net from 'net';
import { RequestType } from "../types/RequestType.js";
import { ResponseType } from '../types/ResponseType.js';
import { handleRequest } from './requestHandler.js';

const server = net.createServer((socket) => {
  let requestData = '';

  socket.on('data', (chunk) => {
    requestData += chunk.toString();
    
    console.log(` Petición recibida: ${requestData}`); 

    try {
      const request: RequestType = JSON.parse(requestData);
      
      handleRequest(request, (response: ResponseType) => {
        console.log(` Respuesta enviada: ${JSON.stringify(response, null, 2)}`); 
        socket.write(JSON.stringify(response));
        socket.end();
      });
    } catch (err) {
      console.error(` Error al procesar la petición: ${err.message}`);
      socket.write(JSON.stringify({ success: false, message: 'Error procesando la petición' }));
      socket.end();
    }
  });

  socket.on('error', (err) => {
    console.log(` Error en el servidor: ${err.message}`);
  });

  socket.on('close', () => {
    console.log(' Conexión cerrada con un cliente.');
  });
});

server.listen(4000, () => {
  console.log(' Servidor escuchando en el puerto 4000...');
});
