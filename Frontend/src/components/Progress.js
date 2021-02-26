import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 2,
  },
  colorPrimary: {
    backgroundColor: "red",
  },
  bar: {
    borderRadius: 2,
    backgroundColor: 'green',
  },
}))(LinearProgress);

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Progress({value}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      <BorderLinearProgress variant="determinate" value={value} />
    </div>
  );
}
