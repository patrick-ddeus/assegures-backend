import { ApplicationError } from "@/protocols";

export function NoContentError(): ApplicationError {
  return {
    name: 'NoContent',
    message: 'No Result from this search'
  }
}
