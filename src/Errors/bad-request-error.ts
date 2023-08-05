import { ApplicationError } from '@/protocols'

export function badRequestError(): ApplicationError {
  return {
    message: 'Something went wrong, bad request',
    name: 'BadRequestError'
  }
}
