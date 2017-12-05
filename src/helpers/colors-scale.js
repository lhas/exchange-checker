const colorsScale = (value) => {
  let color = 'grey';

  if (value > 1) {
    color = 'green';
  } else if(value > 0 && value < 1) {
    color = 'light-green';
  } else {
    color = 'red';
  }
}