import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export type Character = {
    name: string,
    species: string,
    status: "Alive" | "Dead" | "unknown",
    image: string,
}

export default function CharacterCard({character}: {character: Character}) {
    return (
        <>
            <Dialog>
                <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-gray-200 p-2">
                    <div className="flex gap-2 justify-between">
                        <div className="flex flex-col justify-center gap-1">
                            <p>Name - {character.name}</p>
                            <p>Status - {character.status}</p>
                            <p>Status - {character.species}</p>
                        </div>
                        <DialogTrigger className="self-end text-blue-400 hover:underline">Open</DialogTrigger>
                    </div>
                </div>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{character.name}</DialogTitle>
                        <DialogDescription>
                            <img src={character.image}/>
                            <p>Status - {character.status}</p>
                            <p>Species - {character.species}</p>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}