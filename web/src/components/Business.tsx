import React, {useEffect, useState} from 'react';
import './App.css';
import info2 from '../images/info2.png';
import dollar from '../images/dolartexture.png';

import deposit from '../images/deposit.png';
import withdraw from '../images/withdraw.png';
import Dialog from './Dialog';

const Business: React.FC<any> = (data) => {
  const [modalData, setModalData] = useState<any | null>([]);
  const [showModal, setShowModal] = useState(false);

  const [history, setHistory] = useState<any | null>([]);

  // Deposit
  const [depositAmount, setDepositAmount] = useState<any | null>();

  // WITHDRAW
  const [withdrawAmount, setWithdrawAmount] = useState<any | null>();
  function Modal(amount: number, content: string, action: string) {
    setModalData([
      {
        amount: amount,
        content: content,
        action: action,
      },
    ]);
    setShowModal(true);
  }
  function format(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  useEffect(() => {
    setHistory(data.history.reverse());
  }, []);

  return (
    <div className="BusinessPart">
      {showModal == true ? <Dialog info={modalData}></Dialog> : ''}

      <div className="BusinessPartSide">
        <p
          style={{
            color: 'white',
            paddingBottom: '0.5vw',
            fontFamily: 'Barlow',
            fontWeight: '500',
            fontSize: 'calc(10px + 0.4vw)',
            marginTop: '0.5vw',
          }}>
          Company Account Money
        </p>
        <div className="BusinessBox">
          <div className="BusinessBoxHeader" style={{height: '100%'}}>
            <span>
              <h1>COMPANY MONEY</h1>
              <p>Company Bank </p>
            </span>
            <span style={{zIndex: '100'}}>
              <img src={info2}></img>
            </span>
          </div>
          <div className="BusinessBoxAmount">
            <p>$ {format(data.receivedBusinessData.amount)}</p>
          </div>
          <img className="businessDollarImg" src={dollar}></img>
        </div>
        <div style={{display: 'flex', gap: '1vw', width: '100%'}}>
          <div style={{width: '100%'}}>
            <p
              style={{
                color: 'white',
                fontFamily: 'Barlow',
                fontWeight: '500',
                fontSize: 'calc(10px + 0.4vw)',
                marginBottom: '0.5vw',
              }}>
              Company Withdraw Money
            </p>
            <div
              className="BusinessBox"
              style={{width: '100%', paddingBottom: '0.5vw'}}>
              <div className="BusinessBoxHeader" style={{height: '100%'}}>
                <span>
                  <h1
                    style={{
                      color: '#E04949',
                      fontWeight: '600',
                      fontSize: 'calc(12px + 0.4vw)',
                    }}>
                    Withdraw Money
                  </h1>
                  <p style={{fontSize: 'calc(6px + 0.4vw)'}}>
                    Lorem ipsum dolor sit amet consect Lacus sem sed
                  </p>
                </span>
              </div>
              <div className="flex" style={{width: '100%'}}>
                <input
                  className="numInput"
                  onChange={(e: any) => {
                    setWithdrawAmount(e.target.value);
                  }}
                  type="number"
                  placeholder="Amount"></input>
              </div>
              <div className="flex" style={{width: '100%'}}>
                <button
                  onClick={() => {
                    Modal(
                      withdrawAmount,
                      'Are you sure you want to perform this action?',
                      'withdraw'
                    );
                  }}
                  style={{
                    border: '0.14vw solid rgba(205, 52, 52, 0.5)',
                    background: 'rgba(205, 52, 52, 0.2)',
                    color: 'rgba(239, 128, 128, 0.49)',
                  }}
                  className="ActionButton">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
          <div style={{width: '100%'}}>
            <p
              style={{
                color: 'white',
                fontFamily: 'Barlow',
                fontWeight: '500',
                fontSize: 'calc(10px + 0.4vw)',
                marginBottom: '0.5vw',
              }}>
              Company Deposit Money
            </p>
            <div
              className="BusinessBox"
              style={{width: '100%', paddingBottom: '0.5vw'}}>
              <div className="BusinessBoxHeader" style={{height: '100%'}}>
                <span>
                  <h1
                    style={{
                      color: '#24DD7A',
                      fontWeight: '600',
                      fontSize: 'calc(12px + 0.4vw)',
                    }}>
                    Deposit Money
                  </h1>
                  <p style={{fontSize: 'calc(6px + 0.4vw)'}}>
                    Lorem ipsum dolor sit amet consect Lacus sem sed
                  </p>
                </span>
              </div>
              <div className="flex" style={{width: '100%'}}>
                <input
                  className="numInput"
                  onChange={(e: any) => {
                    setDepositAmount(e.target.value);
                  }}
                  type="number"
                  placeholder="Amount"></input>
              </div>
              <div className="flex" style={{width: '100%'}}>
                <button
                  onClick={() => {
                    Modal(
                      depositAmount,
                      'Are you sure you want to perform this action?',
                      'deposit'
                    );
                  }}
                  style={{
                    border: '0.14vw solid rgba(36, 221, 122, 0.5)',
                    background: 'rgba(36, 221, 122, 0.2)',
                    color: 'rgba(153, 255, 200, 0.49)',
                  }}
                  className="ActionButton">
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="BusinessPartSide">
        <p
          style={{
            color: 'white',
            paddingBottom: '0.5vw',
            fontFamily: 'Barlow',
            fontWeight: '500',
            fontSize: 'calc(10px + 0.4vw)',
            marginTop: '0.5vw',
          }}>
          Company Transaction History
        </p>
        <div className="TransactionList">
          {history.map((e: any) => {
            return (
              <div className="TransactionRow">
                <span
                  style={{
                    paddingLeft: '1vw',
                    display: 'flex',
                    gap: '0.7vw',
                    alignItems: 'center',
                    width: '8vw',
                  }}>
                  {e.action.toLowerCase() == 'withdraw' ? (
                    <img src={withdraw}></img>
                  ) : (
                    <img src={deposit}></img>
                  )}
                  <p
                    style={{
                      color: 'white',
                      fontSize: 'calc(10px + 0.4vw)',
                      fontWeight: '500',
                    }}>
                    {e.action}
                  </p>
                </span>
                <span>
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.59)',
                      fontSize: 'calc(6.4px + 0.4vw)',
                    }}>
                    {e.note}
                  </p>
                </span>
                <span style={{width: '8vw', textAlign: 'right'}}>
                  <p
                    style={{
                      fontWeight: '600',
                      fontSize: 'calc(11px + 0.4vw)',
                      color:
                        e.action.toLowerCase() == 'deposit'
                          ? '#E04949'
                          : '#24DD7A',
                      paddingRight: '0.5vw',
                    }}>
                    ${format(e.amount)}
                  </p>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Business;
