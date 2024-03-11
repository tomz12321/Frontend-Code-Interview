import LayoutComponent from '../../layout/Layout';
import GameBoard from './GameBoard.tsx';

export default function Home() {
  return (
    <>
      <LayoutComponent>
        <header>Find the Cheese</header>
        <p>
          {"Click 'Start' to see how the mouse find the cheese by using DFS!"}
        </p>
        <p> Testing Page </p>
        <GameBoard />
      </LayoutComponent>
    </>
  );
}
