export const dateToString = date => {
  let string;
  const minutesSinceUpdate = Math.floor((Date.now() - date) / 1000 / 60);
  const hoursSinceUpdate = Math.floor(minutesSinceUpdate/60);
  const daysSinceUpdate = Math.floor(hoursSinceUpdate/24);

  const minStr = minutesSinceUpdate === 1 ? "minute" : "minutes";
  const hourStr = hoursSinceUpdate === 1 ? "hour" : "hours";
  const dayStr = daysSinceUpdate === 1 ? "day" : "days";

  if(minutesSinceUpdate < 60) {
    string = `Last updated ${Math.floor(minutesSinceUpdate)} ${minStr} ago`;
  } else if (minutesSinceUpdate >= 60 && hoursSinceUpdate < 24) {
    string = `Last updated ${Math.floor(minutesSinceUpdate/60)} ${hourStr} ago`;
  } else if (hoursSinceUpdate >= 24 && daysSinceUpdate <= 7) {
    string = `Last updated ${Math.floor(minutesSinceUpdate/60/24)} ${dayStr} ago`;
  } else {
    string = `Last updated on ${date.toString().slice(0,24)}`;
  }
  return string;
};

const sortCallback = (a, b) => {
  const dateA = new Date(a.updated_at);
  const dateB = new Date(b.updated_at);
  if(dateA < dateB) return 1;
  return -1;
};

export const sortByDate = notes => {
  const notesDup = notes.slice();
  return notesDup.sort(sortCallback);
};
