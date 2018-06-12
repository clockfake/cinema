import React from 'react';

export default function Session(props) {
    let options = {hour: '2-digit', minute: '2-digit'};
    let dateNow = new Date();
    const datetime = new Date(props.session.datetime);
    return (<span className={dateNow.getTime() > datetime.getTime() ? "session  session--disabled" : "session"}
              onClick={() => {
                if (dateNow.getTime() < datetime.getTime()) return props.onSelect()}}>{datetime.toLocaleString('ru',options)}</span>);
}
