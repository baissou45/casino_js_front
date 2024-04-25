export function isAuthenticated () {
    const user = localStorage.getItem('auth_user');
    if (user) {
        return true;
    } else {
        return false;
    }
};