import { Funko } from "../models/Funko.js";

export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    user: string;
    funkoPop?: Funko;
  };
  