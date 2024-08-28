import axios from "axios";

export async function getCharacters(page: int) {
    return await axios.get('https://rickandmortyapi.com/api/character/?page=' + page);
}