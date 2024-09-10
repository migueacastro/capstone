import { movieStorage, getMovies } from "../../../../stores/cinema";

export function load({ params }) {
    return {
        id: params.id,
        type: 'movies'
    };
}

