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
    right: '14px',
    cursor: 'pointer'
  }
}));

const VideoPlayer = ({ myVideoSrc, userVideoSrc }) => {
  const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(SocketContext);
  const classes = useStyles();

  const handleFullScreenMyVideo = () => {
    if (myVideo.current.requestFullScreen) {
      myVideo.current.requestFullScreen();
    } else if (myVideo.current.webkitRequestFullScreen) {
      myVideo.current.webkitRequestFullScreen(); // Safari
    } else if (myVideo.current.msRequestFullScreen) {
      myVideo.current.msRequestFullScreen(); // IE11
    }
  };

  const handleFullScreenUserVideo = () => {
    if (userVideo.current.requestFullScreen) {
      userVideo.current.requestFullScreen();
    } else if (userVideo.current.webkitRequestFullScreen) {
      userVideo.current.webkitRequestFullScreen(); // Safari
    } else if (userVideo.current.msRequestFullScreen) {
      userVideo.current.msRequestFullScreen(); // IE11
    }
  };

  return (
    <Grid container className={classes.gridContainer}>
      {
        stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.name} variant='h5' gutterBottom>{name || 'Name'}</Typography>
              <video src={myVideoSrc} playsInline muted ref={myVideo} autoPlay className={classes.video}/>
              <ZoomOutMapIcon className={classes.zoomOut} onClick={handleFullScreenMyVideo} />
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
              <video src={userVideoSrc} playsInline ref={userVideo} autoPlay className={classes.video}/>
              <ZoomOutMapIcon className={classes.zoomOut} onClick={handleFullScreenUserVideo} />
            </Grid>
          </Paper>
        )
      }
    </Grid>
  );
};

export default VideoPlayer;