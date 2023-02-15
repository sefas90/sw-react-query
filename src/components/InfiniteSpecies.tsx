import React, {useRef, useState, useEffect} from "react";
import {useInfiniteQuery, useQuery} from "react-query";
import Specie from "./Specie";


export default function InfiniteSpecies() {
    const fetchSpecies = async (page = 1) => {
        const response = await fetch(`https://swapi.dev/api/species?page=${page}`);
        return response.json();
    };

    const {data, isLoading, isError, isSuccess, fetchNextPage, hasNextPage, isFetching} = useInfiniteQuery(['species'], ({pageParam = 1}) =>
    fetchSpecies(pageParam),
    {
        getNextPageParam: (lastPage, allPages) => {            
          const maxPages = lastPage.count / 10;
          const nextPage: number = allPages.length + 1;
          return nextPage <= maxPages ? nextPage : undefined;
        },
        keepPreviousData: true
      }
    );


    useEffect(() => {
        let fetching = false;
        const onScroll = async (event: any) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
                fetching = true;
                if (hasNextPage) await fetchNextPage();   
                fetching = false;
            }
        }

        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        }
    }, [isFetching])
    

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>
            Error!
            </div>  
    }

    return isSuccess ? (
            <main className="species">
            {isSuccess ? data?.pages.map((page: any) => (
                page.results.map((species: any) => <Specie species={species}/>)
            )) : ''}
        </main>
        ) : <></>
    ;
}
