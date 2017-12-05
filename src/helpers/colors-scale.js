const colorsScale = (value) => {
  let color = 'grey';

  if (value > 1) {
    color = 'green';
  } else if(value > 0 && value < 1) {
    color = 'lightgreen';
  } else {
    color = 'red';
  }

  return color;
}

export default colorsScale;
