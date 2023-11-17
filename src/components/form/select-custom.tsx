import {
  useCombobox,
  Combobox,
  InputBase,
  Input,
  type InputBaseProps,
  type ComboboxProps,
} from '@mantine/core';
import type {HTMLAttributes, ReactNode} from 'react';

export type SelectCustomProps = {
  data: {value: string; render: ReactNode}[];
  value: string;
  classNames?: ComboboxProps['classNames'];
  onChange: (value: string) => void;
} & Omit<InputBaseProps, 'classNames'> &
  Omit<HTMLAttributes<HTMLButtonElement>, keyof InputBaseProps>;

export default function SelectCustom({
  classNames,
  value,
  onChange,
  data,
  ...inputButtonProps
}: SelectCustomProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const selectedOption = data.find((item) => item.value === value);

  const options = data.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.render}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      classNames={classNames}
      onOptionSubmit={(val) => {
        onChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...inputButtonProps}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
        >
          {selectedOption ? (
            selectedOption.render
          ) : (
            <Input.Placeholder>Pick value</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
