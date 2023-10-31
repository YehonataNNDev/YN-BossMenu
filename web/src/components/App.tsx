import React, {useState, useEffect} from 'react';
import './App.css'
import {debugData} from "../utils/debugData";
import {fetchNui} from "../utils/fetchNui";

import { useNuiEvent } from '../hooks/useNuiEvent';
import backTexutre from '../images/backtexture.png'
import backTexutre2 from '../images/backtexture2.png'
import person from '../images/person.png'
import business from '../images/business.png'
import headerimg from '../images/headerimg.png'
import info from '../images/info.png'
import someone from '../images/someone.png'
import info2 from '../images/info2.png'
import Employee from './Employee'
import Business from './Business'

debugData([
  {
    action: 'setVisible',
    data: true,
  }
])

const App: React.FC = () => {
  const [navSelected , setNavSelected] = useState('employee')

  const [drawerState, setDrawerState] = useState(1);

  const [employeeData , setEmployeeData] = useState<any | null>([])
  const [businessDataToSend , setBusinessData] = useState<any | null>([])
  const [jobRanks , setJobRanks] = useState<any | null>([])
  const [playersList , setplayersList] = useState<any | null>([])
  const [businessHistory , setbusinessHistory] = useState<any | null>([])

  const [playerData, setPlayerData] = useState<any | null>([]);

  function setData(data:any) {
    setEmployeeData(data.employees)
    setbusinessHistory(data.bHistory)
    setBusinessData(data.business)
    setJobRanks(data.JobRanks)
    setplayersList(data.players)
    setPlayerData(data.player)
  }
  
  useNuiEvent<any>('displayBossMenu' , function(data) {
    setDrawerState(drawerState + 1)
    setData(data)
  })


  return (
    <div className="nui-wrapper">
      {employeeData.length !== 0 ? 
      <div className='popup-thing'>
        <div className='backTexture'>
          <img src={backTexutre}></img>
        </div>
        <div className='backTexture2'>
          <img src={backTexutre2}></img>
        </div>
        <div className='InsideContainer'>
          <div className='upperHeader'>
            <div className='part'>
              <span>
                <div className='boxHeaderThing'><img src={headerimg}></img></div>
                <div style={{opacity: '0.2'}} className='boxHeaderThing'></div>
              </span>
            </div>
            <div className='part' style={{marginLeft: '-8vw'}}>
              <span  style={{display: 'flex' , flexDirection: 'column',gap:'0.4vw'}}>
                <h1 style={{color: '#54FFA3', fontFamily: 'Barlow' , fontWeight: '700'}}>MANAGMENT</h1>
                <span style={{width: '85%' ,borderRadius: '0.4rem', padding: '0.4vw',background: 'linear-gradient(90deg, rgba(84, 255, 163, 0.26) 0%, rgba(84, 255, 163, 0) 100%, rgba(84, 255, 163, 0) 100%)'}}>
                  <p style={{color: 'white' , fontFamily: 'Barlow' , fontWeight: '600'}}>SYSTEM</p>
                </span>
              </span>
            </div>
            <div className='part' style={{marginLeft: '-6vw'}}>
              <span style={{ paddingLeft: '0.5vw', display: 'flex' , flexDirection: 'row', justifyContent: 'center' , alignItems: 'center' , gap: '1vw' , background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)' , height: '8.5vh' , width: '22vw', borderRadius: '0.5rem'}}>
                <img style={{height: '2vh', width: '1vw'}} src={info}></img>
                <span style={{display: 'flex' , flexDirection: 'column' , gap: '0.2vw', width: '80%'}}>
                  <h1 style={{color: 'white', fontFamily: 'Barlow', fontWeight: '600', fontSize: 'calc(9px + 0.4vw)'}}>INFORMATION</h1>
                  <p style={{color: 'rgba(255, 255, 255, 0.59)' , fontFamily: 'Barlow' , fontWeight: '400', fontSize: 'calc(6px + 0.4vw)'}}>Lorem ipsum dolor sit amet consectetur. Natoque et ipsum urna tristique mi.</p>
                </span>
              </span>
            </div>
            <div className='part' style={{display: 'flex' , alignItems: 'flex-end'}}>
              <span style={{border: '0.1vw solid rgba(255, 255, 255, 0.08)', paddingLeft: '1vw', display: 'flex' , flexDirection: 'row', justifyContent: 'center' , alignItems: 'center' , gap: '1vw' , background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)' , height: '8.5vh' , width: '17vw', borderRadius: '0.5rem'}}>
    
                <span style={{display: 'flex' , flexDirection: 'column' , gap: '0.2vw', width: '80%'}}>
                  <span style={{ width: '100%',display: 'flex', flexDirection: 'row'  , alignItems: 'center', gap: '0.4vw', color: 'white', fontFamily: 'Barlow', fontWeight: '400', fontSize: 'calc(9px + 0.4vw)'}}><h1 style={{color: 'white', fontFamily: 'Barlow', fontWeight: '600', fontSize: 'calc(9px + 0.4vw)'}}>{playerData.FirstName}</h1> {playerData.LastName} <img src={info2} style={{height: '1vh', width: '1vh', float: 'right'}}></img></span>
                  <p style={{color: '#54FFA3', fontFamily: 'Barlow' , fontWeight: '500', fontSize: 'calc(8px + 0.4vw)'}}>{playerData.rank}</p>
                </span>
              </span>
            </div>
          </div>
          <hr style={{width: '85%', opacity: '0.04'}}></hr>
          <div className='ButtonsNav' style={{zIndex: '8'}}>
            <span onClick={() => {setNavSelected('employee')}} className={navSelected == 'employee' ? 'navSpan SelectedButton' : 'navSpan'}>
              <img src={person}></img>
              <button>Employee Managment</button>
            </span>
            <span onClick={() => {setNavSelected('business')}} className={navSelected == 'business' ? 'navSpan SelectedButton' : 'navSpan'}>
              <img src={business}></img>
              <button>Business Account Management</button>
            </span>
          </div>
          <div className='ChosenPage'>
            <div style={{display: navSelected == 'employee' ? 'flex' : 'none' , width: '100%', height:'100%'}}>
              <Employee key={drawerState} employeesData={employeeData} jobRanks= {jobRanks} Players= {playersList}></Employee> : ''
            </div>
         
            <div style={{display: navSelected == 'business' ? 'flex' : 'none' , width: '100%', height:'100%'}}>
              <Business key={drawerState} receivedBusinessData={businessDataToSend} history={businessHistory}></Business> : ''
            </div>
   
          </div>
        </div>
      </div>
      : ''}
    </div>
  );
}

export default App;
