import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label">;
/* } & Pick<TextFieldProps, "label" | "disabled" | "size" | ... moreProps >; */

export default function RHFTextField<T extends FieldValues>({
  name,
  ...props
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
          variant="filled"
        />
      )}
    />
  );
}
