// Define an interface for a permission rule.
export interface RBACPermission {
    /**
     * The action that is allowed (or required) for this permission.
     * E.g., "read", "update", "delete", "manage", etc.
     */
    action: string;
  
    /**
     * The subject (resource) to which the permission applies.
     * For example: "Article", "Dashboard", or "all" if it’s global.
     */
    subject?: string;
  
    /**
     * An optional condition function that can be used to perform
     * context-based checks. It receives a context object (which can be
     * user-specific or request-specific) and returns a boolean or Promise<boolean>.
     */
    condition?: (context: any) => boolean | Promise<boolean>;
  }
  
  // Define an interface for a role element.
  export interface RBACRole {
    /**
     * The unique name of the role (e.g., "admin", "editor", "viewer").
     */
    name: string;
  
    /**
     * A list of permissions associated with this role.
     * Each permission defines what actions are allowed on which subjects.
     */
    permissions: RBACPermission[];
  
    /**
     * Optionally, a role can inherit permissions from one or more other roles.
     * Inheritance is expressed as an array of role names.
     */
    inherits?: string[];
  }
  