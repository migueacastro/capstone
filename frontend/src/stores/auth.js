import { goto } from "$app/navigation";
import { env } from "$env/dynamic/public";
import { writable } from 'svelte/store';

export const user = writable({name: null, email: null, is_superuser: null, is_staff:null})
export const authenticated = writable(false);
export const userInitials = writable('');

// In case a page needs authorization, put our little friend in onMount() :)
export const onlyAuthenticated = async () => {
    try {
        const response = await fetch(`${env.PUBLIC_BACKEND_URL}/user`, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
			await setAuthData(data); // In case it retrieves the user info, just set it true
            return true;
        } else {
            await goto('/login'); // Otherwise, set it to false
            return false;
        }
    } catch (error) {
        await goto('/login');
        return false;
    }
}


// In case a page needs you to be Staff, put our little friend in onMount() :)
export const onlyStaff = async (userData) => {
    await authenticateUser();
    await onlyAuthenticated();
    if (!userData.is_staff) {
        await goto('/');
    }
}


// In case a page needs you to be Admin, put our little friend in onMount() :)
export const onlyAdmin = async (userData) => {
    await authenticateUser();
    await onlyAuthenticated();
    if (!(userData.is_superuser && userData.is_staff) || !await onlyAuthenticated()) {
        await goto('/');
    }
}


export const authenticateUser = async () => {
    try {
        const response = await fetch(`${env.PUBLIC_BACKEND_URL}/user`, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
			setAuthData(data); // In case it retrieves the user info, just set it true
        } else {
            unauthenticateUser(); // Otherwise, set it to false
        }
    } catch (error) {
        unauthenticateUser();
    }
}

// Use the serializers data and put it inside of user object
export const setAuthData = (value) => {
    user.set(value);
    authenticated.set(true);
}

export const unauthenticateUser = () => {
    user.set({name: null, email: null, is_staff: false, is_superuser: false})
    authenticated.set(false);
}
