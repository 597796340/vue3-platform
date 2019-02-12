import { IDrawout } from "@/model";
import { ValidationRuleset } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export interface TDrawout {
  drawout: IDrawout;
  validationGroup: string[];
}

export const validations: ValidationRuleset<TDrawout> = {
  drawout: {
    drawoutCash: {
      required
    },
    passwork: {
      required,
      minLength: minLength(6)
    }
  }
};
