import _isNil from 'lodash/isNil'

export const setLocalStorage = (name: string, data: any) => {
  localStorage?.setItem(name, JSON.stringify(data))
}

export const getLocalStorage = name => {
  const d = localStorage?.getItem(name)
  if (!d || _isNil(d)) {
    return null
  } else {
    return JSON.parse(d)
  }
}
