import { Outlet, Link, useLocation } from 'react-router';
import { Clock, Compass, MessageCircle, ShoppingCart, User, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ChatWidget } from '../components/ChatWidget';

export const RootLayout = () => {
  const location = useLocation();
  const { cart } = useBooking();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Clock className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ChronoVoyage
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/catalogue">
                <Button
                  variant={isActive('/catalogue') ? 'default' : 'ghost'}
                  className="gap-2"
                >
                  <Compass className="w-4 h-4" />
                  Catalogue
                </Button>
              </Link>
              <Link to="/quiz">
                <Button
                  variant={isActive('/quiz') ? 'default' : 'ghost'}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Quiz
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  variant={isActive('/cart') ? 'default' : 'ghost'}
                  className="gap-2 relative"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Panier
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-pink-500">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  variant={isActive('/profile') ? 'default' : 'ghost'}
                  className="gap-2"
                >
                  <User className="w-4 h-4" />
                  Profil
                </Button>
              </Link>
            </nav>

            {/* Mobile menu */}
            <div className="flex md:hidden gap-2">
              <Link to="/cart">
                <Button size="icon" variant="ghost" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-pink-500 w-5 h-5 flex items-center justify-center p-0 text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/profile">
                <Button size="icon" variant="ghost">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="flex md:hidden gap-2 mt-4 overflow-x-auto pb-2">
            <Link to="/catalogue">
              <Button
                size="sm"
                variant={isActive('/catalogue') ? 'default' : 'ghost'}
                className="gap-2 whitespace-nowrap"
              >
                <Compass className="w-4 h-4" />
                Catalogue
              </Button>
            </Link>
            <Link to="/quiz">
              <Button
                size="sm"
                variant={isActive('/quiz') ? 'default' : 'ghost'}
                className="gap-2 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                Quiz
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-slate-950/50 backdrop-blur-lg mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-400">
            <p className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              © 2026 ChronoVoyage - Voyagez à travers le temps en toute sécurité
            </p>
            <p className="text-sm mt-2 text-slate-500">
              Agréé par l'Autorité Temporelle Internationale
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};