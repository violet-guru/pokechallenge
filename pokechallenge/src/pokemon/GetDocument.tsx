import React, {useRef, useState} from "react";
import HandleError from "./HandleError";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export const GetDocument = (props: { name: string; hasLink: boolean; getDocument: any }) => {
    const [detailState, setDetailState] = useState({
            abilities: [{ability: {name: ""}, is_hidden: false, slot: 0}],
            name: "",
            forms: [{name: ""}],
            sprites: {
                front_default: "",
                back_default: "",
                back_female: "",
                back_shiny: "",
                back_shiny_female: "",
                front_female: "",
                front_shiny: "",
                front_shiny_female: ""
            },
            game_indices: [{version: {name: ""}}],
            types: [{type: {name: ""}}],
            weight: "",
            moves: [{move: {name: ""}}],
            species: {name: ""},
            base_experience: "",
            height: "",
            held_items: [{item: {name: ""}}],
            id: 0,
            is_default: false,
            order: 0,
            stats: [{stat: {name: ""}, base_stat: "", effort: ""}]
        })
    ;

    let isLoaded = useRef(false);

    const detailName = props.name;

    if (!isLoaded.current) {

        //Getting data for the detail view
        if (props.getDocument) {
            props.getDocument(detailName)
                .then((result: any) => {
                    console.log(result.data);
                    setDetailState(result.data);
                })
                .catch((error: any) => {
                    HandleError(error);
                });

            isLoaded.current = true;
        }
    }


    if (!detailState || !detailState.name) {
        return <>'No data' </>;
    } else {
        return <>
            {props.hasLink ? <Button component={Link} to={`/`} variant="outlined">Pokemon List</Button> : ''}
            <Typography variant="h6">Name</Typography>
            <div>{detailState.name.charAt(0).toUpperCase() + detailState.name.slice(1)}</div>
            <Typography variant="h6">Sprites</Typography>
            {detailState.sprites.front_default ?
                <div>
                    <img src={detailState.sprites.front_default}/>
                </div>
                : ''}
            {detailState.sprites.back_default ?
                <div>
                    <img src={detailState.sprites.back_default}/>
                </div>
                : ''}
            <Typography variant="h6"> Abilities</Typography>
            {detailState.abilities.map((data, index) =>
                <div key={index}>
                    Name: {data.ability.name}, Hidden: {data.is_hidden ? 'Yes' : 'No'}, Slot: {data.slot}
                </div>)}
            <Typography variant="h6">Base experience</Typography>
            <div> {detailState.base_experience}</div>
            <Typography variant="h6">Forms</Typography>
            {detailState.forms.map(({name}) => name).join(", ")}
            <Typography variant="h6">Game indices</Typography>
            {detailState.game_indices.map(({version}) => version.name).join(", ")}
            <Typography variant="h6">Height</Typography>
            <div>{detailState.height}</div>
            <Typography variant="h6">Held items</Typography>
            {detailState.held_items.map(({item}) => item.name).join(", ")}
            <Typography variant="h6">Id</Typography>
            <div>{detailState.id}</div>
            <Typography variant="h6">Default</Typography>
            <div>{detailState.is_default ? 'Yes' : 'No'}</div>
            <Typography variant="h6">Moves</Typography>
            {detailState.moves.map(({move}) => move.name).join(", ")}
            <Typography variant="h6">Order</Typography>
            <div>{detailState.order}</div>
            <Typography variant="h6">Species</Typography>
            <div>{detailState.species.name}</div>
            <Typography variant="h6">Stats</Typography>
            {detailState.stats.map((data, index) =>
                <div key={index}>
                    Name: {data.stat.name}, Base stat: {data.base_stat}, Effort: {data.effort}
                </div>)}
            <Typography variant="h6">Types</Typography>
            {detailState.types.map(({type}) => type.name).join(", ")}
            <Typography variant="h6">Weight</Typography>
            <div>{detailState.weight}</div>
        </>
    }
};

export default GetDocument;