import {useOs, type OS} from '@mantine/hooks';
import {type PropsWithChildren} from 'react';

type OSControl = Record<OS, boolean>;

export default function RenderByOS({
  children,
  ...osControlProps
}: PropsWithChildren<Partial<OSControl>>) {
  return osControlProps[useOs()] ? children : undefined;
}
