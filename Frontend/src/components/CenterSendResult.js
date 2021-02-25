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
  { id: 'Test', label: '', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Slot',
    label: 'Slot Timings',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'PhoneNo',
    label: 'Contact Details',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Sendresult',
    label: 'Send Result',
    minWidth: 170,
    align: 'right',
  },
];

function createData(Name, Test, date, Slot,PhoneNo,Sendresult) {
  return {Name, Test, date, Slot,PhoneNo,Sendresult};
}

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [start1, setStart] = React.useState(true);
  const convertToRows = (x) => {
    setStart(false);
    let ans = [];
    console.log(x)
    if(x.length==0){
      ans.push("No Reviews Found","-");
      setRows(ans);
    }
    else{
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
                    if(column.id=="Sendresult"){
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
    // Axios.post("http://localhost:5000/user/prevapp", data)
    // .then((res) => {
      // this.setState({appointments:res.data})
      this.setState({display:true});
    // })
    // .catch((err) => {
      // console.log("Axios", err);
    // });
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
