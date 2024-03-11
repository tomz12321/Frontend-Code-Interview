const isWall = (targetElement: any) => {
  if (targetElement === 'wall') {
    return true;
  }
  return false;
};

const isPath = (targetElement: any) => {
  if (targetElement === 'path') {
    return true;
  }
  return false;
};

const isWrong = (targetElement: any) => {
  if (targetElement === 'wrong') {
    return true;
  }
  return false;
};

const isCorrect = (targetElement: any) => {
  if (targetElement === 'correct') {
    return true;
  }
  return false;
};

export {isWall, isPath, isWrong, isCorrect}