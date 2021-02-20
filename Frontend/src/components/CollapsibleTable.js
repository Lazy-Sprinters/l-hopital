import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box ,Button, Collapse , IconButton , Table , TableBody , TableCell , TableContainer , TableHead , TableRow , Typography , Paper} from '@material-ui/core';
import { KeyboardArrowDown , KeyboardArrowUp } from '@material-ui/icons';
import TnCModal from "./TnCModal";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       { date: '2020-01-05', customerId: '11091700', amount: 3 },
//       { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//     ],
//   };
// }
function createData(CenterName, TestName, TestDate, Amount, Status, Result, TimeSlot,ContactDet,value) {
  return {
    CenterName, 
    TestName,
    TestDate, 
    Amount, 
    Status, 
    Result,
    MoreInfo: [
      { TimeSlot: TimeSlot, ContactDet: ContactDet, value: value }
    ],
  };
}
// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const classes = useRowStyles();

//   return (
//     <React.Fragment>
//       <TableRow className={classes.root}>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.fat}</TableCell>
//         <TableCell align="right">{row.carbs}</TableCell>
//         <TableCell align="right">{row.protein}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [reviewInfo, setReviewInfo] = React.useState("");
  const classes = useRowStyles();
  const handleReview = (x) =>{
    setModal(true);
    setReviewInfo(x);
  }
  return (
    <React.Fragment>
    <TnCModal
        size="lg"
        name="Terms & Conditions"
        head="Read The Terms And Conditions Carefully"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                     in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                     sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                     mollit anim id est laborum."
        show={modal}
        onHide={() => setModal(false)}
        onAgree={() => setModal(false)}
      />
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
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
                        
                          onClick={()=>handleReview(moreinfo.value)}
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
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable({testInfo}) {
  const [start1, setStart] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const convertToRows = (x) => {
    console.log(x);
    setStart(false);
    let ans=[];
    for(let i=0;i<x.length;i++)
    {
      ans.push(createData(x[i].CenterName,x[i].TestName,x[i].TestDate,x[i].AmountPaid,x[i].Status,x[i].Result,x[i].TimeSlot,x[i].ContactDet,x[i]));
    }
    setRows(ans);
  };
  return (
    <TableContainer component={Paper}>
   { console.log(start1)}

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
            <Row key={row.CenterName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
