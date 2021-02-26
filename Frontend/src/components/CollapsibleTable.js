import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination, 
  Typography,
  Paper,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import TnCModal1 from "./TnCModal1";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  CenterName,
  TestName,
  TestDate,
  Amount,
  Status,
  Result,
  TimeSlot,
  ContactDet,
  Cenid
) {
  return {
    CenterName,
    TestName,
    TestDate,
    Amount,
    Status,
    Result,
    Cenid,
    MoreInfo: [{ TimeSlot: TimeSlot, ContactDet: ContactDet }],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const classes = useRowStyles();
  const handleReview = () => {
    setModal(true);
  };
  return (
    <React.Fragment>
      <TnCModal1
        id={row.Cenid}
        size="sm"
        name="Review Form"
        head="Fill the form to give any suggestions related to the center."
        show={modal}
        onHide={() => setModal(false)}
        onAgree={() => setModal(false)}
      />
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.CenterName}
        </TableCell>
        <TableCell align="right">{row.TestName}</TableCell>
        <TableCell align="right">{row.TestDate}</TableCell>
        <TableCell align="right">{row.Amount}</TableCell>
        <TableCell align="right">{row.Status}</TableCell>
        <TableCell align="right">{row.Result}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Time Slot</TableCell>
                    <TableCell>Contact Details</TableCell>
                    <TableCell align="right">For Any reviews</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.MoreInfo.map((moreinfo) => (
                    <TableRow key={moreinfo.TimeSlot}>
                      <TableCell component="th" scope="row">
                        {moreinfo.TimeSlot}
                      </TableCell>
                      <TableCell>{moreinfo.ContactDet}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          variant="contained"
                          disabled={(row.Status=="Upcoming")}
                          onClick={() => handleReview()}
                        >
                          Post a review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    CenterName: PropTypes.string.isRequired,
    TestName: PropTypes.string.isRequired,
    TestDate: PropTypes.string.isRequired,
    MoreInfo: PropTypes.arrayOf(
      PropTypes.shape({
        TimeSlot: PropTypes.string.isRequired,
        ContactDet: PropTypes.string.isRequired,
      })
    ).isRequired,
    Amount: PropTypes.number.isRequired,
    Status: PropTypes.string.isRequired,
    Result: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ testInfo }) {
  const [start1, setStart] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const convertToRows = (x) => {
    setStart(false);
    let ans = [];
    for (let i = 0; i < x.length; i++) {
      ans.push(
        createData(
          x[i].CenterName,
          x[i].TestName,
          x[i].TestDate,
          x[i].AmountPaid,
          x[i].Status,
          x[i].Result,
          x[i].TimeSlot,
          x[i].ContactDet,
          x[i].Cenid
        )
      );
    }
    setRows(ans);
  };
  return (
    <Paper>
    <TableContainer component={Paper}>
      {start1 && convertToRows(testInfo)}
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Center Name</TableCell>
            <TableCell align="right">Test Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Amount Paid&nbsp;(₹)</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.Cenid} row={row} />
          ))}
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
