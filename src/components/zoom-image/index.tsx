import Zoom from 'react-medium-image-zoom';
import CustomZoomContent from './zoom-content-custom';
import type {PropsWithChildren} from 'react';

type ZoomImageProps = {
  author?: string;
  summary?: string;
  hideZoomContent?: boolean;
};

export default function ZoomImage({
  author,
  summary,
  hideZoomContent = false,
  children,
}: PropsWithChildren<ZoomImageProps>) {
  return (
    <Zoom
      ZoomContent={
        hideZoomContent
          ? undefined
          : (data) => <CustomZoomContent {...data} author={author} summary={summary} />
      }
      zoomMargin={16}
    >
      {children}
    </Zoom>
  );
}
