import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, {useRef, useState} from "react";
import GetAllDocuments from "./GetAllDocuments";
import Api from "./Api";
import HandleError from "./HandleError";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const App = (props) => {
  return (
    <BrowserRouter>
      <Box mt={3}>
        <Container maxWidth="xs">
          <CssBaseline/>
          <Switch>
            <Route path={`/`} exact component={GetAllDocuments}/>
            <Route path={`/pokemon/:name`} exact component={GetDocument}/>
            <Route component={() => <div>Route not found</div>}/>
          </Switch>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export const GetDocument = (props) => {
  const [detailState, setDetailState] = useState({});
  let isLoaded = useRef(false);

  const detailName = props.match.params.name;

  if (!isLoaded.current) {
    Api.getDocument(detailName)
      .then(({data}) => {
        console.log(data);
        setDetailState(data);
      })
      .catch((error) => {
        HandleError(error);
      });

    isLoaded.current = true;
  }


  if (!detailState.abilities) {
    return <>'No data' </>;
  } else {
    return <>
      <Button component={Link} to={`/`} variant="outlined">Pokemon List</Button>
      <Typography variant="h6">Name</Typography>
      <div>{detailState.name}</div>
      <Typography variant="h6">Sprites</Typography>
      {detailState.sprites.front_default ? <div><img src={detailState.sprites.front_default}/></div> : ''}
      {detailState.sprites.back_default ? <div><img src={detailState.sprites.back_default}/></div> : ''}
      {detailState.sprites.back_female ? <div><img src={detailState.sprites.back_female}/></div> : ''}
      {detailState.sprites.back_shiny ? <div><img src={detailState.sprites.back_shiny}/></div> : ''}
      {detailState.sprites.back_shiny_female ? <div><img src={detailState.sprites.back_shiny_female}/></div> : ''}
      {detailState.sprites.front_female ? <div><img src={detailState.sprites.front_female}/></div> : ''}
      {detailState.sprites.front_shiny ? <div><img src={detailState.sprites.front_shiny}/></div> : ''}
      {detailState.sprites.front_shiny_female ? <div><img src={detailState.sprites.front_shiny_female}/></div> : ''}
      <Typography variant="h6"> Abilities</Typography>
      {detailState.abilities.map(({ability, is_hidden, slot}, index) =>
        <div key={index}>
          Name: {ability.name}, Hidden: {is_hidden ? 'Yes' : 'No'}, Slot: {slot}
        </div>)}
      <Typography variant="h6">Base experience</Typography>
      <div> {detailState.base_experience}</div>
      <Typography variant="h6">Forms</Typography>
      {detailState.forms.map((data) => data.name).join(", ")}
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
      {detailState.stats.map(({base_stat, stat, effort}, index) =>
        <div key={index}>
          Name: {stat.name}, Base stat: {base_stat}, Effort: {effort}
        </div>)}

      <Typography variant="h6">Types</Typography>
      {detailState.types.map(({type}) => type.name).join(", ")}
      <Typography variant="h6">Weight</Typography>
      <div>{detailState.weight}</div>
    </>
  }
}



