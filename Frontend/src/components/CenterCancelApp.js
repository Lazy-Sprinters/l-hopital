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
import TnCModal3 from "./TnCModal3";

const columns = [
  { id: 'Name', label: 'Name', minWidth: 170 ,align: 'center',},
  { id: 'Test', label: 'Test Name', minWidth: 100 ,align: 'center',},
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
    label: 'Phone Number',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'Email',
    label: 'Email ID',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'Cancel',
    label: 'Cancel',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'appInfo',
    label: 'appInfo',
    minWidth: 170,
    align: 'center',
  },
];

function createData(Name, Test, date, Slot,PhoneNo,Email,Cancel,appInfo) {
  return {Name, Test, date, Slot,PhoneNo,Email,Cancel,appInfo};
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function StickyHeadTable({appointments,ModalShow}) {
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
      ans.push(createData("No appointments available","--","--","--","--","--","--"));
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
            0,
            x[i],
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
  const handleModal = (appInfo) =>{
    ModalShow(appInfo,true);
  }
  return (
    <Paper className={classes.root}>
      {start1 && convertToRows(appointments)}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <>
                {(column.id!="appInfo" ) &&
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                }
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if(column.id=="Cancel" && row[column.id]!="--"){
                      return(
                        <TableCell key={column.id} align={column.align}>
                        <Button variant="danger" onClick={() => handleModal(row['appInfo'])} >"Cancel" }</Button>
                      </TableCell>
                        );
                    }
                    else if(column.id!="appInfo")
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

export class CenterAppOfDay extends Component {
  state= {
    initiate:true,
    display:false,
    appointments:[],
    appis:"",
    modal:false
  };
  handleCancelApp = (data) =>{
    this.setState({initiate:false});
    const centerInfo={centerInfo:data};
    Axios.post("http://localhost:5000/center/futapp", centerInfo)
    .then((res) => {
      this.setState({appointments:res.data})
      this.setState({display:true});
    })
    .catch((err) => {
      console.log("Axios", err);
    });
  }
  ModalShow = (appInfo,x) => {
    this.setState({appInfo:appInfo})
    this.setState({modal:x})
  };
  render() {
    const{ 
      initiate,
      display,
      appointments,
      appInfo,
      modal
    } = this.state;
    const values={
    }
    return(
      <div>
      <TnCModal3
        size="lg"
        name="Cancel The Appointment"
        head="State an appropriate reason for cancelling the appointment"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat. "
        show={modal}
        appInfo={appInfo}
        centerInfo={this.props.centerInfo}
        onHide={() => this.ModalShow(false)}
        onAgree={() => this.ModalShow(false)}
      />
      <CenterLoginNavbar
          centerInfo={this.props.centerInfo}
        />
      {initiate && this.handleCancelApp(this.props.centerInfo)}
      {display && 
        <StickyHeadTable appointments={appointments} ModalShow={this.ModalShow}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(CenterAppOfDay);
