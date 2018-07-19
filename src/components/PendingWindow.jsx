import React from 'react';

export default function PendingWindow(props) {
  if (!props.status) return <div></div>
  if (props.status === 'pending') return <div className='purchase-status'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
  let str;
  props.status === 'success' ? str='Покупка билетов успешно завершена!' : str='При покупке билетов возникла ошибка, попробуйте еще раз';
  return (
      <div className='purchase-status'>
        <p>{str}</p>
        <button onClick={() => props.onClick()}>Вернуться</button>
      </div>
  )
}
