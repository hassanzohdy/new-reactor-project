import user from "user";

let roles = [];
let enablePermissions = true;
 
const permissionsObserver = {
    activate() {
        enablePermissions = true; 
    },
    deactivate() {
        enablePermissions = false; 
    },
    set(newRoles) {
        roles = roles.concat(newRoles);
    },
    list() {
        return roles;
    },
    isGranted(role) {
        return enablePermissions === false || user.can(role);
    }
};

export default permissionsObserver;