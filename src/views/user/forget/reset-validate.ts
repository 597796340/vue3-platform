import { IResetPassOption } from "@/model";
import { ValidationRuleset } from "vuelidate";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export interface TLogin { reset: IResetPassOption; validationGroup: string[]; }

export const validations: ValidationRuleset<TLogin> = {
  reset: {
    phoneNumber: {
      required,
      minLength: minLength(11)
    },
    verificationCode: {
      required,
    },
    password: {
      required,
      minLength: minLength(6)
    },
    rePassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("password")
    }
  }
};
