import { ILoginOption } from "@/model";
import { ValidationRuleset } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export interface TLogin { login: ILoginOption; validationGroup: string[]; }

export const validations: ValidationRuleset<TLogin> = {
  login: {
    username: {
      required,
      minLength: minLength(2)
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
};
