const invert = (obj) => {
  let new_obj = {};

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop;
    }
  }

  return new_obj;
};

export default invert;
