import React, {useContext} from 'react';
import {Grid, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';

import {SocketContext} from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  video: {
    width: '650px',
    backgroundColor: 'black',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
      height: '225px',
      alignItems: 'center',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
    backgroundColor: 'black',
  },
  name: {
    fontSize: '30px',
    color: 'white',
    fontFamily: 'serif'
  }
}));

const VideoPlayer = () => {
  const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {
        stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.name} variant='h5' gutterBottom>{name || 'Name'}</Typography>
              <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
            </Grid>
          </Paper>
        )
      }
      {
        callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.name} variant='h5' gutterBottom>{call.name || 'Name'}</Typography>
              {console.log('CALLNAME', call.name)}
              <video playsInline ref={userVideo} autoPlay className={classes.video}/>
            </Grid>
          </Paper>
        )
      }
    </Grid>
  );
};

export default VideoPlayer;