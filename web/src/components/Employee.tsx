import React, {useEffect, useState, useCallback} from 'react';
import './App.css';

import info from '../images/info.png';
import {fetchNui} from '../utils/fetchNui';
const Employee: React.FC<any> = (data) => {
  const [employees, setEmployees] = useState<any | null>([]);
  const [jobRanks, setJobRanks] = useState<any | null>([]);
  const [playersList, setPlayerList] = useState<any | null>([]);

  const [newData, setNewData] = useState<any | null>([]);
  const [InviteEmployeeSalary, setInviteSalary] = useState('0');
  const [employeeRank, changeEmployeeRank] = useState('0');
  const [employeeCid, changeEmployeeCid] = useState('0');

  function changeInput(index: number, amount: number) {
    let b = [...employees];
    b[index].salary = amount;

    setEmployees(b);
    if (!newData.includes(b[index].cid)) {
      setNewData([...newData, b[index].cid]);
    }
  }

  useEffect(() => {
    setEmployees(data.employeesData);
    setJobRanks(data.jobRanks);
    setPlayerList(data.Players);
  }, []);

  function changeRank(index: number, rank: string) {
    let b = [...employees];
    b[index].playerRank = rank;

    setEmployees(b);
    if (!newData.includes(b[index].cid)) {
      setNewData([...newData, b[index].cid]);
    }
  }

  function sendCurrentData() {
    setNewData([]);
    fetchNui<any>('updateData', {data: employees, playersToUpdate: newData});
  }

  function inviteEmployee() {
    fetchNui<any>('employeeAction', {
      action: 'hire',
      salary: InviteEmployeeSalary,
      rank: employeeRank,
      cid: employeeCid,
    });
  }

  function fireEmployee(cid: string) {
    setEmployees(employees.filter((item: any) => item.cid !== cid));

    fetchNui<any>('employeeAction', {action: 'fire', cid: cid});
  }

  const checkKeyPress = useCallback(
    (e: any) => {
      const {key, keyCode} = e;
      if (keyCode === 13) {
        sendCurrentData();
      }
    },
    [employees]
  );

  useEffect(() => {
    window.addEventListener('keydown', checkKeyPress);
    return () => {
      window.removeEventListener('keydown', checkKeyPress);
    };
  }, [checkKeyPress]);
  return (
    <div className="EmployeePage" style={{paddingTop: '1vw', width: '100%'}}>
      <div className="employeesPart">
        <div className="employeesList" style={{width: '43vw'}}>
          <span
            style={{
              paddingLeft: '3.5vw',
              display: 'flex',
              flexDirection: 'row',
              gap: '10vw',
            }}>
            <p>Name;</p>
            <p>Company Rank;</p>
            <p>Salary</p>
          </span>
          <div>
            {employees.map((e: any) => {
              let indexOfElement = employees.findIndex(
                (element: any) => e.cid === element.cid
              );
              return (
                <div className="employeeListRow" style={{zIndex: '80'}}>
                  <span style={{paddingLeft: '1vw'}}>
                    <p>{e.PlayerName}</p>
                  </span>
                  <span style={{display: 'flex', flexDirection: 'row'}}>
                    <form>
                      <select
                        onChange={(element) =>
                          changeRank(indexOfElement, element.target.value)
                        }
                        value={e.playerRank}>
                        {jobRanks.map((e: any) => {
                          return Object.values(e).map(
                            (item: any, index: number) => {
                              return <option value={index}>{item.name}</option>;
                            }
                          );
                        })}
                      </select>
                    </form>
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <div>
                      <input
                        className="salaryInput"
                        type="number"
                        onChange={(change: any) => {
                          changeInput(indexOfElement, change.target.value);
                        }}
                        value={`${employees[indexOfElement].salary}`}></input>
                    </div>
                    <span
                      onClick={() => {
                        fireEmployee(e.cid);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: '0.3rem',
                        borderBottomRightRadius: '0.3rem',
                        height: '105%',
                        width: '3vw',
                        background:
                          'linear-gradient(171.79deg, rgba(202, 71, 71, 0.3) -0.98%, rgba(165, 27, 27, 0.3) 93.7%)',
                        border: '0.1vw solid rgba(180, 79, 79, 0.83)',
                      }}>
                      <p
                        style={{
                          color: '#E56262',
                          fontFamily: 'Barlow',
                          fontWeight: '400',
                        }}>
                        Kick
                      </p>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="employeesPart"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vw',
          height: '100%',
        }}>
        <h1
          style={{
            color: 'white',
            fontFamily: 'Barlow',
            fontWeight: 500,
            fontSize: 'calc(10px + 0.4vw)',
          }}>
          Employees Invite
        </h1>
        <div className="employeesInvite" style={{marginTop: '-1vw'}}>
          <div className="inviteRow">
            <span>
              <p>Employee's Name</p>
              <form>
                <select
                  onChange={(e: any) => {
                    changeEmployeeCid(e.target.value);
                  }}
                  value={employeeCid}
                  style={{
                    background: 'rgba(141, 214, 255, 0.09)',
                    border: '0.12vw solid rgba(141, 214, 255, 0.18)',
                  }}
                  className="inviteSelectInput">
                  <option value="">Select from the list</option>
                  {playersList.map((e: any) => {
                    return <option value={e.cid}>{e.name}</option>;
                  })}
                </select>
              </form>
            </span>
            <span>
              <h1 style={{fontSize: 'calc(8px + 0.4vw)'}}>INFORMATION</h1>
              <p
                style={{
                  fontSize: 'calc(5px + 0.4vw)',
                  color: 'rgba(255, 255, 255, 0.59)',
                }}>
                Lorem ipsum dolor sit amet consectetur. Natoque et ipsum
              </p>
            </span>
          </div>
          <div className="inviteRow">
            <span>
              <p>Employee's Rank</p>
              <form>
                <select
                  onChange={(e: any) => {
                    changeEmployeeRank(e.target.value);
                  }}
                  value={employeeRank}
                  className="inviteSelectInput">
                  {jobRanks.map((e: any) => {
                    return Object.values(e).map((item: any, index: number) => {
                      return <option value={index}>{item.name}</option>;
                    });
                  })}
                </select>
              </form>
            </span>
            <span>
              <p>Employee's Salary</p>
              <div className="salaryInputInvite">
                <span style={{paddingLeft: '0.2vw'}}>$</span>
                <input
                  type="number"
                  onChange={(e) => {
                    setInviteSalary(e.target.value);
                  }}
                  value={InviteEmployeeSalary}></input>
              </div>
            </span>
          </div>
          <button
            onClick={() => {
              inviteEmployee();
            }}>
            Invite as employee
          </button>
        </div>
        <div
          className="employeesInvite"
          style={{maxHeight: '25.8vh', height: '100%', overflow: 'auto'}}>
          <div className="inviteRow">
            <span
              style={{
                paddingLeft: '0.5vw',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1vw',
                height: '8.5vh',
                width: '100%',
                borderRadius: '0.5rem',
              }}>
              <img style={{height: '2vh', width: '1vw'}} src={info}></img>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2vw',
                  width: '80%',
                }}>
                <h1
                  style={{
                    color: 'white',
                    fontFamily: 'Barlow',
                    fontWeight: '600',
                    fontSize: 'calc(9px + 0.4vw)',
                  }}>
                  INFORMATION
                </h1>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.59)',
                    fontFamily: 'Barlow',
                    fontWeight: '400',
                    fontSize: 'calc(6px + 0.4vw)',
                  }}>
                  Lorem ipsum dolor sit amet consectetur. Natoque et ipsum urna
                  tristique mi.
                </p>
              </span>
            </span>
          </div>
          <div className="inviteRow">
            <span
              style={{
                paddingLeft: '0.5vw',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1vw',
                height: '8.5vh',
                width: '100%',
                borderRadius: '0.5rem',
              }}>
              <img style={{height: '2vh', width: '1vw'}} src={info}></img>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2vw',
                  width: '80%',
                }}>
                <h1
                  style={{
                    color: 'white',
                    fontFamily: 'Barlow',
                    fontWeight: '600',
                    fontSize: 'calc(9px + 0.4vw)',
                  }}>
                  INFORMATION
                </h1>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.59)',
                    fontFamily: 'Barlow',
                    fontWeight: '400',
                    fontSize: 'calc(6px + 0.4vw)',
                  }}>
                  Lorem ipsum dolor sit amet consectetur. Natoque et ipsum urna
                  tristique mi.
                </p>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Employee;
