// src/canAccess.ts

import { useContext } from 'react';
import { RBACContext } from './RBACContext';

/**
 * Checks if the current user's role (from RBACProvider) has permission to perform a given action on a subject.
 *
 * This function is meant to be imported and called directly in a React component,
 * provided that the component is wrapped within an RBACProvider.
 *
 * @param action - The action to check (e.g., 'read', 'update').
 * @param subject - The resource subject (e.g., 'Article').
 * @param checkContext - Optional context for condition evaluation.
 * @returns true if the permission is granted; false otherwise.
 */
export function canAccess(action: string, subject: string, checkContext?: any): boolean {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('canAccess must be used within an RBACProvider');
  }
  const { roles, currentRole } = context;
  // Find the role definition that matches the currentRole.
  const roleDef = roles.find(r => r.name === currentRole);
  if (!roleDef) return false;
  // Check each permission in the role.
  return roleDef.permissions.some(permission => {
    // Dynamic check: only match if the permission's action equals the given action.
    const actionMatch = permission.action === action;
    // Similarly, check the subject exactly.
    const subjectMatch = permission.subject === subject;
    if (actionMatch && subjectMatch) {
      // If a condition is provided, evaluate it with checkContext.
      if (permission.condition && checkContext !== undefined) {
        return permission.condition(checkContext);
      }
      return true;
    }
    return false;
  });
}
