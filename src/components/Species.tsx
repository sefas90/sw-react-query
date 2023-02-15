import React, {useState} from "react";
import {useQuery} from "react-query";
import Specie from "./Specie";

export default function Species() {
    const [page, setPage] = useState(1);
    const fetchSpecies = async ({queryKey}: any) => {
        const response = await fetch(`https://swapi.dev/api/species?page=${queryKey[1]}`);
        return response.json();
    };

    const {data, isLoading, isError} = useQuery(['species', page], fetchSpecies,
        {
            keepPreviousData: false,
        });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>
            <div>
                Error!
            </div>
            <div>

            </div>
        </div>
    }

    return (
        <div className="species">
            {data.results.map((species: any) => (
                <Specie species={species}/>
            ))}
            <div>
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage((old) => old + 1)}
                    disabled={!data.next}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
