import { writable } from 'svelte/store';
import { persist, createSessionStorage } from "@macfja/svelte-persistent-store"
import { env } from '$env/dynamic/public';

export const movieStorage = writable([]);
export const cityStorage = writable([]);
export const movieAdStorage = writable([]);
export const branchStorage = writable([]);
export const roomStorage = writable([]); 
export const sessionStorage = writable([]);
export const shiftStorage = writable([]);
export const weekdayStorage = writable([]);
export const ticketTypeStorage = writable([]);
export const ticketStorage = writable([]);
export const dayDiscountStorage = writable([]);
export const billStorage = writable([]);
export const staffStorage = writable([]);


// This line gives a warning in svelte about window.sessionStorage, but it does effectively deliver
export const selectedCityStorage = persist(writable({
    id: null,
    name: null,
    on_screen_movies:null,
    branches:null
}
), createSessionStorage(), "city");

export const getMovies = async () => {

    fetch(`${env.PUBLIC_BACKEND_URL}/movies`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        movieStorage.set(data);
    })
    
};

export const getMovie = async (id) => { // Get the movie
    // Checks if there are movies inside the storage
    if (movieStorage.length) {
        return movieStorage.find(movieIterator => movieIterator.id == id);
    } else { // If there are no movies in the storage, get them from the API
        const endpoint = `${env.PUBLIC_BACKEND_URL}/movies/${id}`;
        const response = await fetch(endpoint);
        if (response.status == 200) {
            return await response.json();
        } else {
            return null;
        }
    }
}

export const getCities = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/cities`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        cityStorage.set(data);
    })
}

export const getMovieAds = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/movieads`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        movieAdStorage.set(data);
    })
}

export const getBranches = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/branches`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        branchStorage.set(data);
    })
}

export const getBranch = async (id) => { // Get the movie
    // Checks if there are movies inside the storage
    if (branchStorage.length) {
        return branchStorage.find(branchIterator => branchIterator.id == id);
    } else { // If there are no movies in the storage, get them from the API
        const endpoint = `${env.PUBLIC_BACKEND_URL}/branches/${id}`;
        const response = await fetch(endpoint);
        if (response.status == 200) {
            return await response.json();
        } else {
            return null;
        }
    }
}

export const getRooms = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/rooms`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        roomStorage.set(data);
    })
}

export const getRoom = async (id) => { 
    if (roomStorage.length) {
        return roomStorage.find(roomIterator => roomIterator.id == id);
    } else { // If there are no movies in the storage, get them from the API
        const endpoint = `${env.PUBLIC_BACKEND_URL}/rooms/${id}`;
        const response = await fetch(endpoint);
        if (response.status == 200) {
            return await response.json();
        } else {
            return null;
        }
    }
};

export const getSessions = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/sessions`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.set(data);
    })
}

export const getSession = async (id) => { 
    if (sessionStorage.length) {
        return sessionStorage.find(sessionIterator => sessionIterator.id == id);
    } else { // If there are no movies in the storage, get them from the API
        const endpoint = `${env.PUBLIC_BACKEND_URL}/sessions/${id}`;
        const response = await fetch(endpoint);
        if (response.status == 200) {
            return await response.json();
        } else {
            return null;
        }
    }
};

export const getShifts = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/shifts`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        shiftStorage.set(data);
    })
}

export const getWeekdays = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/weekdays`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        weekdayStorage.set(data);
    })
}


export const getWeekday = async (id) => { 
    if (weekdayStorage.length) {
        return weekdayStorage.find(weekdayIterator => weekdayIterator.id == id);
    } else { // If there are no movies in the storage, get them from the API
        const endpoint = `${env.PUBLIC_BACKEND_URL}/weekdays/${id}`;
        const response = await fetch(endpoint);
        if (response.status == 200) {
            return await response.json();
        } else {
            return null;
        }
    }
};

export const getDayDiscount = async (id) => {
    if (dayDiscountStorage.length) {
        return dayDiscountStorage.fint(dayDiscountIterator => dayDiscountIterator == id);

    }  else { // If there are no movies in the storage, get them from the API
        const endpoint = `${env.PUBLIC_BACKEND_URL}/day-discounts/${id}`;
        const response = await fetch(endpoint);
        if (response.status == 200) {
            return await response.json();
        } else {
            return null;
        }
    }
}

export const getTicketTypes = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/ticket-types`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        ticketTypeStorage.set(data);
    })
}

export const getDayDiscounts = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/day-discounts`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        dayDiscountStorage.set(data);
    })
}

export const getBills = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/bills`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        billStorage.set(data);
    })
}

export const getBill = async (id) => {
    if (billStorage.length) {
        return billStorage.find(billIterator => billIterator.id == id);
    } else { // If there are no movies in the storage, get them from the API
        const endpoint = `${env.PUBLIC_BACKEND_URL}/bills/${id}`;
        const response = await fetch(endpoint);
        if (response.status == 200) {
            return await response.json();
        } else {
            return null;
        }
    }
}

export const getTickets = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/tickets`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        ticketStorage.set(data);
    })
}

export const getStaff = async () => {
    fetch(`${env.PUBLIC_BACKEND_URL}/staff`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        staffStorage.set(data);
    })
}