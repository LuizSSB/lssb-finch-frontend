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
      username: null,
      password: null,
      email: null,
      sessionId: null
    }),
    SearchProtestRequest: _new({
      limit: null,
      offset: null,
      debtor: null,
      bank: null,
      minValue: null,
      maxValue: null
    }),
    UpdateProtestRequest: _new({
      protest: null,
      updatesRefenreces: true
    }),
    UploadProtestsRequest: _new({
      textContents: null
    })
  },
};