const indexOf2d = (arr: any[], val: string) => {
    var index = [-1, -1];
    if (!Array.isArray(arr)) {
      return index;
    }
    arr.some(function (sub, posX) {
      if (!Array.isArray(sub)) {
        return false;
      }
      var posY = sub.indexOf(val);
      if (posY !== -1) {
        index[0] = posX;
        index[1] = posY;
        return true;
      }
      return false;
    });

    return index;
  };

  export default indexOf2d;