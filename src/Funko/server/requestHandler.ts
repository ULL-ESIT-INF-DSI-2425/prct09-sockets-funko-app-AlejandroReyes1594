import { RequestType } from '../types/RequestType.js';
import { ResponseType } from "../types/ResponseType.js";
import { FunkoManager } from '../services/FunkoManager.js';

export function handleRequest(request: RequestType, callback: (response: ResponseType) => void) {
  const manager = new FunkoManager(request.user);
  let response: ResponseType;

  switch (request.type) {
    case 'add':
      if (request.funkoPop) {
        const success = manager.addFunko(request.funkoPop);
        response = { type: 'add', success, message: success ? 'Funko añadido con éxito' : 'El Funko ya existe' };
      } else {
        response = { type: 'add', success: false, message: 'Datos del Funko no proporcionados' };
      }
      break;

    case 'update':
      if (request.funkoPop) {
        const success = manager.updateFunko(request.funkoPop);
        response = { type: 'update', success, message: success ? 'Funko actualizado con éxito' : 'El Funko no existe' };
      } else {
        response = { type: 'update', success: false, message: 'Datos del Funko no proporcionados' };
      }
      break;

    case 'remove': {
        const removed = manager.removeFunko(request.funkoPop!.id);
        response = { type: 'remove', success: removed, message: removed ? 'Funko eliminado' : 'El Funko no existe' };
        break;
    }
      
    case 'list': {
        const funkos = manager.listFunkos();
        response = { type: 'list', success: true, message: 'Lista de Funkos obtenida', funkoPops: funkos };
        break;
        }
        
    case 'read': {
        const funko = manager.getFunko(request.funkoPop!.id);
        response = funko
            ? { type: 'read', success: true, message: 'Funko encontrado', funkoPops: [funko] }
            : { type: 'read', success: false, message: 'El Funko no existe' };
        break;
        }
    
    default:
      response = { type: request.type, success: false, message: 'Operación no válida' };
  }

  callback(response);
}
