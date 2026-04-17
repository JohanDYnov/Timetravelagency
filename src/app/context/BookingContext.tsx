import { createContext, useContext, useState, ReactNode } from 'react';
import { Epoch } from '../data/epochs';

interface BookingItem {
  epoch: Epoch;
  travelers: number;
  startDate: Date | null;
  activities: string[];
}

interface UserProfile {
  name: string;
  email: string;
  preferences: string[];
  travelHistory: string[];
}

interface BookingContextType {
  cart: BookingItem[];
  addToCart: (item: BookingItem) => void;
  removeFromCart: (epochId: string) => void;
  clearCart: () => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  totalPrice: number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<BookingItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const addToCart = (item: BookingItem) => {
    setCart(prev => {
      const existing = prev.findIndex(i => i.epoch.id === item.epoch.id);
      if (existing >= 0) {
        const newCart = [...prev];
        newCart[existing] = item;
        return newCart;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (epochId: string) => {
    setCart(prev => prev.filter(item => item.epoch.id !== epochId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.epoch.price * item.travelers), 0);

  return (
    <BookingContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        userProfile,
        setUserProfile,
        totalPrice
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};
