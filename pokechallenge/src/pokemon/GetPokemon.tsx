import React from "react";
import GetDocument from "./GetDocument";
import Api from "./Api";

const GetPokemon = (props: { match: { params: { name: any; }; }; }) => {
    return <GetDocument name={props.match.params.name} getDocument={Api.getDocument} hasLink={true}/>
};

export default GetPokemon;