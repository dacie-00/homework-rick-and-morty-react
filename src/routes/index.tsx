import {createFileRoute} from '@tanstack/react-router'
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {FilterProps, getCharacters} from "@/api.tsx";
import React, {FormEvent, Fragment, useEffect, useState} from "react";
import InfiniteScroll from "@/components/ui/infinite-scroll.tsx";
import {Loader2} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import debounce from "debounce";
import CharacterList from "@/components/ui/character-list.tsx";
import {useNavigate} from "@tanstack/react-router"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const search = Route.useSearch<{page: number, name: string, species: string}>();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    // const maxPages = data?.pages[0].info.pages || 1;

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        status,
    } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: (page) => getCharacters({...search, page: page.pageParam}),
        initialPageParam: search.page ?? 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
            // if (lastPage === maxPages) {
                return undefined
            }
            return lastPageParam + 1
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined
            }
            return firstPageParam - 1
        },
    })

    const handleInput = (e: FormEvent) => {
        navigate({ search: {...search, [e.target.name]: e.target.value, page: 1} });
        queryClient.clear();
    }

    const characters = [];
    if (status === 'success') {
        data.pages.map((page) => (
            page.data.results.map((character) => (
                characters.push({name: character.name, species: character.species, status: character.status, image: character.image})
            ))
        ))
    }

    useEffect(() => {
        navigate({ search: {...search, page: data?.pageParams.at(-1)} });
    }, [data?.pageParams.length, search, navigate]);

    return (
        <div className={"max-w-xl mx-auto"}>
            <div className={"max-w-sm mx-auto"}>
                <p className={"text-center"}>Search</p>
                <Input onInput={debounce(handleInput, 1000)} className={"max-w-xl"} name={"name"} inputMode={"text"}
                       defaultValue={search.name}
                       placeholder={"name"}/>
                <Input onInput={debounce(handleInput, 1000)} className={"max-w-xl"} name={"species"} inputMode={"text"}
                       defaultValue={search.species}
                       placeholder={"species"}/>
            </div>
            <div>
                <p className={"text-center text-2xl pt-5"}>Characters</p>
            </div>
            <ul className={"max-w-xl mx-auto space-y-5 pt-5"}>
                <CharacterList characters={characters}/>
            </ul>
            <div className={"max-w-xl mx-auto"}>
                <InfiniteScroll isLoading={isFetching} hasMore={hasNextPage} next={fetchNextPage}>
                    {hasNextPage && <Loader2 className="my-4 h-8 w-8 animate-spin"/>}
                </InfiniteScroll>
            </div>
            {status === 'error' && error ? (
                error.response && error.response.status === 404 ? (
                    <p>No results found</p>
                    ) : (
                    <p>Error: {error.message}</p>
                )
            ) : null}
        </div>
    )
}
