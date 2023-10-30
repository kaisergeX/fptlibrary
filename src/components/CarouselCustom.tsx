import {type ReactNode, useRef} from 'react';
import {Image, type ImageProps} from '@mantine/core';
import {Carousel, type CarouselProps} from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

type CarouselCustomProps = CarouselProps & {
  contents?: {id: string; content: ReactNode}[];
  className?: string;
  images?: string[];
  imageProps?: Omit<ImageProps, 'src'> & {alt?: string};
  autoPlay?: number;
};

/**
 * An customizable Carousel component.
 *___
 * @param images array of urls or imported asset images for a slide of images.
 * @param imageProps custom props for `images`. It will be useless when render customize content with `contents`.
 * @param contents allow to fully customizable the Carousel's contents, which is higher priority than `images`.
 * @param autoPlay miliseconds between each time the Carousel auto next slide. `0` or `undefined` means no autoplay.
 *
 * @param carouselAttributes override default config of this Carousel component. ref: [docs](https://mantine.dev/others/carousel/).
 *
 * @default carouselAttributes: {loop: true, withIndicators: true, slideSize: "100%", slideGap: "sm", align: "center"}
 */
const CarouselCustom = ({
  contents,
  images,
  imageProps,
  autoPlay,
  ...carouselAttributes
}: CarouselCustomProps) => {
  const {current: autoplayPlugin} = useRef(autoPlay ? Autoplay({delay: autoPlay}) : undefined);

  const renderImageSlides = images?.map((image, index) => (
    <Carousel.Slide key={image}>
      <Image
        src={image}
        fallbackSrc="https://placehold.co/600x400?text=\n"
        alt={`Carousel image ${index}`}
        {...imageProps}
        loading="lazy"
      />
    </Carousel.Slide>
  ));

  const renderCustomSlides = contents?.map(({id, content}) => (
    <Carousel.Slide key={id}>{content}</Carousel.Slide>
  ));

  return (
    <Carousel
      classNames={{
        root: 'group',
        indicator: 'h-2 w-2 transition-[width] data-[active]:w-5 hidden sm:inline-block',
        controls: 'opacity-0 transition-opacity group-hover:opacity-100',
      }}
      withIndicators
      loop
      align="center"
      slideGap="sm"
      {...carouselAttributes}
      {...(autoplayPlugin
        ? {
            plugins: [autoplayPlugin],
            onMouseEnter: autoplayPlugin.stop,
            onMouseLeave: autoplayPlugin.reset,
          }
        : {})}
    >
      {contents ? renderCustomSlides : renderImageSlides}
    </Carousel>
  );
};

export default CarouselCustom;
