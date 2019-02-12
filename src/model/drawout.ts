import { IBankCard } from "./bankCard";

export interface IDrawout extends IBankCard {
  username: string;
  balance: number;
  drawoutCash: number;
  passwork: string;
}
