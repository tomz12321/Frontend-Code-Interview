import Layout from '../../layout';
import GameBoard from './GameBoard.tsx';

const FindTheCheese = () => {
  return (
    <>
      <Layout>
      <div className='p-4 max-w-[720px] mx-auto bg-white rounded shadow'>
        <p> What we achieve here: </p>
        <li>Find the Cheese:</li>
        <li>
          {
            "Click 'Start' and Use the 'Mouse Cursor' to move on the DFS Runner button and see how the mouse find the cheese by using DFS!"
          }
        </li>
        <li>This is our demo page. </li>
        </div>
        <GameBoard />
      </Layout>
    </>
  );
};

export default FindTheCheese;
