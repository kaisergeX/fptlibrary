import {
  CheckIcon,
  ColorSwatch,
  Tooltip,
  useMantineTheme,
  type ColorSwatchProps,
} from '@mantine/core';
import {usePersistStore} from '~/store';
import {classNames} from '~/util';

const ThemeColors = ({
  className = '',
  size = 30,
}: {
  className?: string;
  size?: ColorSwatchProps['size'];
}) => {
  const {theme, setTheme} = usePersistStore();
  const {colors} = useMantineTheme();

  const swatches = Object.keys(colors).map((color) => (
    <Tooltip label={color} key={color}>
      <ColorSwatch
        className="cursor-pointer text-white opacity-80 hover:opacity-100 hover:shadow-lg disabled:cursor-default"
        component="button"
        color={colors[color][6]}
        size={size}
        onClick={() => setTheme(color)}
        disabled={theme === color}
      >
        {theme === color && <CheckIcon size={16} />}
      </ColorSwatch>
    </Tooltip>
  ));

  return <div className={classNames('my-4 flex gap-2', className)}>{swatches}</div>;
};
export default ThemeColors;
