import {BrowserRouter, Route, Switch} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, {useRef, useState} from "react";
import GetAllDocuments from "./GetAllDocuments";
import Api from "./Api";
import HandleError from "./HandleError";

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
  const [detailState, setDetailState] = useState([]);
  let isLoaded = useRef(false);

  const detailName = props.match.params.name;

  if (!isLoaded.current) {
    Api.getDocument(detailName)
      .then(({data}) => {
        setDetailState(data);
      })
      .catch((error) => {
        HandleError(error);
      });
  };

  return <>
    <div>{detailState.name}</div>
  </>
};