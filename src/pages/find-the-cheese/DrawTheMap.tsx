import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

const DrawTheMap = () => {
  const [mazeArray, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [recordPositionX, setRecordPositionX] = useState(0);
  const [recordPositionY, setRecordPositionY] = useState(0);

  //Function to handle button clicked
  const handleClickStart = () => {
    setIsStarted(!isStarted);
    setRecordPositionX(currPostion[0]);
    setRecordPositionY(currPostion[1]);
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
        return <div className='bg-lime-50 md:w-16 md:h-16'></div>;
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
                onClick={() => handleClickStart()}
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

  const swap = (originalElement: any, targetElement: any) => {
    let tempElement = originalElement;
    originalElement = targetElement;
    targetElement = tempElement;
    console.log(originalElement, targetElement);

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

  const goDown = (currPostion: number[], action: string) => {
    //Validation: isOutOfBound() and isWall()
    try {
      if (isWall(mazeArray[0][currPostion[0] + 1][currPostion[1]])) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    //Validation: isGoal()
    if (isGoal(mazeArray[0][currPostion[0] + 1][currPostion[1]])) {
      mazeArray[0][currPostion[0] + 1][currPostion[1]] = 'path';
      mazeArray[0][currPostion[0]][currPostion[1]] = 'start';
    }

    let swapResult = swap(
      mazeArray[0][currPostion[0]][currPostion[1]],
      mazeArray[0][currPostion[0] + 1][currPostion[1]]
    );

    //assign value
    mazeArray[0][currPostion[0]][currPostion[1]] = swapResult[0];
    mazeArray[0][currPostion[0] + 1][currPostion[1]] = swapResult[1];

    //update mice position
    console.log('mice position: ', indexOf2d(mazeArray[0], 'start'));

    setRecordPositionX(currPostion[0] + 1);
    setRecordPositionY(currPostion[1]);
  };

  const goLeft = (currPostion: number[], action: string) => {
    //Validation: isOutOfBound() and isWall()
    try {
      if (isWall(mazeArray[0][currPostion[0]][currPostion[1] - 1])) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    //Validation: isGoal()
    if (isGoal(mazeArray[0][currPostion[0]][currPostion[1] - 1])) {
      mazeArray[0][currPostion[0]][currPostion[1] - 1] = 'path';
      mazeArray[0][currPostion[0]][currPostion[1]] = 'start';
    }

    let swapResult = swap(
      mazeArray[0][currPostion[0]][currPostion[1]],
      mazeArray[0][currPostion[0]][currPostion[1] - 1]
    );

    //assign value
    mazeArray[0][currPostion[0]][currPostion[1]] = swapResult[0];
    mazeArray[0][currPostion[0]][currPostion[1] - 1] = swapResult[1];

    //update mice position
    console.log('mice position: ', indexOf2d(mazeArray[0], 'start'));

    setRecordPositionX(currPostion[0]);
    setRecordPositionY(currPostion[1] - 1);
  };

  const goRight = (currPostion: number[], action: string) => {
    //Validation: isOutOfBound() and isWall()
    try {
      if (isWall(mazeArray[0][currPostion[0]][currPostion[1] + 1])) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    //Validation: isGoal()
    if (isGoal(mazeArray[0][currPostion[0]][currPostion[1] + 1])) {
      console.log('run here!!!');
      mazeArray[0][currPostion[0]][currPostion[1] + 1] = 'path';
      mazeArray[0][currPostion[0]][currPostion[1]] = 'start';
    }

    let swapResult = swap(
      mazeArray[0][currPostion[0]][currPostion[1]],
      mazeArray[0][currPostion[0]][currPostion[1] + 1]
    );

    //assign value
    mazeArray[0][currPostion[0]][currPostion[1]] = swapResult[0];
    mazeArray[0][currPostion[0]][currPostion[1] + 1] = swapResult[1];

    //update mice position
    console.log('mice position: ', indexOf2d(mazeArray[0], 'start'));

    setRecordPositionX(currPostion[0]);
    setRecordPositionY(currPostion[1] + 1);
  };

  const goUp = (currPostion: number[], action: string) => {
    //Validation: isOutOfBound() and isWall()
    try {
      if (isWall(mazeArray[0][currPostion[0] - 1][currPostion[1]])) {
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    //Validation: isGoal()
    if (isGoal(mazeArray[0][currPostion[0] - 1][currPostion[1]])) {
      mazeArray[0][currPostion[0] - 1][currPostion[1]] = 'path';
      mazeArray[0][currPostion[0]][currPostion[1]] = 'start';
    }

    let swapResult = swap(
      mazeArray[0][currPostion[0]][currPostion[1]],
      mazeArray[0][currPostion[0] - 1][currPostion[1]]
    );

    //assign value
    mazeArray[0][currPostion[0]][currPostion[1]] = swapResult[0];
    mazeArray[0][currPostion[0] - 1][currPostion[1]] = swapResult[1];

    //update mice position
    console.log('mice position: ', indexOf2d(mazeArray[0], 'start'));

    setRecordPositionX(currPostion[0] - 1);
    setRecordPositionY(currPostion[1]);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  let startPostion = indexOf2d(mazeArray[0], 'start');
  let currPostion = indexOf2d(mazeArray[0], 'start');

  if (isLoading) return <p>Loading...</p>;
  if (!mazeArray) return <p>No profile data</p>;

  console.log('startPostion', startPostion);
  console.log('currPostion', currPostion);

  console.log('recordMicePostion', recordPositionX, recordPositionY);

  return (
    <>
      <div className='p-4 max-w-[720px] mx-auto bg-white rounded shadow'>
        {/* Arrow Key Buttons */}
        {isStarted ? (
          <>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => goUp(currPostion, 'up')}
            >
              Up
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => goDown([recordPositionX, recordPositionY], 'down')}
            >
              Down
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => goLeft(currPostion, 'left')}
            >
              Left
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() =>
                goRight([recordPositionX, recordPositionY], 'right')
              }
            >
              Right
            </button>
          </>
        ) : null}

        {/* Map1 */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((eleY) => {
          return lineDrawer(0, eleY);
        })}
        {generateButton(1)}
        <hr />

        {/* Map2 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((eleY) => {
          return lineDrawer(1, eleY);
        })}
        {generateButton(2)}
        <hr />

        {/* Map3 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((eleY) => {
          return lineDrawer(2, eleY);
        })}
        {generateButton(3)}
        <hr />

        {/* Map4 */}
        {[0, 1, 2, 3, 4].map((eleY) => {
          return lineDrawer(3, eleY);
        })}
        {generateButton(4)}
        <hr />

        {/* Map5 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((eleY) => {
          return lineDrawer(4, eleY);
        })}
        {generateButton(5)}
        <hr />

        {/* Map6 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((eleY) => {
          return lineDrawer(5, eleY);
        })}
        {generateButton(6)}
        <hr />

        {/* Map7 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((eleY) => {
          return lineDrawer(6, eleY);
        })}
        {generateButton(7)}
        <hr />
      </div>
    </>
  );
};

export default DrawTheMap;
