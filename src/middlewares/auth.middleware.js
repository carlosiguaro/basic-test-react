var res = { next: null, status: 403 };

export function auth(auth) {
    const access = localStorage.getItem('access');
    res.next = access ? true : false;
    
    return res;
};

export function unAuth(auth) {
    const access = localStorage.getItem('access');
    let res = { next: true };
    
    if (access) {
        res.next = false;
        res.redirect = '/create-member';
    }

    return res;
};