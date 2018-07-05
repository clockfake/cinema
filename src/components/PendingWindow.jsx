import React from 'react';

export default function PendingWindow(props) {
  if (!props.status) return <div></div>
  if (props.status === 'pending') return <div className='purchase-status'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
  if (props.status === 'success') return (
    <div className='purchase-status'>
      <p>Покупка билетов успешно завершена!</p>
      <button onClick={() => props.onClick()}>Вернуться</button>
    </div>
  )
  if (props.status === 'fail') return (
    <div className='purchase-status'>
      <p>При покупке билетов возникла ошибка, попробуйте еще раз</p>
      <button onClick={() => props.onClick()}>Вернуться</button>
    </div>
  )
}
