import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import GetAllDocuments from "./GetAllDocuments";
import Slide from "@material-ui/core/Slide";
import GetPokemon from "./GetPokemon";

export const App = () => {
    return (
        <BrowserRouter>
            <Slide direction='down' in={true} timeout={5000}>
            <Box mt={3}>
                <Container maxWidth="xs">
                    <CssBaseline/>
                    <Switch>
                        <Route path={`/`} exact component={GetAllDocuments}/>
                        <Route path={`/pokemon/:name`} exact component={GetPokemon}/>
                        <Route component={() => <div>Route not found</div>}/>
                    </Switch>
                </Container>
            </Box>
            </Slide>
        </BrowserRouter>
    );
};

/* Tried to reuse this component in GetDocument but there is a React bug on TS when using method:  TS2605: JSX element type 'Element | ""' is not a constructor function for JSX elements.   Type '""' is not assignable to type 'Element | null'.
            <GetImage src={detailState.sprites.back_female}/>
            <GetImage src={detailState.sprites.back_shiny}/>
            <GetImage src={detailState.sprites.back_shiny_female}/>
            <GetImage src={detailState.sprites.front_female}/>
            <GetImage src={detailState.sprites.front_shiny}/>
            <GetImage src={detailState.sprites.front_shiny_female}/>
 */
export const GetImage = (props: any) => {
    return props.src ? <div><img src={props.src} alt='No image'/></div> : '';
};

