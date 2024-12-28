import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Slider, Typography } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function RHFSlider<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography> 
          <Slider {...field} valueLabelDisplay="auto" />
        </>
      )}
    />
  );
}
