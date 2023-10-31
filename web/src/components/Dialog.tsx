import React, {useEffect, useState} from 'react';
import './App.css';
import {fetchNui} from '../utils/fetchNui';

const Dialog: React.FC<any> = (data) => {
  const [showDialog, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [data]);

  function format(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function buttonClicked(type: string) {
    if (type === 'confirm') {
      fetchNui<any>('postAction', JSON.stringify(data)).then((retData) => {
        if (retData) {
          setShow(false);
        }
      });
    } else {
      setShow(false);
    }
  }

  return (
    <div
      className="DialogPop"
      style={{display: showDialog == true ? 'flex' : 'none'}}>
      <div className="DialogDiv">
        <div className="DialogHeader">
          <h1>{data.info[0].action} Money</h1>
        </div>
        <div className="DialogContent">
          <h1 style={{color: '#24DD7A'}}>
            ${format(data.info[0].amount)} Money
          </h1>
          <p>{data.info[0].content}</p>
        </div>
        <div className="DialogActions">
          <button
            onClick={() => {
              buttonClicked('cancel');
            }}
            style={{
              background: 'rgba(222, 64, 64, 0.2)',
              border: '0.12vw solid rgba(222, 64, 64, 0.5)',
            }}>
            Cancel
          </button>
          <button
            onClick={() => {
              buttonClicked('confirm');
            }}
            style={{
              background: 'rgba(36, 221, 122, 0.2)',
              border: '0.12vw solid rgba(36, 221, 122, 0.5)',
            }}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;