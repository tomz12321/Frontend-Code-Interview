const swap = (
    isDeadEnd: boolean,
    originalElement: any,
    targetElement: any,
    action: String
  ) => {
    let tempElement = originalElement;
    originalElement = targetElement;
    targetElement = tempElement;

    if (isDeadEnd) {
      if (action === 'reverse') {
        originalElement = 'wrong';
      }
    } else originalElement = 'correct';

    return [originalElement, targetElement];
  };

  export default swap;