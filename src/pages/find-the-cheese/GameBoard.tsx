import React, { useState, useEffect } from 'react';
import {
  getData,
  arrayGenerator,
  lineDrawer,
  isWall,
  isPath,
  isWrong,
  isCorrect,
  indexOf2d,
  swap
} from '@/utils';

const GameBoard = () => {
  const [mazeArray, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameSet, setIsGameSet] = useState(false);
  const [recordPositionX, setRecordPositionX] = useState(0);
  const [recordPositionY, setRecordPositionY] = useState(0);
  const [runningMapIndex, setRunningMapIndex] = useState(0);

  //Function to handle button clicked
  const handleClickStart = (runningMapIndex: number) => {
    setIsStarted(!isStarted);

    //Reset Current Position at start
    let currPostion = indexOf2d(mazeArray[runningMapIndex], 'start');

    setRecordPositionX(currPostion[0]);
    setRecordPositionY(currPostion[1]);
    setRunningMapIndex(runningMapIndex);
  };

  const handleClickGameset = () => {
    setIsGameSet(!isGameSet);
    location.reload();
  };

  const handleClickReset = () => {
    location.reload();
  };

  //Function to dataFetch
  const dataFetch = async () => {
    getData()
      .then((response: { data: React.SetStateAction<any[]> }) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error: { message: any }) => {
        console.error('error: data fetching error', error.message);
      });
  };

  const isGoal = (targetElement: any) => {
    if (targetElement === 'end') {
      setIsStarted(!isStarted);
      return true;
    }
    return false;
  };

  //Function of isDeadEnd Detector
  const isDeadEnd = (mapNumber: number, currPostion: number[]) => {
    let conditionA = false;
    let conditionB = false;
    let conditionC = false;
    let conditionD = false;

    //Condition A: see if next block downwards is a wall or correct (breadcrumb)
    try {
      if (isWall(mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]])) {
        conditionA = true;
      }

      if (isWrong(mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]])) {
        conditionA = true;
      }

      if (isCorrect(mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]])) {
        conditionA = true;
      }
    } catch (e) {
      console.log(e);
      conditionA = true; //isOutOfBound
    }

    //Condition B: see if next block upwards is a wall or correct (breadcrumb)
    try {
      if (isWall(mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]])) {
        conditionB = true;
      }

      if (isWrong(mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]])) {
        conditionB = true;
      }

      if (isCorrect(mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]])) {
        conditionB = true;
      }
    } catch (e) {
      console.log(e);
      conditionB = true; //isOutOfBound
    }

    //Condition C: see if next leftly block is a wall or correct (breadcrumb)
    try {
      if (isWall(mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1])) {
        conditionC = true;
      }

      if (isWrong(mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1])) {
        conditionC = true;
      }

      if (isCorrect(mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1])) {
        conditionC = true;
      }
    } catch (e) {
      console.log(e);
      conditionC = true; //isOutOfBound
    }

    //Condition D: see if next rightly block is a wall or correct (breadcrumb)
    try {
      if (isWall(mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1])) {
        conditionD = true;
      }

      if (isWrong(mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1])) {
        conditionD = true;
      }

      if (isCorrect(mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1])) {
        conditionD = true;
      }
    } catch (e) {
      console.log(e);
      conditionD = true; //isOutOfBound
    }

    if (conditionA && conditionB && conditionC && conditionD) {
      return true;
    } else {
      return false;
    }
  };

  const dfsRunner = (mazeArray: any, mapNumber: number) => {
    try {
      if (isGoal(mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1])) {
        goLeft(mapNumber, [currPostion[0], currPostion[1]], 'left');
        return;
      }

      if (isPath(mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1])) {
        goLeft(mapNumber, [currPostion[0], currPostion[1]], 'left');
        return;
      }
    } catch (e) {
      console.log(e); //isOutOfBound
    }

    try {
      if (isGoal(mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]])) {
        goDown(mapNumber, [currPostion[0], currPostion[1]], 'down');
        return;
      }

      if (isPath(mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]])) {
        goDown(mapNumber, [currPostion[0], currPostion[1]], 'down');
        return;
      }
    } catch (e) {
      console.log(e); //isOutOfBound
    }

    try {
      if (isGoal(mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1])) {
        goRight(mapNumber, [currPostion[0], currPostion[1]], 'right');
        return;
      }

      if (isPath(mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1])) {
        goRight(mapNumber, [currPostion[0], currPostion[1]], 'right');
        return;
      }
    } catch (e) {
      console.log(e); //isOutOfBound
    }

    try {
      if (isGoal(mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]])) {
        goUp(mapNumber, [currPostion[0], currPostion[1]], 'up');
        return;
      }
      if (isPath(mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]])) {
        goUp(mapNumber, [currPostion[0], currPostion[1]], 'up');
        return;
      }
    } catch (e) {
      console.log(e); //isOutOfBound
    }

    //Try Reverse and go up
    try {
      if (isCorrect(mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]])) {
        goUp(mapNumber, [currPostion[0], currPostion[1]], 'up');
        return;
      }
    } catch (e) {
      console.log(e); //isOutOfBound
    }

    //Try Reverse and go right
    try {
      if (isCorrect(mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1])) {
        goRight(mapNumber, [currPostion[0], currPostion[1]], 'right');
        return;
      }
    } catch (e) {
      console.log(e); //isOutOfBound
    }

    //Try Reverse back and go down
    try {
      if (isCorrect(mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]])) {
        goDown(mapNumber, [currPostion[0], currPostion[1]], 'down');
        return;
      }
    } catch (e) {
      console.log(e); //isOutOfBound
    }

    //Try Reverse and go left
    try {
      if (isCorrect(mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1])) {
        goLeft(mapNumber, [currPostion[0], currPostion[1]], 'left');
        return;
      }
    } catch (e) {
      console.log(e); //isOutOfBound
    }
  };

  const goDown = (mapNumber: number, currPostion: number[], action: string) => {
    //Validation: isOutOfBound() and isWall()
    try {
      if (isWall(mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]])) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    //Validation: isGoal()
    if (isGoal(mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]])) {
      mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]] = 'path';
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = 'start';
      setIsGameSet(true)
    }

    //Validation: isDeadEnd
    if (isDeadEnd(mapNumber, [currPostion[0], currPostion[1]])) {
      let swapResult = swap(
        isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
        mazeArray[mapNumber][currPostion[0]][currPostion[1]],
        mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]],
        'reverse'
      );

      //Action: Assign value
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
      mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]] = swapResult[1];
    } else {
      let swapResult = swap(
        isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
        mazeArray[mapNumber][currPostion[0]][currPostion[1]],
        mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]],
        'forward'
      );

      //Action: Assign value
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
      mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]] = swapResult[1];
    }

    //Action: Update recordPositionX and recordPositionY and trigger re-render
    setRecordPositionX(currPostion[0] + 1);
    setRecordPositionY(currPostion[1]);
  };

  const goLeft = (mapNumber: number, currPostion: number[], action: string) => {
    //Validation: isOutOfBound() and isWall()
    try {
      if (isWall(mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1])) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    //Validation: isGoal()
    if (isGoal(mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1])) {
      mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1] = 'path';
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = 'start';
      setIsGameSet(true)
    }

    //Validation: isDeadEnd
    if (isDeadEnd(mapNumber, [currPostion[0], currPostion[1]])) {
      let swapResult = swap(
        isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
        mazeArray[mapNumber][currPostion[0]][currPostion[1]],
        mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1],
        'reverse'
      );

      //Action: Assign value
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
      mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1] = swapResult[1];
    } else {
      let swapResult = swap(
        isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
        mazeArray[mapNumber][currPostion[0]][currPostion[1]],
        mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1],
        'forward'
      );

      //Action: Assign value
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
      mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1] = swapResult[1];
    }

    //Action: Update recordPositionX and recordPositionY and trigger re-render
    setRecordPositionX(currPostion[0]);
    setRecordPositionY(currPostion[1] - 1);
  };

  const goRight = (
    mapNumber: number,
    currPostion: number[],
    action: string
  ) => {
    //Validation: isOutOfBound() and isWall()
    try {
      if (isWall(mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1])) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    //Validation: isGoal()
    if (isGoal(mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1])) {
      mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1] = 'path';
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = 'start';
      setIsGameSet(true)
    }

    //Validation: isDeadEnd
    if (isDeadEnd(mapNumber, [currPostion[0], currPostion[1]])) {
      let swapResult = swap(
        isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
        mazeArray[mapNumber][currPostion[0]][currPostion[1]],
        mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1],
        'reverse'
      );

      //Action: Assign value
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
      mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1] = swapResult[1];
    } else {
      let swapResult = swap(
        isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
        mazeArray[mapNumber][currPostion[0]][currPostion[1]],
        mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1],
        'forward'
      );

      //Action: Assign value
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
      mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1] = swapResult[1];
    }

    //Action: Update recordPositionX and recordPositionY and trigger re-render
    setRecordPositionX(currPostion[0]);
    setRecordPositionY(currPostion[1] + 1);
  };

  const goUp = (mapNumber: number, currPostion: number[], action: string) => {
    //Validation: isOutOfBound() and isWall()
    try {
      if (isWall(mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]])) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    //Validation: isGoal()
    if (isGoal(mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]])) {
      mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]] = 'path';
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = 'start';
      setIsGameSet(true)
    }

    //Validation: isDeadEnd
    if (isDeadEnd(mapNumber, [currPostion[0], currPostion[1]])) {
      let swapResult = swap(
        isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
        mazeArray[mapNumber][currPostion[0]][currPostion[1]],
        mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]],
        'reverse'
      );

      //Action: Assign value
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
      mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]] = swapResult[1];
    } else {
      let swapResult = swap(
        isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
        mazeArray[mapNumber][currPostion[0]][currPostion[1]],
        mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]],
        'forward'
      );

      //Action: Assign value
      mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
      mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]] = swapResult[1];
    }

    //Action: Update recordPositionX and recordPositionY and trigger re-render
    setRecordPositionX(currPostion[0] - 1);
    setRecordPositionY(currPostion[1]);
  };

  //Function to generate Start and Reset buttons
  const buttonsGenerator = (buttonNumber: number) => {
    return (
      <>
        <div className='blockContainer'>
          <div className='w-full'>
            {isStarted ? (
              <button
                className='bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded w-full'
                onClick={() => handleClickReset()}
              >
                Reset
              </button>
            ) : isGameSet ? 
            <button
              className='bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded w-full'
              onClick={() => handleClickGameset()}
            >
              Gameset
            </button>
          : (
              <button
                className='bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded w-full'
                onClick={() => handleClickStart(buttonNumber)}
              >
                Start
              </button>
            )}
          </div>
        </div>
      </>
    );
  };

  //Function to generate mouseEvent buttons
  const mouseEventButtonsGenerator = (runningMapIndex: number) => {
    return (
      <>
        <button
          className='bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded'
          onMouseEnter={() => dfsRunner(mazeArray, runningMapIndex)}
        >
          DFS Runner
        </button>
      </>
    );
  };

  useEffect(() => {
    dataFetch();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!mazeArray) return <p>No profile data</p>;

  //refresh currPostion
  const currPostion = [recordPositionX, recordPositionY];

  return (
    <>
      <div className='p-4 max-w-[720px] mx-auto bg-white rounded shadow'>
        {/* MouseEvent Buttons */}
        {isStarted && !isGameSet && runningMapIndex === 0
          ? mouseEventButtonsGenerator(0)
          : null}

        {/* Map1 */}
        {arrayGenerator(8).map((eleY) => {
          return lineDrawer(mazeArray, 0, eleY);
        })}
        {buttonsGenerator(0)}
        <hr />

        {/* MouseEvent Buttons */}
        {isStarted && !isGameSet && runningMapIndex === 1
          ? mouseEventButtonsGenerator(1)
          : null}
        {/* Map2 */}
        {arrayGenerator(12).map((eleY) => {
          return lineDrawer(mazeArray, 1, eleY);
        })}
        {buttonsGenerator(1)}
        <hr />

        {/* MouseEvent Buttons */}
        {isStarted && !isGameSet && runningMapIndex === 2
          ? mouseEventButtonsGenerator(2)
          : null}
        {/* Map3 */}
        {arrayGenerator(11).map((eleY) => {
          return lineDrawer(mazeArray, 2, eleY);
        })}
        {buttonsGenerator(2)}
        <hr />

        {/* MouseEvent Buttons */}
        {isStarted && !isGameSet && runningMapIndex === 3
          ? mouseEventButtonsGenerator(3)
          : null}
        {/* Map4 */}
        {arrayGenerator(5).map((eleY) => {
          return lineDrawer(mazeArray, 3, eleY);
        })}
        {buttonsGenerator(3)}
        <hr />

        {/* MouseEvent Buttons */}
        {isStarted && !isGameSet && runningMapIndex === 4
          ? mouseEventButtonsGenerator(4)
          : null}
        {/* Map5 */}
        {arrayGenerator(13).map((eleY) => {
          return lineDrawer(mazeArray, 4, eleY);
        })}
        {buttonsGenerator(4)}
        <hr />

        {/* MouseEvent Buttons */}
        {isStarted && !isGameSet && runningMapIndex === 5
          ? mouseEventButtonsGenerator(5)
          : null}
        {/* Map6 */}
        {arrayGenerator(11).map((eleY) => {
          return lineDrawer(mazeArray, 5, eleY);
        })}
        {buttonsGenerator(5)}
        <hr />

        {/* MouseEvent Buttons */}
        {isStarted && !isGameSet && runningMapIndex === 6
          ? mouseEventButtonsGenerator(6)
          : null}
        {/* Map7 */}
        {arrayGenerator(14).map((eleY) => {
          return lineDrawer(mazeArray, 6, eleY);
        })}
        {buttonsGenerator(6)}
        <hr />
      </div>
    </>
  );
};

export default GameBoard;
