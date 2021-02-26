import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import CenterLoginNavbar from "./CenterLoginNavbar";
import "./CenterLoginHome.css";
import Footer from "./Footer";
import * as actionTypes from './store/actions';
import {connect} from 'react-redux';
import Axios from "axios";
import {Button} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell, 
  TableContainer,
  TableHead,
  TablePagination, 
  TableRow 
}
from '@material-ui/core';

const columns = [
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'Test', label: 'Test Name', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'Slot',
    label: 'Slot Timings',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'PhoneNo',
    label: 'Contact Details',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'Sendresult',
    label: 'Send Result',
    minWidth: 170,
    align: 'center',
  },
];

function createData(Name, Test, date, Slot,PhoneNo,Sendresult) {
  return {Name, Test, date, Slot,PhoneNo,Sendresult};
}



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function StickyHeadTable({appointments}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [start1, setStart] = React.useState(true);
  const convertToRows = (x) => {
    setStart(false);
    let ans = [];
    console.log(x)
    if(x.length==0){
      ans.push(createData("No appointments available","--","--","--","--","--"));
      setRows(ans);
    }
    else{
      console.log(x);
      for (let i = 0; i < x.length; i++) {
        ans.push(
          createData(
            x[i].Name,
            x[i].Test,
            x[i].Date,
            x[i].Slot,
            x[i].PhoneNo,
            x[i].Email,

          )
        );
      }
      setRows(ans);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      {start1 && convertToRows(appointments)}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if(column.id=="Sendresult" && row[column.id]!="--"){
                      return(
                        <TableCell key={column.id} align={column.align}>
                        <Button variant="success" onClick={()=> window.location.assign("mailto:"+value)}>Send Result</Button>
                      </TableCell>
                        );
                    }
                    else
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export class CenterSendResult extends Component {
  state= {
    initiate:true,
    display:false,
    appointments:[]
  };
  handleSendResult = (data) =>{
    this.setState({initiate:false});
    const centerInfo={centerInfo:data};
    Axios.post("http://localhost:5000/center/prevapp", centerInfo)
    .then((res) => {
      this.setState({appointments:res.data})
      this.setState({display:true});
    })
    .catch((err) => {
      console.log("Axios", err);
    });
  }
  render() {
    const{ 
      initiate,
      display,
      appointments
    } = this.state;

    return(
      <div>
      <CenterLoginNavbar
          centerInfo={this.props.centerInfo}
        />
      {initiate && this.handleSendResult(this.props.centerInfo)}
      {display && 
        <StickyHeadTable appointments={appointments}/>
      }
       <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    centerInfo:state.centerInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeCenterInfo: (centerInfo) => dispatch({type:actionTypes.CHANGE_CENTERINFO , centerInfo:centerInfo}),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CenterSendResult);
