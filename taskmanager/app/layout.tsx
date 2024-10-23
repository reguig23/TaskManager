"use client"
import { ReactNode } from 'react';
import store from '@/stores/AppStore';
import { createContext } from 'react';
import "@/app/styles/globals.css"
const StoreContext = createContext(store);



interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html style={{ height: '100%' }} lang="en">
      <body style={{ height: '100%', backgroundColor: '#FBF5DF' }}>
        <StoreContext.Provider value={store}>
          {children}
        </StoreContext.Provider>
      </body>
    </html>
  );
}