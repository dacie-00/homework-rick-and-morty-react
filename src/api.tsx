import axios from "axios";

export type FilterProps = {
    page?: number
    name?: string,
    species?: string,
    status?: "Alive" | "Dead" | "unknown",
}

export async function getCharacters(params: FilterProps) {
    return await axios.get('https://rickandmortyapi.com/api/character/',
        {params: {...params}}
    );
}