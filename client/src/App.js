import React, {useState} from 'react';
import {Typography, AppBar, Button} from '@material-ui/core';

import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import Options from './components/Options';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)  => ({
  appBar: {
    display: 'flex',
    backgroundColor: 'black',
    color: 'rgb(3, 252, 127)',
    opacity: '0.6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '800px',
    border: '2px solid black',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography variant='h4' align='center'>Video Call</Typography>
      </AppBar>
      <VideoPlayer />
      {showOptions && (
        <Options>
          <Notifications />
        </Options>
      )}

      <Button variant="contained" color="primary" onClick={handleToggleOptions}>
        {showOptions ? 'Hide Options' : 'Show Options'}
      </Button>
    </div>
  )
};

export default App;