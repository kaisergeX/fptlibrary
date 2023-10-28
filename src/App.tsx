import {Carousel} from '@mantine/carousel';
import {Image} from '@mantine/core';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://source.unsplash.com/user/erondu',
  'https://source.unsplash.com/user/thedanrogers',
  'https://source.unsplash.com/user/tianshu',
  'https://source.unsplash.com/user/petervanosdall',
];

function App() {
  const renderCarousel = images.map((imgSrc, index) => (
    <Carousel.Slide key={index}>
      <Image src={imgSrc} />
    </Carousel.Slide>
  ));

  return (
    <div className="container mx-auto">
      <h1 className="font-bold">Hello world!</h1>
      <Carousel
        className="bg-gray-600"
        withIndicators
        height="50vh"
        slideGap="sm"
        dragFree
        loop
        classNames={{
          root: 'group',
          indicator: 'h-2 w-2 transition-[width] data-[active]:w-5',
          controls: 'opacity-0 transition-opacity group-hover:opacity-100',
        }}
      >
        {renderCarousel}
      </Carousel>
    </div>
  );
}

export default App;
