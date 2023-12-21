import {
  CheckIcon,
  ColorSwatch,
  Tooltip,
  useMantineTheme,
  type ColorSwatchProps,
  useMantineColorScheme,
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
  const {colorScheme} = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const swatches = Object.keys(colors).flatMap((color) => {
    if (isDarkMode && color === 'dark') {
      return [];
    }

    if (!isDarkMode && color === 'gray') {
      return [];
    }

    return (
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
    );
  });

  return <div className={classNames('my-4 flex gap-2', className)}>{swatches}</div>;
};
export default ThemeColors;
