import CharacterCard, {Character} from "@/components/ui/character-card.tsx";

export default function CharacterList({characters}: {characters: Character[]}) {
    return (
        <ul className={"max-w-xl mx-auto space-y-5"}>
            {characters.map( (character: Character, i) => {
                return (
                    <li key={i}>
                        <CharacterCard character={character}/>
                    </li>
                )
            })}
        </ul>
    )
}
