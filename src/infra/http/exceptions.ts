import { StatusCodes } from "http-status-codes";

export function alreadyExistsError(parametro: string) {
  throw Object.assign(new Error(`${parametro} Já existe`), {
    status: StatusCodes.BAD_REQUEST,
  });
}
