import React, {useContext} from 'react';
import {Grid, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

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
    position: 'relative',
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
    backgroundColor: 'black',
  },
  name: {
    fontSize: '30px',
    color: 'white',
    fontFamily: 'serif'
  },
  zoomOut: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: '14px',
    right: '14px'
  }
}));

const VideoPlayer = ({ src }) => {
  const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(SocketContext);
  const classes = useStyles();

  const handleFullscreen = () => {
    if (myVideo.current.requestFullscreen) {
      myVideo.current.requestFullscreen();
    } else if (myVideo.current.webkitRequestFullscreen) {
      myVideo.current.webkitRequestFullscreen(); // Safari
    } else if (myVideo.current.msRequestFullscreen) {
      myVideo.current.msRequestFullscreen(); // IE11
    }
  };

  return (
    <Grid container className={classes.gridContainer}>
      {
        stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.name} variant='h5' gutterBottom>{name || 'Name'}</Typography>
              <video src={src} playsInline muted ref={myVideo} autoPlay className={classes.video}/>
              <ZoomOutMapIcon className={classes.zoomOut} onClick={handleFullscreen}>Full Screen</ZoomOutMapIcon>
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
              <ZoomOutMapIcon className={classes.zoomOut} onClick={handleFullscreen}>Full Screen</ZoomOutMapIcon>
            </Grid>
          </Paper>
        )
      }
    </Grid>
  );
};

export default VideoPlayer;