import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import axios from 'axios'

const DrawTheMap = () => {

  const [mazeArray, setData] = useState<any[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isStarted, setIsStarted] = useState(false);

  //Function to handle button clicked
  const handleClickStart = () => {
    setIsStarted(!isStarted)
  }

  //Function to draw the block element
  const draw = (el: String) => {
    switch (el) {
      case 'wall':
        return <div className='bg-green-800 md:w-16 md:h-16'></div>
      break;
      case 'path':
        return <div className='bg-black-100 md:w-16 md:h-16'></div>
      break;
      case 'correct':
        return <div className='bg-lime-50 md:w-16 md:h-16'></div>
      break;
      case 'wrong':
        return <div className='bg-white md:w-16 md:h-16'></div>
      break;
      case 'start':
        return <div className='bg-neutral-500'>
          <Image
            src='/LuRat.png'
            width={64}
            height={64}
            alt="Rat" />
        </div>
      break;
      case 'end':
        return <div className='bg-amber-400'>
          <Image
            src='/FaCheese.png'
            width={64}
            height={64}
            alt="Cheese" />
        </div>
      break;
      default:
        return <div className='bg-white md:w-16 md:h-16'></div>;
    }
  }

  //Function to draw a line with block elements
  const lineDrawer = (eleX: number, eleY: number) => {
    let result = [];
    let element = mazeArray[eleX][eleY]

    for (let i = 0; i < element.length ; i++){
      result.push(draw(element[i]))
    }
    
    return <div className='squareContainer' key={`${eleX}+','+${eleY}`}>{result}</div>
  } 

  //Function to generateButton
  const generateButton = (buttonNumber: number) => {
    return (<>
      <div className='squareContainer'>
        <div className="w-full">
          {isStarted 
            ?
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={()=>handleClickStart()}>
                {`Reset ${buttonNumber}`}
              </button>
            : 
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={()=>handleClickStart()}>
                {`Start ${buttonNumber}`}
              </button>
          }
        </div>
      </div>
    </>)
  }

  //Function to dataFetch
  const dataFetch = async () => {
    await axios.get('/api/maze')
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('error: data fetching error', error.message)
      })
  }

  useEffect(() => {
    dataFetch()
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!mazeArray) return <p>No profile data</p>

  return (
    <>
      <div className="p-4 max-w-[720px] mx-auto bg-white rounded shadow">
      
        {/* Map1 */}
        {[0,1,2,3,4,5,6,7].map((eleY) => {return lineDrawer(0,eleY)})}
        {generateButton(1)}
        <hr/>
        
        {/* Map2 */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map((eleY) => {return lineDrawer(1,eleY)})}
        {generateButton(2)}
        <hr/>

        {/* Map3 */}
        {[0,1,2,3,4,5,6,7,8,9,10].map((eleY) => {return lineDrawer(2,eleY)})}
        {generateButton(3)}
        <hr/>

        {/* Map4 */}
        {[0,1,2,3,4].map((eleY) => {return lineDrawer(3,eleY)})}
        {generateButton(4)}
        <hr/>

        {/* Map5 */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((eleY) => {return lineDrawer(4,eleY)})}
        {generateButton(5)}
        <hr/>

        {/* Map6 */}
        {[0,1,2,3,4,5,6,7,8,9,10].map((eleY) => {return lineDrawer(5,eleY)})}
        {generateButton(6)}
        <hr/>

        {/* Map7 */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map((eleY) => {return lineDrawer(6,eleY)})}
        {generateButton(7)}
        <hr/>
        
      </div>
    </>
  );
};

export default DrawTheMap;
