export interface IUser {
  authenticated: boolean;
  claims: {};
  roles: string[];
  username: string;
  cultureName?: string;
  createdOn?: Date;
  displayName?: string;
  email?: string;
  enabled?: boolean;
  name?: string;
  verified?: boolean;
  exp?: Date;
  userId?: number;
  timeZoneId?: string;
}
