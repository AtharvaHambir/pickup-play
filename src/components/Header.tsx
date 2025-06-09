
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-northeastern-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">NU</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HuskySports</h1>
              <p className="text-sm text-gray-600">Northeastern Pickup Games</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-northeastern-red font-medium transition-colors">
              Games
            </a>
            <a href="#" className="text-gray-700 hover:text-northeastern-red font-medium transition-colors">
              My Games
            </a>
            <a href="#" className="text-gray-700 hover:text-northeastern-red font-medium transition-colors">
              Locations
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-northeastern-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-northeastern-red text-white">JD</AvatarFallback>
            </Avatar>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
