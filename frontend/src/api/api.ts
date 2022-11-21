import { getCookie } from '../helpers/helpers'

export async function anonymRequest (url: string, options: RequestInit): Promise<unknown> {
  if (!process.env.REACT_APP_API_URL) return
  const headersWithAuth = {
    'Content-Type': 'application/json'
  }
  const data = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, { ...((options.method === 'POST' || options.method === 'PATCH') && { headers: headersWithAuth }), ...options })
  if (data.status > 400) {
    throw new Error(`Error ${data.status}, algo feo ha pasado.\n${data.statusText}`)
  }
  const result = await data.json()
  return result
}

export async function loggedRequest (url: string, options: RequestInit): Promise<unknown> {
  if (process.env.REACT_APP_API_URL === undefined) return
  const token = 'Bearer ' + getCookie('token')
  const { headers, ...extraOptions } = options

  const headersWithAuth = {
    Authorization: token,
    'Content-Type': 'application/json',
    ...headers
  }
  const data = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, { headers: headersWithAuth, ...extraOptions })
  if (data.status > 399) {
    const error = await data.json()
    throw new Error(error.message)
  }
  const result = await data.json()

  if (!result || (result.statusCode && result.statusCode === 500)) {
    throw new Error(result.errorDetails.message)
  }

  return result
}
