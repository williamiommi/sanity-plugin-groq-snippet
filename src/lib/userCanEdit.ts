import {CurrentUser} from 'sanity'
import {ROLE_ADMIN} from './constants'

export default function userCanEdit(
  currentUser: CurrentUser | null,
  restrictedRoles?: string[],
): boolean {
  if (!restrictedRoles || restrictedRoles.length === 0) return true
  let userCanFlag = false
  // split restrictedRoles in 2 Set
  const canRolesSet = new Set()
  const cannotRolesSet = new Set()
  const currentUserRolesName = currentUser?.roles.map((role) => role.name) || []
  // always adding admin to canRolesSet
  canRolesSet.add(ROLE_ADMIN)
  restrictedRoles.forEach((role) => {
    if (role.startsWith('!')) cannotRolesSet.add(role.substring(1, role.length))
    else canRolesSet.add(role)
  })

  if (canRolesSet.size !== 0) {
    const canRolesArray = Array.from(canRolesSet)
    userCanFlag = currentUserRolesName.some((role) => canRolesArray.includes(role)) || false
  }

  if (!userCanFlag && cannotRolesSet.size !== 0) {
    const cannotRolesArray = Array.from(cannotRolesSet)
    userCanFlag = currentUserRolesName.some((role) => !cannotRolesArray.includes(role)) || false
  }

  return userCanFlag
}
