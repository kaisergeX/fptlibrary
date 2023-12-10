import {Progress, type ProgressProps} from '@mantine/core';
import {useEffect, useMemo, useState} from 'react';

type FakeProgressBarProps = {
  start?: boolean;
  maxValue?: number;
  maxFakeProgress?: number;
  frequency?: number;
  completed?: boolean;
} & Omit<ProgressProps, 'value'>;

export default function FakeProgressBar({
  start = false,
  maxValue = 100,
  maxFakeProgress = 100,
  frequency = 200,
  completed = false,
  animated,
  ...progressProps
}: FakeProgressBarProps) {
  const [progressValue, setProgressValue] = useState(0);
  const maxProgress = useMemo(
    () => (maxFakeProgress < maxValue ? maxFakeProgress : maxValue),
    [maxFakeProgress, maxValue],
  );

  useEffect(() => {
    if (completed) {
      return;
    }

    if (!start) {
      setProgressValue(0);
      return;
    }

    const timer = setInterval(() => {
      setProgressValue((currValue) => {
        if (currValue === maxProgress) {
          clearInterval(timer);
          return maxProgress;
        }

        return Math.min(currValue + Math.floor(Math.random() * (maxProgress / 4)), maxProgress);
      });
    }, frequency);

    return () => {
      clearInterval(timer);
    };
  }, [start, maxProgress, frequency, completed]);

  return (
    <Progress
      value={completed ? 100 : (progressValue / maxValue) * 100}
      {...progressProps}
      animated={completed ? false : animated}
    />
  );
}
