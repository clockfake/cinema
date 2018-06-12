import React from 'react';

export default function PendingSeat(props) {
  let row = Math.floor(props.seat/10)+1;
  let col = props.seat%10+1;
  return (
    <li className="seats__pending-item"> Ряд: {row}, Место: {col}, Цена: {props.price}</li>
  )
}
