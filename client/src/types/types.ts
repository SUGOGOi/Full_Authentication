export interface useStoreTypes {
  // For theme
  darkMode: boolean;
  toggleDarkMode: (change: boolean) => void;

  //For User
  user:
    | {
        _id: string;
        name: string;
        email: string;
        role: string;
        is_verified: string;
      }
    | undefined;
  setUser: (
    change:
      | {
          _id: string;
          name: string;
          email: string;
          role: string;
          is_verified: string;
        }
      | undefined
  ) => void;

  isLogin: boolean;
  setIsLogin: (change: boolean) => void;
}
