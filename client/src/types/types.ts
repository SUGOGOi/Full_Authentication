export interface useStoreTypes {
  // For theme
  darkMode: boolean;
  toggleDarkMode: (change: boolean) => void;

  //For User
  user:
    | {
        email: string | undefined | null;
        _id?: string | undefined | null;
        name?: string | undefined | null;
        role?: string | undefined | null;
      }
    | undefined;
  setUser: (change: {
    email: string | undefined | null;
    _id?: string | undefined | null;
    name?: string | undefined | null;
    role?: string | undefined | null;
  }) => void;
}
