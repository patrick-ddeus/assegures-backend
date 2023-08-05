import httpStatus from 'http-status'
import { ApplicationError } from '@/protocols'
import { Response, Request, NextFunction } from 'express'

export function errorHandler(
  error: Error | ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.name === 'NoContent') {
    return res.status(httpStatus.NO_CONTENT).json({
      error: error.message
    })
  }

  if (error.name === 'PropertiesQueryError') {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message
    })
  }

  if (error.name === 'TypesQueryError') {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message
    })
  }

  if (error.name === 'ConflictError') {
    return res
      .status(httpStatus.CONFLICT)
      .json({ error: 'Erro, imóvel com esse título já cadastrado' })
  }

  if (error.name === 'BadRequestError') {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: error.message
  })
}
