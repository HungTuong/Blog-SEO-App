import fetch from 'isomorphic-fetch';
import cookie, { remove } from 'js-cookie';
import { API } from '../config';

export const signup = user => {
    return fetch(`${API}/signup`, 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signin = user => {
    return fetch(`${API}/signin`, 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// remove cookie and localStorage user when sign out
export const signout = (next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return fetch(`${API}/signout`, {
        method: 'GET'
    })
    .then(response => {
        return console.log('signout success');
    })
    .catch(err => {
        console.log(err);
    })
}

//set cookie
export const setCookie = (key, value) => {
    if(process.browser){
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = (key) => {
    if(process.browser){
        cookie.remove(key, {
            expires: 1
        });
    }
};

// Get cookie
export const getCookie = (key) => {
    if(process.browser){
        return cookie.get(key);
    }
};

// localStorage
export const setLocalStorage = (key, value) => {
    if(process.browser){
        localStorage.setItem(key, JSON.stringify())
    }
}

export const removeLocalStorage = (key, value) => {
    if(process.browser){
        localStorage.removeItem(key)
    }
}

// authenticate user by passing data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    next();
};

export const isAuth = () => {
    if(process.browser){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            console.log(localStorage.getItem('user'))
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }else{
                return false;
            }
        }
    }
}

