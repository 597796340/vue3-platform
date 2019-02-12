interface SideNavItem {
  name: string;
  icon: string;
  to: string;
}

interface SideNavAction {
  name: string;
  action: string;
}

export interface AppConfig {
  serverUrl: string;
  defaultUri: string;
  setTokenTag?: string;
  reqTokenTag?: string;
  tokenPrefix?: string;
  freshTimeTag?: string;
  unAuthenticationRedirect?: string;
}

export interface SideNavDataList extends AppConfig {
  toolbarContent: string;
  navItemList: SideNavItem[];
  titelContent: string;
  avatarActions: SideNavAction[];
}
