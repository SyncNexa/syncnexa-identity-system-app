import React, { createContext, useState } from "react";

export const NavigationContext = createContext<CustomNavigation>({
  open: false,
  toggleOpen: () => console.log("USe inside of NavigationProvider"),
});

function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen((prev) => !prev);
  }
  return (
    <NavigationContext.Provider value={{ open, toggleOpen }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationProvider;
