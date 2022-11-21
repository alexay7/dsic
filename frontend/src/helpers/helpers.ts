function keyValueStringToObj (str: string): Record<string, unknown> {
  const arr = str.split(';')
  const obj: Record<string, unknown> = {}
  arr.forEach((value) => {
    const equalSignPos = value.indexOf('=')
    obj[value.slice(0, equalSignPos).trim()] = value.slice(equalSignPos + 1).trim()
  })
  return obj
}

export function getCookie (cookieName: string): string {
  return keyValueStringToObj(document.cookie)[cookieName] as string
}

export function setCookie (name: string, value: string | boolean, days: number): void {
  let expires = ''
  if (days !== null) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = `; expires=${date.toUTCString()}`
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`
}

export function deleteCookie (name: string): void {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
