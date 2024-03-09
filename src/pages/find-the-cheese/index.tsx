import LayoutComponent from '../../layout/Layout';
import DrawTheMap from './DrawTheMap.tsx';

export default function Home() {
  return (
    <>
      <LayoutComponent>
        <header>Find the Cheese</header>
        <p>
          {"Click 'Start' to see how the mouse find the cheese by using DFS!"}
        </p>
        <p> Testing Page </p>
        <DrawTheMap />
      </LayoutComponent>
    </>
  );
}
