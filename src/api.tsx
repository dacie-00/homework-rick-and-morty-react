import axios from "axios";

export async function getCharacters(page) {
    return await axios.get('https://rickandmortyapi.com/api/character/?page=' + page.pageParam);
}