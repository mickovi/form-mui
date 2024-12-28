import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export default function RHFCheckGroup<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        /* OBS: See 1:28:00 */
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                value={option.id}
                control={
                  <Checkbox
                    key={option.id}
                    checked={value.includes(option.id)}
                    onChange={() => {
                      if (value.includes(option.id))
                        onChange(
                          (value as string[]).filter(
                            (item) => item !== option.id
                          )
                        );
                      else onChange([...value, option.id]);
                    }}
                  />
                }
                label={option.label}
                key={option.id}
              />
            ))}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}
