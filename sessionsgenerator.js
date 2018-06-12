const filmsname=['Бойцовский клуб', 'Буч Кэссиди и Сандэнс Кид', 'Генетическая опера', 'Мост в Терабитию', 'Славные парни'];
let importedData = [];

const generateSessions = {
  generate: function(inputDate) {
    let i = 0;
    let n = 0;
    let date_i = new Date(inputDate.getFullYear(),inputDate.getMonth(),inputDate.getDate());
    date_i.setHours(9);
    let sessions = [];
    for (let j=0;j<15;) {
      let seats = Array.from({length: 100}, () => Math.random()*4 < 1);
      sessions.push({
        id: n++,
        name: filmsname[i++],
        datetime:date_i.toJSON(),
        seats: [...seats],
        cost: 300
      });
      if (i==filmsname.length) i=0;
      if (date_i.getHours() >= 22) {
        date_i.setDate(date_i.getDate()+1);
        date_i.setHours(Math.random()>0.5? 6 : 7);
        j++;
      }
      date_i.setHours(date_i.getHours()+2);
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(sessions), 1500);
    });
  },
  storeChanges: function(payload) {
    importedData.push(payload);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('success'), 1500);
    })
  }
}

export default generateSessions;
