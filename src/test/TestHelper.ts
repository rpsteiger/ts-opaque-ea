import { rangez } from '../functionalJS/functionalJS'

export const randomPassword = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'
  const randomChar = (_: any): string => {
    const randomIndex = Math.floor(Math.random() * chars.length + 1)
    return chars[randomIndex]
  }
  return rangez(length)
    .map(randomChar)
    .reduce((acc, cv) => acc + cv)
}
