import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState(0);
  const history = useNavigate(0);



  useEffect(() => {
     
     if(value ===0){
          history("/");
     }else if(value===1){
          history("/movies");
     }else if(value===2){
          history("/series");
     }else if(value===3){
          history("/search");
     }

  },[value,history]);



  return (
    <Box >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ width: "100%", position:"fixed",bottom:"0",backgroundColor:"#2d313a",zIndex:100 }}
      >
        <BottomNavigationAction style={{color:'#ffff',fontSize:"3vw"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color:'#ffff'}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:'#ffff'}} label="TvSeries" icon={<TvIcon />} />
        <BottomNavigationAction style={{color:'#ffff'}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default SimpleBottomNavigation;