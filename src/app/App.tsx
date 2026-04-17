import { RouterProvider } from 'react-router';
import { router } from './routes';
import { BookingProvider } from './context/BookingContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <BookingProvider>
      <RouterProvider router={router} />
      <Toaster />
    </BookingProvider>
  );
}
