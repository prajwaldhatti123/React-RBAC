
# React RBAC Package

A fully modular, dynamic RBAC (Role-Based Access Control) package for React applications. This package lets you supply your own roles array along with a logged‑in user's role and then directly use a permission checker function—without extra boilerplate. It’s built with TypeScript to ensure type safety and ease of integration.

## Features

- **Modular Design:**  
  Wrap your app with an `RBACProvider` that accepts a roles array and the current user’s role.

- **Dynamic Permission Checking:**  
  Define your own role definitions and permissions. The package performs exact, dynamic checks without hardcoded defaults.

- **Direct API Usage:**  
  Import and call the `canAccess` function directly in your components—no need to extract it from a custom hook.

- **TypeScript Support:**  
  Strongly typed interfaces for roles and permissions help maintain a robust, scalable codebase.

## Installation

Install via npm:

```bash
npm install your-rbac-package
```

Or via Yarn:

```bash
yarn add your-rbac-package
```

## Usage

### 1. Define Your Roles Array

Create your own roles array that conforms to the `RBACRole` interface. For example:

```tsx
// roles.ts
import { RBACRole } from 'your-rbac-package';

export const roles: RBACRole[] = [
  {
    name: 'admin',
    permissions: [
      { action: 'delete', subject: 'Article' },
      { action: 'update', subject: 'Article' },
    ],
    inherits: ['editor']
  },
  {
    name: 'editor',
    permissions: [
      { action: 'update', subject: 'Article' },
      { action: 'read', subject: 'Article' },
    ],
    inherits: ['viewer']
  },
  {
    name: 'viewer',
    permissions: [
      { action: 'read', subject: 'Article' }
    ]
  }
];
```

### 2. Wrap Your App with RBACProvider

Supply both the `roles` array and the `currentRole` (the logged‑in user's role) to the provider.

```tsx
// App.tsx
import React from 'react';
import { RBACProvider } from 'your-rbac-package';
import { roles } from './roles';
import Dashboard from './Dashboard';

export const App: React.FC = () => {
  // Assume the logged-in user has the role 'editor'
  return (
    <RBACProvider roles={roles} currentRole="editor">
      <Dashboard />
    </RBACProvider>
  );
};
```

### 3. Check Permissions Directly with canAccess

Import the `canAccess` function in any component and use it directly to determine if an action on a subject is allowed.

```tsx
// Dashboard.tsx
import React from 'react';
import { canAccess } from 'your-rbac-package';

const Dashboard: React.FC = () => {
  // Directly check if the current role permits 'update' on 'Article'
  const allowedToUpdate = canAccess('update', 'Article');

  return (
    <div>
      {allowedToUpdate ? (
        <p>You have permission to update the article.</p>
      ) : (
        <p>Access denied: You cannot update the article.</p>
      )}
    </div>
  );
};

export default Dashboard;
```

## API

### RBACProvider

The `RBACProvider` is a React Context provider that accepts two props:
- **roles:** An array of role definitions conforming to the `RBACRole` interface.
- **currentRole:** A string representing the logged‑in user’s role (which should be one of the names in the provided roles array).

### canAccess

```ts
canAccess(action: string, subject: string, checkContext?: any): boolean
```

- **action:** The action to check (e.g., "read", "update", "delete").
- **subject:** The resource (e.g., "Article").
- **checkContext:** Optional context for evaluating dynamic conditions.
- **Returns:** `true` if the permission is granted based on the current role’s permissions; otherwise, `false`.

## Contributing

Contributions are welcome! If you’d like to improve the package or fix any issues, please open an issue or submit a pull request on [GitHub](https://github.com/your-repo-link).

## License

This project is licensed under the [MIT License](LICENSE) , Copyright © 2025-present Prajwal Dhatti.

## Acknowledgments

This package was inspired by existing RBAC solutions and is designed to offer a lightweight, modular authorization approach for React applications.

---