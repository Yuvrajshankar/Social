import React from 'react';
import "./Home.css";
import LeftSide from '../../Components/LeftSide/LeftSide';
import Main from '../../Components/Main/Main';
import RightSide from '../../Components/RightSide/RightSide';

function Home() {
  return (
    <div className='home'>
      <LeftSide />
      <Main />
      <RightSide />
    </div>
  )
}

export default Home;