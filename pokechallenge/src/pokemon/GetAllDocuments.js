import React, {useRef, useState} from "react";
import {Link} from 'react-router-dom';
import Api from "./Api";
import HandleError from "./HandleError";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {GetImage} from "./App";

const GetAllDocuments = (props) => {
  const [state, setState] = useState([]);
  let isLoaded = useRef(false);

  if (!isLoaded.current) {
    Api.getAllDocuments()
      .then(({data}) => {
        console.log(data);
        setState(data.results);
      })
      .catch((error) => {
        HandleError(error);
      });

    isLoaded.current = true;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>Pokemon List</Typography>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map(row => (
            <TableRow key={row.name}>
              <TableCell><GetImage
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(row.url.substring(34))}.png`}/></TableCell>
              <TableCell>{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</TableCell>
              <TableCell>
                <Button component={Link} to={`/pokemon/${row.name}`} variant="outlined">Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></>
  );
};


export default GetAllDocuments;