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
      <Typography variant="h6"> Name </Typography>
      <div>{detailState.name}</div>
      <Typography variant="h6"> Abilities </Typography>
      {detailState.abilities.map(({ability, is_hidden, slot}) => <div>Name: {ability.name}, Hidden: {is_hidden ? 'Yes' : 'No'}, Slot: {slot}</div>)}
      <Typography variant="h6">Base experience</Typography>
      <div> {detailState.base_experience}</div>
    </>
  }
}



