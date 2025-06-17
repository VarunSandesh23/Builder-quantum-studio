import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  Building2,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Globe,
  Smartphone,
  Zap,
  Shield,
  Lightbulb,
  Droplets,
  Car,
  Trash2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Star,
  PlayCircle,
  Camera,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const [language] = useState("en");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleStats, setVisibleStats] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate stats on scroll
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById("stats-section");
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisibleStats(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    {
      icon: <FileText className="w-8 h-8" />,
      number: "12,847",
      label: "Complaints Registered",
      sublabel: "This Month",
      color: "from-blue-500 to-blue-600",
      delay: "delay-0",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      number: "9,234",
      label: "Issues Resolved",
      sublabel: "Success Rate: 94%",
      color: "from-green-500 to-green-600",
      delay: "delay-150",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: "2.3",
      label: "Days Average",
      sublabel: "Resolution Time",
      color: "from-orange-500 to-orange-600",
      delay: "delay-300",
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "1.2M+",
      label: "Active Citizens",
      sublabel: "Registered Users",
      color: "from-purple-500 to-purple-600",
      delay: "delay-450",
    },
  ];

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Registration",
      description:
        "AI-powered complaint categorization with photo upload and GPS location",
      gradient: "from-blue-500 to-cyan-500",
      benefits: ["Photo Evidence", "GPS Location", "Smart Categories"],
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Real-time Tracking",
      description:
        "Live status updates with SMS notifications and estimated completion",
      gradient: "from-green-500 to-emerald-500",
      benefits: ["Live Updates", "SMS Alerts", "ETA Tracking"],
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multilingual Support",
      description:
        "Available in Telugu, Hindi & English with voice-to-text support",
      gradient: "from-purple-500 to-pink-500",
      benefits: ["3 Languages", "Voice Input", "Text Translation"],
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Assistant",
      description: "24/7 intelligent chatbot for instant help and guidance",
      gradient: "from-orange-500 to-red-500",
      benefits: ["24/7 Support", "Instant Help", "Smart Routing"],
    },
  ];

  const complaintCategories = [
    {
      icon: <Car className="w-6 h-6" />,
      label: "Roads & Transport",
      count: "2,847",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: "Water Supply",
      count: "1,923",
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600",
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      label: "Sanitation",
      count: "1,456",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: "Electricity",
      count: "987",
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      label: "Street Lights",
      count: "654",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      label: "Public Safety",
      count: "432",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      location: "Hyderabad",
      quote:
        "The pothole near my shop was fixed within 3 days of reporting. Excellent service!",
      rating: 5,
      avatar: "RK",
    },
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      location: "Secunderabad",
      quote:
        "Real-time tracking helped me follow the progress. Very transparent process.",
      rating: 5,
      avatar: "PS",
    },
    {
      name: "Mohammed Ali",
      role: "Teacher",
      location: "Warangal",
      quote:
        "The multilingual support made it easy to report issues in Telugu. Great initiative!",
      rating: 5,
      avatar: "MA",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      icon: <Camera className="w-8 h-8" />,
      title: "Report Issue",
      description: "Take a photo, add location, and describe the problem",
      color: "from-blue-500 to-blue-600",
    },
    {
      step: "2",
      icon: <Target className="w-8 h-8" />,
      title: "Get Assigned",
      description: "System automatically assigns to relevant department",
      color: "from-purple-500 to-purple-600",
    },
    {
      step: "3",
      icon: <Clock className="w-8 h-8" />,
      title: "Track Progress",
      description: "Receive real-time updates via SMS and email",
      color: "from-orange-500 to-orange-600",
    },
    {
      step: "4",
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Issue Resolved",
      description: "Get confirmation when the issue is completed",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />

      {/* Hero Section with Animated Background */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Empowering 1.2M+ Citizens
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Transform Your City
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                One Report at a Time
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join the digital revolution in civic engagement. Report issues,
              track progress, and see real change happen in your community with
              TS Civic.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/register-complaint">
                  <FileText className="w-6 h-6 mr-3" />
                  Report an Issue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-6 text-lg font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/track-complaint">
                  <Search className="w-6 h-6 mr-3" />
                  Track Progress
                </Link>
              </Button>
            </div>

            {/* Quick Complaint Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {complaintCategories.map((category, index) => (
                <div
                  key={index}
                  className={`group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-transparent ${category.hoverColor} hover:text-white transform hover:scale-105`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${hoveredCard === index ? "bg-white/20" : ""}`}
                  >
                    <div
                      className={`transition-colors duration-300 ${hoveredCard === index ? "text-white" : "text-white"}`}
                    >
                      {category.icon}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-center mb-1 transition-colors duration-300">
                    {category.label}
                  </p>
                  <p className="text-xs text-center opacity-80">
                    {category.count} reports
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animations */}
      <section
        id="stats-section"
        className="py-16 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  visibleStats
                    ? `translate-y-0 opacity-100 ${stat.delay}`
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
                  >
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-yellow-800" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-4">
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Civic Engagement
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform bridges the gap between citizens and
              government with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mb-4">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How TS Civic Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From reporting to resolution in just four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{step.icon}</div>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Citizen Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Citizens Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from real people making a difference in their
              communities
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                        />
                      ),
                    )}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-600">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-sm text-gray-500">
                        📍 {testimonials[currentTestimonial].location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of citizens who are actively improving their
              communities. Your voice matters, and your reports create real
              change.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/register-complaint">
                  <Smartphone className="w-6 h-6 mr-3" />
                  Start Reporting Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/dashboard">
                  <Award className="w-6 h-6 mr-3" />
                  View Public Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">TS Civic</div>
                  <div className="text-gray-400">Government of Telangana</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Empowering citizens and enhancing governance through digital
                innovation. Building stronger communities, one report at a time.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-600 text-white">24/7 Support</Badge>
                <Badge className="bg-green-600 text-white">
                  Real-time Updates
                </Badge>
                <Badge className="bg-purple-600 text-white">AI Powered</Badge>
                <Badge className="bg-orange-600 text-white">Multilingual</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: "Register Complaint", href: "/register-complaint" },
                  { label: "Track Status", href: "/track-complaint" },
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Help Center", href: "/help" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6 text-white">
                Contact & Support
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-blue-400" />
                  <div>
                    <div className="font-semibold">Helpline</div>
                    <div>1800-XXX-XXXX</div>
                  </div>
                </li>
                <li className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div>support@tscivic.gov.in</div>
                  </div>
                </li>
                <li className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-3 text-blue-400" />
                  <div>
                    <div className="font-semibold">Office Hours</div>
                    <div>24/7 Digital Support</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 TS Civic - Government of Telangana. All rights
              reserved.
              <span className="mx-2">|</span>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="mx-2">|</span>
              <Link
                to="/terms"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <span className="mx-2">|</span>
              <Link
                to="/accessibility"
                className="hover:text-white transition-colors duration-300"
              >
                Accessibility
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
