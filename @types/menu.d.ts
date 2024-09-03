import type { MenuProps } from 'antd'

export type MenuItem = Required<MenuProps>['items'][number]

export interface LevelKeysProps {
  key?: string
  children?: LevelKeysProps[]
}
