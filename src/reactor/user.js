import cache from 'reactor/cache';
import { Obj } from 'reinforcements';
import { trans } from 'reactor/localization';
import Is from '@flk/supportive-is';

/**
 * Ignore from the given permissions the given roles
 * 
 * @param {object} permission 
 * @param {array}  
 */
export function ignoreRolesFromCrud(permission, ignoredRoles) {
    permission.roles = permission.roles.filter(permissionRole => !ignoredRoles.includes(permissionRole.name));
    return permission;
}

/**
 * Get full roles for basic crud operations  
 * 
 * @param {string} permission 
 */
export function crud(permission, singularName, rolesTypes = {}) {
    singularName = trans(singularName);

    const roles = [
        {
            text: trans('listItems', trans(permission)),
            name: 'list',
        },
        {
            text: trans('addItem', singularName),
            name: 'add',
        },
        {
            text: trans('editItem', singularName),
            name: 'edit',
        },
        {
            text: trans('removeItem', singularName),
            name: 'delete',
        },
    ];

    if (Is.array(rolesTypes)) {
        roles.push(...rolesTypes);
    } else {
        for (let key in rolesTypes) {
            roles.push({
                text: trans(key + 'Item', singularName),
                name: key,
            });
        }
    }

    return {
        text: trans(permission),
        name: permission,
        roles
    };
}

class User {
    cacheKey = 'user';
    permissions = {};

    /**
     * Constructor
     */
    constructor() {
        this.setCacheKey(this.cacheKey);
    }

    /**
     * Set cache key for user 
     * 
     * @param {string} cacheKey 
     */
    setCacheKey(cacheKey) {
        this.cacheKey = cacheKey;
        this.userData = cache.get(this.cacheKey);
    }

    /**
     * Check if user is logged in
     * 
     * @returns {boolean}
     */
    isLoggedIn() {
        return this.getAccessToken();
    }

    /**
     * Log the user in 
     * It will store the data in the storage engine i.e Local Storage
     * But will not make the ajax request
     * 
     * @param  {object} userData 
     * @returns {void}
     */
    login(userData) {
        this.userData = userData;
        cache.set(this.cacheKey, userData);
    }

    /**
     * Log the user out
     */
    logout() {
        this.userData = null;
        cache.remove(this.cacheKey);
    }

    /**
     * Get user access token
     * 
     * @returns {string}
     */
    getAccessToken() {
        return this.get('accessToken');
    }

    /**
     * Set the given value
     * 
     * @param   {string} key  
     * @param   {any} value
     */
    set(key, value) {
        Obj.set(this.userData, key, value);

        cache.set(this.cacheKey, this.userData);
    }

    /**
     * Reset user info excluding access token if not provided with the given data
     *  
     * @param {object} newInfo 
     */
    update(newInfo) {
        if (!newInfo.accessToken) {
            newInfo.accessToken = this.getAccessToken();
        }

        this.login(newInfo);
    }

    /**
     * Get value for the given key, otherwise return default value
     * 
     * @param   {string} key  
     * @param   {any} defaultValue
     * @returns {any}  
     */
    get(key, defaultValue) {
        return Obj.get(this.userData, key, defaultValue);
    }

    /**
     * Set user permissions list  
     */
    setPermissions(permissions) {
        this.permissions = permissions;
    }

    /**
     * Check if user has access to the given permission role 
     * 
     * @param {string} permission
     * @returns {boolean}
     */
    can(permission) {
        return Obj.get(this.permissions, permission) === true;
    }
}

export default new User();