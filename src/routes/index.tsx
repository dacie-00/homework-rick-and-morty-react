import {createFileRoute} from '@tanstack/react-router'
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {getCharacters} from "@/api.tsx";
import React, {Fragment} from "react";
import InfiniteScroll from "@/components/ui/infinite-scroll.tsx";
import {Loader2} from "lucide-react";
import CharacterCard from "@/components/ui/character-card.tsx";

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const queryClient = useQueryClient()

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: getCharacters,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
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

    return status === 'pending' ? (
        <p>Loading...</p>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <div>
            <ul className={"max-w-xl mx-auto space-y-5 pt-5"}>
                {data.pages.map((page) => (
                    page.data.results.map((character, i) => (
                            <Fragment key={i}>
                                <li>
                                    <CharacterCard>
                                        <img src={character.image}/>
                                        <p>Name - {character.name}</p>
                                        <p>Status - {character.status}</p>
                                        <p>Status - {character.species}</p>
                                    </CharacterCard>
                                </li>
                            </Fragment>
                        )
                    )
                ))}
            </ul>
            <div className={"max-w-xl mx-auto"}>
                <p>foo</p>
                <InfiniteScroll isLoading={isFetching} hasMore={hasNextPage} next={fetchNextPage}>
                    {hasNextPage && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
                </InfiniteScroll>
            </div>
            <div className={"max-w-xl mx-auto"}>
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
    )
}
