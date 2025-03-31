import chalk from "chalk";

/**
 * Funciones auxiliares para formatear salida con `chalk`.
 */
export const formatSuccess = (message: string) => chalk.green(message);
export const formatError = (message: string) => chalk.red(message);
export const formatFunkoValue = (value: number) => {
  if (value > 100) return chalk.green(value);
  if (value > 50) return chalk.yellow(value);
  if (value > 20) return chalk.blue(value);
  return chalk.red(value);
};
