import React from "react";

export interface SpeciesClass {
    name: string;
    mammal: string;
    sentient: string;
}

export default function Specie({ species }: any) {
    return (
        <div className="card">
            <div className="text-container">
                <h3>{species.name} ({species.people.length})</h3>
                <p className="status">
                    {species.classification} - {species.designation}
                </p>
                <p className="title">Language</p>
                <p>{species.language}</p>
                <div className="space"></div>
                <p className="title">Average Stats</p>
                <p>Height {species.average_height}</p>
                <p>Lifespan {species.average_lifespan}</p>
            </div>
        </div>
    );
}
