exports.authenticateUser = function(email, password) {
    console.log('[authenticate] Starting auth for ' + email + ' with password ' + password);

    if (email === 'gregs@tcias.co.uk' && password === 'test') {
        return true;
    } else {
        return false;
    }
};