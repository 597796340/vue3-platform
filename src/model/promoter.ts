export interface IPromoter {
  id: number;
  username: string;
  password?: string;
  phone: string;
  qq: string;
  rate: number;
  amount?: number;
  balance?: number;
  time?: string;
  totalOrderCount?: number;
  endOrderCount?: number;
}
