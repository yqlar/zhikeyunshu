export const setLocalStorage = (name: string, data: any) => {
    localStorage?.setItem(name, JSON.stringify(data))
}

export const getLocalStorage = (name) => {
  const d = localStorage?.getItem(name)
  if (d === null) {
    return null
  } else {
    return JSON.parse(d)
  }
}
