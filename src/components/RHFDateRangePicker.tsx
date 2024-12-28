import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type Props<T extends FieldValues> = {
  name: Path<T>;
};

export default function RHFDateRangePicker<T extends FieldValues>({
  name,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}variant="standard"
      name={name}
      render={({ field: { value, ...restField } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            {...restField}
            value={Array.isArray(value) ? value : [null, null]}
          />
        </LocalizationProvider>
      )}
    />
  );
}
