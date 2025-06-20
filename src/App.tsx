import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ComplaintProvider } from "./context/ComplaintContext";
import { NotificationProvider } from "./context/NotificationContext";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBot from "./components/ChatBot";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterComplaint from "./pages/RegisterComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <NotificationProvider>
          <ComplaintProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/register-complaint"
                    element={
                      <ProtectedRoute>
                        <RegisterComplaint />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/track-complaint"
                    element={
                      <ProtectedRoute>
                        <TrackComplaint />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute requiredRole={["admin", "official"]}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <ProtectedRoute>
                        <Notifications />
                      </ProtectedRoute>
                    }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatBot />
              </BrowserRouter>
            </TooltipProvider>
          </ComplaintProvider>
        </NotificationProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
