import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useComplaints } from "@/context/ComplaintContext";
import { useLanguage } from "@/context/LanguageContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  FileText,
  Search,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  Zap,
  Heart,
  Star,
  ArrowRight,
  Play,
  Award,
  Target,
  Lightbulb,
  Car,
  Droplets,
  Trash2,
  MessageCircle,
  BarChart3,
  Calendar,
  Camera,
  Smartphone,
  Wifi,
  Lock,
  UserCheck,
  Headphones,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getComplaintStats } = useComplaints();
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = getComplaintStats();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t("smart_registration"),
      description: t("smart_registration_desc"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: t("real_time_tracking"),
      description: t("real_time_tracking_desc"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("multilingual_support"),
      description: t("multilingual_support_desc"),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t("ai_assistant"),
      description: t("ai_assistant_desc"),
      color: "from-orange-500 to-orange-600",
    },
  ];

  const categories = [
    {
      id: "roads",
      icon: <Car className="w-6 h-6" />,
      title: t("roads"),
      count: "1,234",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "water",
      icon: <Droplets className="w-6 h-6" />,
      title: t("water"),
      count: "856",
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      id: "sanitation",
      icon: <Trash2 className="w-6 h-6" />,
      title: t("sanitation"),
      count: "642",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "electricity",
      icon: <Zap className="w-6 h-6" />,
      title: t("electricity"),
      count: "423",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "streetlights",
      icon: <Lightbulb className="w-6 h-6" />,
      title: t("street_lights"),
      count: "312",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "safety",
      icon: <Shield className="w-6 h-6" />,
      title: t("safety"),
      count: "189",
      color: "bg-red-100 text-red-700",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Citizen, Hyderabad",
      content: "TG Civic made it so easy to report a pothole issue. Got it fixed within 3 days!",
      rating: 5,
      avatar: "RK",
    },
    {
      name: "Priya Sharma",
      role: "Resident, Warangal",
      content: "The multilingual support helped me register my complaint in Telugu. Excellent service!",
      rating: 5,
      avatar: "PS",
    },
    {
      name: "Mohammed Ali",
      role: "Business Owner, Nizamabad",
      content: "Real-time tracking kept me informed throughout the resolution process. Very transparent!",
      rating: 5,
      avatar: "MA",
    },
  ];

  const statsData = [
    {
      title: t("complaints_registered"),
      value: "12,847",
      change: "+15.2%",
      subtitle: t("this_month"),
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: t("issues_resolved"),
      value: "11,203",
      change: "+18.7%",
      subtitle: t("success_rate"),
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: t("days_average"),
      value: "3.2",
      change: "-12.5%",
      subtitle: t("resolution_time"),
      icon: <Clock className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: t("active_citizens"),
      value: "45,692",
      change: "+22.1%",
      subtitle: t("registered_users"),
      icon: <Users className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const quickActions = [
    {
      title: t("report_an_issue"),
      description: "Register a new complaint with photos and location",
      icon: <FileText className="w-6 h-6" />,
      href: "/register-complaint",
      color: "from-blue-500 to-blue-600",
      requireAuth: true,
    },
    {
      title: t("track_progress"),
      description: "Check the status of your existing complaints",
      icon: <Search className="w-6 h-6" />,
      href: "/track-complaint",
      color: "from-green-500 to-green-600",
      requireAuth: true,
    },
    {
      title: "Dashboard",
      description: "Admin panel for managing complaints",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "/dashboard",
      color: "from-purple-500 to-purple-600",
      requireAuth: true,
      adminOnly: true,
    },
  ];

  const handleQuickAction = (action: any) => {
    if (action.requireAuth && !isAuthenticated) {
      navigate("/login");
      return;
    }
    if (action.adminOnly && user?.role !== "admin" && user?.role !== "official") {
      navigate("/login");
      return;
    }
    navigate(action.href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className={`space-y-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Zap className="w-3 h-3 mr-1" />
                  Powered by AI & Technology
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {t("transform_your_city")}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    {t("one_report_at_time")}
                  </span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                  {t("join_digital_revolution")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleQuickAction(quickActions[0])}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {t("report_an_issue")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => handleQuickAction(quickActions[1])}
                >
                  <Search className="w-5 h-5 mr-2" />
                  {t("track_progress")}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Government Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm">Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5" />
                  <span className="text-sm">45K+ Citizens</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className={`relative ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  {/* Mock App Interface */}
                  <div className="bg-white rounded-xl p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">TG Civic</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Live</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Car className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Road Repair</p>
                            <p className="text-sm text-gray-600">Hitec City</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Droplets className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Water Supply</p>
                            <p className="text-sm text-gray-600">Jubilee Hills</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                    <Bell className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Making a Real Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how TG Civic is transforming citizen services across Telangana
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <div className={stat.color}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get Started in Seconds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your action and make your voice heard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => handleQuickAction(action)}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {action.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {action.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Citizens
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of civic engagement with our advanced platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {features.map((feature, index) => (
              <div key={index} className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} flex-shrink-0`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Report Issues by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from various civic issue categories to get faster resolution
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => navigate("/register-complaint")}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {category.count} reports
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Citizens Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people making a difference
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of citizens who are actively improving their communities through TG Civic
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate("/register")}
                >
                  <UserCheck className="w-5 h-5 mr-2" />
                  Create Account
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate("/register-complaint")}
              >
                <FileText className="w-5 h-5 mr-2" />
                Register Your First Complaint
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">TG Civic</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering citizens to build better communities through technology and transparency.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register-complaint" className="hover:text-white transition-colors">Register Complaint</Link></li>
                <li><Link to="/track-complaint" className="hover:text-white transition-colors">Track Complaint</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/notifications" className="hover:text-white transition-colors">Notifications</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>1800-XXX-XXXX</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@tgcivic.gov.in</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Headphones className="w-4 h-4" />
                  <span>24/7 Live Chat</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri 9AM-6PM</span>
                </li>
              </ul>
            </div>

            {/* Government */}
            <div>
              <h3 className="font-semibold mb-4">Government</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Telangana Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GHMC</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital India</a></li>
                <li><a href="#" className="hover:text-white transition-colors">MyGov</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 TG Civic - Government of Telangana. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;