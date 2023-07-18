async function sanitizeObjects<T>(obj: T): Promise<T> {
  const { stripHtml } = await import('string-strip-html')

  const sanitizedObj: T = {} as T

  for (const [key, value] of Object.entries(obj)) {
    if (
      typeof value !== 'number' &&
      typeof value !== 'boolean' &&
      typeof value !== 'object'
    ) {
      sanitizedObj[key as keyof T] = stripHtml(value).result as T[keyof T]
    }
  }

  return sanitizedObj
}

export { sanitizeObjects }
