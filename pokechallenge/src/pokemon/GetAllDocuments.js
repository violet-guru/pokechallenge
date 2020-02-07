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
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import IconButton from "@material-ui/core/IconButton";
import {KeyboardArrowLeft, KeyboardArrowRight, FirstPage, LastPage} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";

const pageStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaginationActions = props => {
  const classes = pageStyles();
  const {count, page, rowsPerPage, onChangePage} = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
      >
        <FirstPage/>
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeft/>
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <KeyboardArrowRight/>
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <LastPage/>
      </IconButton>
    </div>
  );
};

const GetAllDocuments = (props) => {
  const [state, setState] = useState([]);
  const [countState, setCountState] = useState(0);
  const [pageState, setPageState] = useState(0);

  let isLoaded = useRef(false);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    GetDocuments(newPage * rowsPerPage);
    setPageState(newPage);
  };

  const GetDocuments = offset => {
    Api.getAllDocuments(offset)
      .then(({data}) => {
        console.log(data);
        setState(data.results);
        setCountState(data.count);
      })
      .catch((error) => {
        HandleError(error);
      });
  };

  if (!isLoaded.current) {
    GetDocuments(0);
    isLoaded.current = true;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>Pokemon List</Typography>
      <p>Pagination at the bottom</p>
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
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              colSpan={3}
              count={countState}
              rowsPerPage={rowsPerPage}
              page={pageState}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table></>
  );
};


export default GetAllDocuments;