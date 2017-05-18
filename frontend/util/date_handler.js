const dateToString = date => {
  let string;
  const minutesSinceUpdate = (Date.now() - date) / 1000 / 60;
  if(minutesSinceUpdate < 60) {
    string = `Last updated ${Math.floor(minutesSinceUpdate)} minutes ago`;
  } else if (minutesSinceUpdate >= 60 && minutesSinceUpdate/60 < 24) {
    string = `Last updated ${Math.floor(minutesSinceUpdate/60)} hours ago`;
  } else if (minutesSinceUpdate/60 >= 24 && minutesSinceUpdate < 48) {
    string = `Last updated ${Math.floor(minutesSinceUpdate/60/24)} days ago`;
  } else {
    string = `Last updated on ${date.toString().slice(0,24)}`;
  }
  return string;
};

export default dateToString;
