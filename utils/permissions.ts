/**
 * Vérifie si une action est autorisée pour une ressource donnée
 */
export function can(permissions: PermissionType, resource: ResourceList, action: Action): boolean {
  return permissions?.[resource]?.[action] ?? false
}
