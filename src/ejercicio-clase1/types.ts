/**
 * Representa un mensaje enviado por un usuario en el chat.
 */
export interface ChatMessage {
    type: "message";  
    sender: string; 
    content: string;
  }
  
  /**
   * Representa un mensaje del servidor (notificaciones del sistema).
   */
  export interface ServerMessage {
    type: "server";  
    content: string;  
  }
  
  /**
   * Tipo de mensaje genérico que puede ser un mensaje de usuario o del servidor.
   */
  export type Message = ChatMessage | ServerMessage;
  