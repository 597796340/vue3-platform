import { IBankCard } from "@/model";
import { ValidationRuleset } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export interface TBindCard {
  bankCard: IBankCard;
  validationGroup: string[];
}

export const validations: ValidationRuleset<TBindCard> = {
  bankCard: {
    bank: {
      required,
      minLength: minLength(4)
    },
    account: {
      required,
      minLength: minLength(16),
      maxLength: maxLength(19)
    },
    accountHolder: {
      required,
      minLength: minLength(2)
    }
  }
};
