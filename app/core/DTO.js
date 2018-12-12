function _new (base) {
  return function (data) {
    const newObj = Object.assign({}, base);
    for (var key in newObj) {
      if (data[key]) {
        newObj[key] = data[key];
      }
    }
    return newObj;
  };
}

const DTO = {
  new: {
    User: _new({
      username: '',
      password: '',
      email: '',
      sessionId: ''
    })
  },
};