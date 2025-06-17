import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menu,
  FileText,
  Search,
  BarChart3,
  MessageCircle,
  Phone,
  Building2,
  LogIn,
  LogOut,
  User,
  Settings,
  UserPlus,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  labelTe?: string;
  labelHi?: string;
  icon?: React.ReactNode;
}

const Navigation = () => {
  const [language, setLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
      labelTe: "హోమ్",
      labelHi: "होम",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      href: "/register-complaint",
      label: "Register Complaint",
      labelTe: "ఫిర్యాదు నమోదు",
      labelHi: "शिकायत दर्ज करें",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      href: "/track-complaint",
      label: "Track Complaint",
      labelTe: "ఫిర్యాదు ట్రాక్ చేయండి",
      labelHi: "शिकायत ट्रैक करें",
      icon: <Search className="w-4 h-4" />,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      labelTe: "డాష్‌బోర్డ్",
      labelHi: "डैशबोर्ड",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  const getLabel = (item: NavItem) => {
    if (language === "te" && item.labelTe) return item.labelTe;
    if (language === "hi" && item.labelHi) return item.labelHi;
    return item.label;
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-civic-500 to-civic-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">TS Civic</span>
              <span className="text-xs text-gray-600">
                {language === "te" && "పౌర సేవలు"}
                {language === "hi" && "नागरिक स���वाएं"}
                {language === "en" && "Citizen Services"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveRoute(item.href)
                    ? "text-civic-600 bg-civic-50"
                    : "text-gray-700 hover:text-civic-600 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span>{getLabel(item)}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
              </SelectContent>
            </Select>

            {/* Contact */}
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Phone className="w-4 h-4 mr-2" />
              {language === "te" && "సంప్రదించండి"}
              {language === "hi" && "संपर्क"}
              {language === "en" && "Contact"}
            </Button>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Info Display */}
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </span>
                  <div className="flex items-center justify-end gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user?.role === "admin"
                          ? "bg-red-500"
                          : user?.role === "official"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <span className="text-xs text-gray-600 capitalize">
                      {user?.role}
                    </span>
                  </div>
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback
                          className={`text-white font-semibold ${
                            user?.role === "admin"
                              ? "bg-red-600"
                              : user?.role === "official"
                                ? "bg-green-600"
                                : "bg-blue-600"
                          }`}
                        >
                          {user?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              user?.role === "admin"
                                ? "bg-red-500"
                                : user?.role === "official"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <span className="text-xs text-muted-foreground capitalize">
                            {user?.role}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Prominent Logout Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="hidden sm:flex border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="hidden sm:flex"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Building2 className="w-6 h-6 text-civic-600" />
                    <span>TS Civic</span>
                  </SheetTitle>
                  <SheetDescription>
                    {language === "te" && "తెలంగాణ పౌర సేవలు"}
                    {language === "hi" && "तेलंगाना नागरिक सेवाएं"}
                    {language === "en" && "Telangana Citizen Services"}
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActiveRoute(item.href)
                          ? "text-civic-600 bg-civic-50"
                          : "text-gray-700 hover:text-civic-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon}
                      <span>{getLabel(item)}</span>
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <Button variant="outline" className="w-full mb-3">
                      <Phone className="w-4 h-4 mr-2" />
                      {language === "te" && "సంప��రదించండి"}
                      {language === "hi" && "संपर्क"}
                      {language === "en" && "Contact"}
                    </Button>
                    <Button className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {language === "te" && "సహాయం"}
                      {language === "hi" && "मदद"}
                      {language === "en" && "Help"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
