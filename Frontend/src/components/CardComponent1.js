import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Ratings from './StarRatingComponent';
import TagsComponent from './TagsComponent';
import {Favorite,ExpandMore,MoreVert,Share} from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import {Card , CardHeader , CardMedia , CardContent , CardActions , Collapse , Avatar , IconButton , Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '40%',
    margin:'2% 5%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  right: {
    textAlign:'right',
    marginRight:'10px',
    marginTop:'-9%',
    fontSize:'100%'
  },
  left: {
    marginLeft:'10px',
    fontSize:'100%'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardComponent1({img,Name,Address,Cost,Distance,OpeningTime,ClosingTime,Rating,Tags}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.head}
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     R
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVert />
        //   </IconButton>
        // }
        title={Name}
      />
        {/*subheader={"Estimated Cost: ₹"+Object.values({Cost})}*/}
        <Typography variant="body2" color="textPrimary" component="p"className={classes.left}>
          <b>Estimated Distace:</b><br /> {Distance}km
      </Typography>
      <Typography variant="body2" color="textPrimary" component="p"className={classes.right}>
          <b>Estimated Cost:</b><br /> ₹{Cost}
      </Typography>
      <CardMedia
        className={classes.media}
        image={img}
        title={Name}
      />
      <CardContent>
        <Typography  color="textPrimary" component="p">
          {Address}
        </Typography>
        <Typography  color="textPrimary" component="p">
          Opening Hours: {OpeningTime} - {ClosingTime}
        </Typography>
        <TagsComponent tags={Tags}/>
      </CardContent>
      <CardActions disableSpacing>
        {/*
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        */}
        
        <Ratings rating={Rating} />           {/*to check*/}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}