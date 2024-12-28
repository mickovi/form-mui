import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { Option } from "../types/option";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export default function RHFAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          /* value: [id: "1", id: "2"] => [{id: 1, label: "California"}, {id: 2, label: "Texas"}] */
          value={value.map((id: string) =>
            options?.find((item) => item.id === id)
          )}
          /* getOptionLabel: ["1", "2"] => ["California", "Texas"] */
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option.id)?.label ?? ""
          }
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          // Get just one element
          /* onChange=["1", "2"] */
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          disableCloseOnSelect
          multiple // With this we get multiple elements
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component="li" {...props} /* {props: {props.id, ...restProps}} */ >
              <Checkbox
                /* {...restProps} */
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
}
