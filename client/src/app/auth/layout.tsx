import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode } from "react";

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AccountLayout;
