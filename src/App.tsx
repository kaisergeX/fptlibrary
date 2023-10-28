import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {Carousel} from '@mantine/carousel';
import {Button, Image} from '@mantine/core';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Button variant="filled">Button</Button>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Carousel
        className="bg-gray-600"
        withIndicators
        height="100%"
        slideGap="sm"
        dragFree
        loop
        classNames={{
          root: 'group',
          indicator: 'h-2 w-2 transition-[width] data-[active]:w-5',
          controls: 'opacity-0 transition-opacity group-hover:opacity-100',
        }}
      >
        <Carousel.Slide>
          <Image src="https://covers.openlibrary.org/b/id/1-M.jpg" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src="https://covers.openlibrary.org/b/id/2-M.jpg" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src="https://covers.openlibrary.org/b/id/3-M.jpg" />
        </Carousel.Slide>
      </Carousel>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
