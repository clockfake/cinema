let filmsname=['Бойцовский клуб', 'Буч Кэссиди и Сандэнс Кид', 'Генетическая опера', 'Мост в Терабитию'];

export default function generateSessions(inputDate) {
  let i = 0;
  let n = 0;
  let date_i = new Date(inputDate.getFullYear(),inputDate.getMonth(),inputDate.getDate());
  date_i.setHours(9);
  let sessions = [];
  for (let j=0;j<7;) {
    sessions.push({
      id: n++,
      name: filmsname[i++],
      datetime:date_i.toJSON(),
      seats: Array(100).fill(false)
    });
    if (i==filmsname.length) i=0;
    date_i.setHours(date_i.getHours()+2);
    if (date_i.getHours() > 21) {
      date_i.setDate(date_i.getDate()+1);
      date_i.setHours(11);
      j++;
    }
  }
  return sessions;
}
