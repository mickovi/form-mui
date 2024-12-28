import { ApiCommon, ApiCreateEdit } from "../types/apiTypes";
import { Schema } from "../types/schema";

export function mapData(data: Schema): ApiCreateEdit {
  const common: ApiCommon = {
    email: data.email,
    name: data.name,
    states: data.states,
    gender: data.gender,
    languagesSpoken: data.languagesSpoken,
    skills: data.skills,
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    formerEmploymentPeriod: [
      data.formerEmploymentPeriod[0].toString(),
      data.formerEmploymentPeriod[1].toString(),
    ],
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    isTeacher: data.isTeacher,
    students: data.isTeacher === true ? data.students : [],
  };

  switch (data.variant) {
    case "create": {
      return {...common, variant: data.variant}
    }
    case "edit": {
      return {...common, id: Number(data.id), variant: data.variant}
    }
  }
}
