import type { MenuItem } from '#types/menu'
import { defaultData } from '../constants/index.js'

export function slugify(...args: (string | number)[]): string {
  const value = args.join(' ')

  return value
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-') // separator
    .replace(/^-+|-+$/g, '') // remove start and end hyphens
}

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

export function convertToMilliseconds(chrono: string): number {
  const [minutes, seconds, milliseconds] = chrono.split('.').map(Number)
  return minutes * 60 * 1000 + seconds * 1000 + milliseconds
}

export function convertToChronoFormat(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / (60 * 1000))
  milliseconds %= 60 * 1000
  const seconds = Math.floor(milliseconds / 1000)
  milliseconds %= 1000

  return `${minutes}.${seconds}.${milliseconds}`
}

/**
 * Function for set default value in case of value is falsy
 */
export function cleanFalsyValues(data: any) {
  return data ?? defaultData
}
