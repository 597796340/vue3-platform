import { IPromoter } from "@/model";
import { ValidationRuleset } from "vuelidate";
import { required, minLength, maxLength, between } from "vuelidate/lib/validators";

export interface TPromoter {
  promoter: IPromoter;
  validationGroup: string[];
}

export const validations: ValidationRuleset<TPromoter> = {
  promoter: {
    username: {
      required,
      minLength: minLength(2)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    rate: {
      required,
      between: between(0, 0.15)
    }
  }
};
