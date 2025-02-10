// src/RBACContext.tsx

import React, { createContext, useContext } from 'react';
import { RBACRole } from './types';

interface RBACContextProps {
  roles: RBACRole[];    // The complete roles array provided by the consumer
  currentRole: string;   // The logged-in user's role name
}

// Create the context with no default value.
export const RBACContext = createContext<RBACContextProps | undefined>(undefined);

interface RBACProviderProps {
  roles: RBACRole[];
  currentRole: string;
  children: React.ReactNode;
}

/**
 * RBACProvider supplies the roles array and the current role to the component tree.
 */
export const RBACProvider: React.FC<RBACProviderProps> = ({ roles, currentRole, children }) => {
  // Optional warning if the currentRole is not in the provided roles array.
  const availableRoleNames = roles.map(role => role.name);
  if (!availableRoleNames.includes(currentRole)) {
    console.warn(`Warning: currentRole "${currentRole}" is not found in the provided roles array.`);
  }
  return (
    <RBACContext.Provider value={{ roles, currentRole }}>
      {children}
    </RBACContext.Provider>
  );
};

/**
 * Custom hook to access the RBAC context.
 */
export const useRBACContext = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBACContext must be used within an RBACProvider');
  }
  return context;
};
