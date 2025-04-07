declare type Action = 'view' | 'edit' | 'create' | 'delete'

declare type PermissionObject = {
  [key in Action]: boolean
}

declare type PermissionType = {
  [resource in ResourceList]: PermissionObject
}

declare type ResourceList =
  | 'dashboard'
  | 'trackday'
  | 'healthcheck'
  | 'track'
  | 'user_vehicle'
  | 'vehicle'
  | 'maintenance'
