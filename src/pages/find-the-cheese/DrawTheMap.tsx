import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

const DrawTheMap = () => {
  const [mazeArray, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
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

  const handleClickReset = () => {
    location.reload();
  };

  //Function to draw the block element
  const draw = (el: String) => {
    switch (el) {
      case 'wall':
        return <div className='bg-green-800 md:w-16 md:h-16'></div>;
        break;
      case 'path':
        return <div className='bg-lime-50 md:w-16 md:h-16'></div>;
        break;
      case 'correct':
        return <div className='bg-amber-200 md:w-16 md:h-16'></div>;
        break;
      case 'wrong':
        return <div className='bg-black md:w-16 md:h-16'></div>;
        break;
      case 'start':
        return (
          <div className='bg-neutral-500'>
            <Image src='/LuRat.png' width={64} height={64} alt='Rat' />
          </div>
        );
        break;
      case 'end':
        return (
          <div className='bg-amber-400'>
            <Image src='/FaCheese.png' width={64} height={64} alt='Cheese' />
          </div>
        );
        break;
      default:
        return <div className='bg-white md:w-16 md:h-16'></div>;
    }
  };

  //Function to draw a line with block elements
  const lineDrawer = (eleX: number, eleY: number) => {
    let result = [];
    let element = mazeArray[eleX][eleY];

    for (let i = 0; i < element.length; i++) {
      result.push(draw(element[i]));
    }

    return (
      <div className='squareContainer' key={`${eleX}+','+${eleY}`}>
        {result}
      </div>
    );
  };

  //Function to generateButton
  const generateButton = (buttonNumber: number) => {
    return (
      <>
        <div className='squareContainer'>
          <div className='w-full'>
            {isStarted ? (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                onClick={() => handleClickReset()}
              >
                {`Reset ${buttonNumber}`}
              </button>
            ) : (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                onClick={() => handleClickStart(buttonNumber - 1)}
              >
                {`Start ${buttonNumber}`}
              </button>
            )}
          </div>
        </div>
      </>
    );
  };

  //Function to dataFetch
  const dataFetch = async () => {
    await axios
      .get('/api/maze')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('error: data fetching error', error.message);
      });
  };

  const isWall = (targetElement: any) => {
    if (targetElement === 'wall') {
      console.log('== The mice hit the wall! ==');
      return true;
    }
    return false;
  };

  const isGoal = (targetElement: any) => {
    if (targetElement === 'end') {
      console.log('== Congratulations! ==');
      setIsStarted(!isStarted);
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
      return (conditionA = true); //isOutOfBound
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
      console.log(
        'isWall C:',
        mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1]
      );
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

    console.log(
      'conditionA && conditionB && conditionC && conditionD:',
      conditionA && conditionB && conditionC && conditionD
    );
    console.log('conditionA: ', conditionA);
    console.log('conditionB: ', conditionB);
    console.log('conditionC: ', conditionC);
    console.log('conditionD: ', conditionD);
    if (conditionA && conditionB && conditionC && conditionD) {
      return true;
    } else {
      return false;
    }
  };

  const swap = (
    isDeadEnd: boolean,
    originalElement: any,
    targetElement: any
  ) => {
    let tempElement = originalElement;
    originalElement = targetElement;
    targetElement = tempElement;
    console.log(originalElement, targetElement);

    console.log('=== isDeadEnd: ===', isDeadEnd);
    if (isDeadEnd) {
      originalElement = 'wrong';
    } else originalElement = 'correct';

    return [originalElement, targetElement];
  };

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
    }

    let swapResult = swap(
      isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
      mazeArray[mapNumber][currPostion[0]][currPostion[1]],
      mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]]
    );

    //assign value
    mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
    mazeArray[mapNumber][currPostion[0] + 1][currPostion[1]] = swapResult[1];

    //update mice position
    console.log('mice position: ', indexOf2d(mazeArray[mapNumber], 'start'));

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
    }

    let swapResult = swap(
      isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
      mazeArray[mapNumber][currPostion[0]][currPostion[1]],
      mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1]
    );

    //assign value
    mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
    mazeArray[mapNumber][currPostion[0]][currPostion[1] - 1] = swapResult[1];

    //update mice position
    console.log('mice position: ', indexOf2d(mazeArray[mapNumber], 'start'));

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
    }

    let swapResult = swap(
      isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
      mazeArray[mapNumber][currPostion[0]][currPostion[1]],
      mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1]
    );

    //assign value
    mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
    mazeArray[mapNumber][currPostion[0]][currPostion[1] + 1] = swapResult[1];

    //update mice position
    console.log('mice position: ', indexOf2d(mazeArray[mapNumber], 'start'));

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
    }

    let swapResult = swap(
      isDeadEnd(mapNumber, [currPostion[0], currPostion[1]]),
      mazeArray[mapNumber][currPostion[0]][currPostion[1]],
      mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]]
    );

    //assign value
    mazeArray[mapNumber][currPostion[0]][currPostion[1]] = swapResult[0];
    mazeArray[mapNumber][currPostion[0] - 1][currPostion[1]] = swapResult[1];

    //update mice position
    console.log('mice position: ', indexOf2d(mazeArray[mapNumber], 'start'));

    setRecordPositionX(currPostion[0] - 1);
    setRecordPositionY(currPostion[1]);
  };

  const arrayGenerator = (maxLength: number) => {
    let createdArray = [];
    for (let i = 0; i < maxLength; i++) {
      createdArray.push(i);
    }

    return createdArray;
  };

  const arrowKeyButtonsGenerator = (runningMapIndex: number) => {
    return (
      <>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() =>
            goUp(runningMapIndex, [recordPositionX, recordPositionY], 'up')
          }
        >
          Up
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() =>
            goDown(runningMapIndex, [recordPositionX, recordPositionY], 'down')
          }
        >
          Down
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() =>
            goLeft(runningMapIndex, [recordPositionX, recordPositionY], 'left')
          }
        >
          Left
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() =>
            goRight(
              runningMapIndex,
              [recordPositionX, recordPositionY],
              'right'
            )
          }
        >
          Right
        </button>
      </>
    );
  };

  useEffect(() => {
    dataFetch();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!mazeArray) return <p>No profile data</p>;

  let startPostion = indexOf2d(mazeArray[runningMapIndex], 'start');
  let currPostion = indexOf2d(mazeArray[runningMapIndex], 'start');

  console.log('startPostion', startPostion);
  console.log('currPostion', currPostion);

  console.log('recordMicePostion', recordPositionX, recordPositionY);
  console.log('runningMapIndex', runningMapIndex);

  return (
    <>
      <div className='p-4 max-w-[720px] mx-auto bg-white rounded shadow'>
        {/* Arrow Key Buttons */}
        {isStarted && runningMapIndex === 0
          ? arrowKeyButtonsGenerator(0)
          : null}

        {/* Map1 */}
        {arrayGenerator(8).map((eleY) => {
          return lineDrawer(0, eleY);
        })}
        {generateButton(1)}
        <hr />

        {/* Arrow Key Buttons */}
        {isStarted && runningMapIndex === 1
          ? arrowKeyButtonsGenerator(1)
          : null}
        {/* Map2 */}
        {arrayGenerator(12).map((eleY) => {
          return lineDrawer(1, eleY);
        })}
        {generateButton(2)}
        <hr />

        {/* Arrow Key Buttons */}
        {isStarted && runningMapIndex === 2
          ? arrowKeyButtonsGenerator(2)
          : null}
        {/* Map3 */}
        {arrayGenerator(11).map((eleY) => {
          return lineDrawer(2, eleY);
        })}
        {generateButton(3)}
        <hr />

        {/* Arrow Key Buttons */}
        {isStarted && runningMapIndex === 3
          ? arrowKeyButtonsGenerator(3)
          : null}
        {/* Map4 */}
        {arrayGenerator(5).map((eleY) => {
          return lineDrawer(3, eleY);
        })}
        {generateButton(4)}
        <hr />

        {/* Arrow Key Buttons */}
        {isStarted && runningMapIndex === 4
          ? arrowKeyButtonsGenerator(4)
          : null}
        {/* Map5 */}
        {arrayGenerator(13).map((eleY) => {
          return lineDrawer(4, eleY);
        })}
        {generateButton(5)}
        <hr />

        {/* Arrow Key Buttons */}
        {isStarted && runningMapIndex === 5
          ? arrowKeyButtonsGenerator(5)
          : null}
        {/* Map6 */}
        {arrayGenerator(11).map((eleY) => {
          return lineDrawer(5, eleY);
        })}
        {generateButton(6)}
        <hr />

        {/* Arrow Key Buttons */}
        {isStarted && runningMapIndex === 6
          ? arrowKeyButtonsGenerator(6)
          : null}
        {/* Map7 */}
        {arrayGenerator(14).map((eleY) => {
          return lineDrawer(6, eleY);
        })}
        {generateButton(7)}
        <hr />
      </div>
    </>
  );
};

export default DrawTheMap;
