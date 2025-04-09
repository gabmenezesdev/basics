import { StatusCodes } from "http-status-codes";

export function alreadyExistsError(parametro: string) {
  throw Object.assign(new Error(`${parametro} já existe`), {
    status: StatusCodes.CONFLICT,
  });
}

export function invalidParamError(parametro: string) {
  throw Object.assign(new Error(`${parametro} inválido`), {
    status: StatusCodes.BAD_REQUEST,
  });
}

export function dontExistError(parametro: string) {
  throw Object.assign(new Error(`${parametro} não existe`), {
    status: StatusCodes.BAD_REQUEST,
  });
}

export function operationDontAllowedError(reason: string) {
  throw Object.assign(new Error(`Não permitido, motivo: ${reason}`), {
    status: StatusCodes.BAD_REQUEST,
  });
}

export function invalidCodeException() {
  throw Object.assign(new Error(`Código inválido`), {
    status: StatusCodes.BAD_REQUEST,
  });
}

export function expiredCodeException() {
  throw Object.assign(new Error(`Código inválido`), {
    status: StatusCodes.BAD_REQUEST,
  });
}
