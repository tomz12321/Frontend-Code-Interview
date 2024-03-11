import Image from 'next/image';

//Function to draw the block element
const blockDrawer = (el: String) => {
    switch (el) {
      case 'wall':
        return <div className='bg-green-800 md:w-16 md:h-16'></div>;
      case 'path':
        return <div className='bg-lime-50 md:w-16 md:h-16'></div>;
      case 'correct':
        return <div className='bg-amber-200 md:w-16 md:h-16'></div>;
      case 'wrong':
        return <div className='bg-black md:w-16 md:h-16'></div>;
      case 'start':
        return (
          <div className='bg-neutral-500'>
            <Image src='/LuRat.png' width={64} height={64} alt='Rat' />
          </div>
        );
      case 'end':
        return (
          <div className='bg-amber-400'>
            <Image src='/FaCheese.png' width={64} height={64} alt='Cheese' />
          </div>
        );
      default:
        return <div className='bg-white md:w-16 md:h-16'></div>;
    }
  };

  //Function to draw a line with block elements
  const lineDrawer = (mazeArray: any, eleX: number, eleY: number) => {
    let result = [];
    let element = mazeArray[eleX][eleY];

    for (let i = 0; i < element.length; i++) {
      result.push(blockDrawer(element[i]));
    }

    return (
      <div className='blockContainer' key={`${eleX}+','+${eleY}`}>
        {result}
      </div>
    );
  };

  export {lineDrawer, blockDrawer}