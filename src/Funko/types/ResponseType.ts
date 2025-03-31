import { Funko } from "../models/Funko.js";

export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
    message: string;
    funkoPops?: Funko[];
  };
  