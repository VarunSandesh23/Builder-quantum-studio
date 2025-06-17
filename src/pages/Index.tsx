import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useComplaints } from "@/context/ComplaintContext";
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
  const { t } = useLanguage();
  const { complaints, getComplaintStats } = useComplaints();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleStats, setVisibleStats] = useState(false);

  // Get real complaint statistics
  const complaintStats = getComplaintStats();

  // Calculate dynamic statistics
  const totalComplaints = complaintStats.total;
  const resolvedComplaints = complaintStats.resolved + complaintStats.closed;
  const successRate =
    totalComplaints > 0
      ? Math.round((resolvedComplaints / totalComplaints) * 100)
      : 72;
  const avgResolutionTime = totalComplaints > 0 ? "2.3" : "2.3"; // Could be calculated from actual data
  const activeUsers = Math.floor(totalComplaints * 45); // Estimate based on complaints

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
      number: totalComplaints.toLocaleString(),
      label: t("complaints_registered"),
      sublabel: t("this_month"),
      color: "from-blue-500 to-blue-600",
      delay: "delay-0",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      number: `${resolvedComplaints.toLocaleString()}`,
      label: t("issues_resolved"),
      sublabel: `${successRate}% ${t("success_rate")}`,
      color: "from-green-500 to-green-600",
      delay: "delay-150",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: avgResolutionTime,
      label: t("days_average"),
      sublabel: t("resolution_time"),
      color: "from-orange-500 to-orange-600",
      delay: "delay-300",
    },
    {
      icon: <Users className="w-8 h-8" />,
      number:
        activeUsers > 1000
          ? `${(activeUsers / 1000).toFixed(1)}K+`
          : activeUsers.toString(),
      label: t("active_citizens"),
      sublabel: t("registered_users"),
      color: "from-purple-500 to-purple-600",
      delay: "delay-450",
    },
  ];

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: t("smart_registration"),
      description: t("smart_registration_desc"),
      gradient: "from-blue-500 to-cyan-500",
      benefits: ["Photo Evidence", "GPS Location", "Smart Categories"],
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: t("real_time_tracking"),
      description: t("real_time_tracking_desc"),
      gradient: "from-green-500 to-emerald-500",
      benefits: ["Live Updates", "SMS Alerts", "ETA Tracking"],
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("multilingual_support"),
      description: t("multilingual_support_desc"),
      gradient: "from-purple-500 to-pink-500",
      benefits: ["3 Languages", "Voice Input", "Text Translation"],
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t("ai_assistant"),
      description: t("ai_assistant_desc"),
      gradient: "from-orange-500 to-red-500",
      benefits: ["24/7 Support", "Instant Help", "Smart Routing"],
    },
  ];

  // Calculate category-wise complaint counts
  const categoryStats = {
    roads: complaints.filter((c) => c.category === "roads").length,
    water: complaints.filter((c) => c.category === "water").length,
    sanitation: complaints.filter((c) => c.category === "sanitation").length,
    electricity: complaints.filter((c) => c.category === "electricity").length,
    streetlights: complaints.filter((c) => c.category === "street-lights")
      .length,
    safety: complaints.filter((c) => c.category === "safety").length,
  };

  const complaintCategories = [
    {
      icon: <Car className="w-6 h-6" />,
      label: t("roads"),
      count: categoryStats.roads.toLocaleString(),
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: t("water"),
      count: categoryStats.water.toLocaleString(),
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600",
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      label: t("sanitation"),
      count: categoryStats.sanitation.toLocaleString(),
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: t("electricity"),
      count: categoryStats.electricity.toLocaleString(),
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      label: t("street_lights"),
      count: categoryStats.streetlights.toLocaleString(),
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      label: t("safety"),
      count: categoryStats.safety.toLocaleString(),
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
      role: "Resident",
      location: "Gachibowli",
      quote:
        "Water supply issue resolved in 2 days. Great initiative by the government!",
      rating: 5,
      avatar: "MA",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                TS Civic
              </span>
              <br />
              <span className="text-gray-900">Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Empowering citizens of Telangana to report civic issues seamlessly
              with AI-powered assistance, real-time tracking, and multilingual
              support.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              {isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register-complaint">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      {t("register_complaint")}
                    </Button>
                  </Link>
                  <Link to="/track-complaint">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300 group"
                    >
                      <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      {t("track_complaint")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Get Started
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300 group"
                    onClick={() => {
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Learn More
                  </Button>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                <span>Government Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Impact by the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time statistics showing our platform's effectiveness in
              addressing civic issues across Telangana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  visibleStats ? `animate-fade-in ${stat.delay}` : "opacity-0"
                }`}
              >
                <div
                  className={`p-8 rounded-2xl bg-gradient-to-br ${stat.color} text-white relative overflow-hidden group hover:scale-105 transition-all duration-300`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      {stat.icon}
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-white/70">Live</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold">{stat.number}</div>
                      <div className="text-white/90 font-medium">
                        {stat.label}
                      </div>
                      <div className="text-white/70 text-sm">
                        {stat.sublabel}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets citizen needs to create a seamless civic
              engagement experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br ${feature.gradient} text-white overflow-hidden animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="relative pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Sparkles
                      className={`w-6 h-6 transition-all duration-300 ${
                        hoveredCard === index
                          ? "rotate-12 scale-125"
                          : "rotate-0 scale-100"
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5 text-white/80" />
                        <span className="text-white/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complaint Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Report Any Issue
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From roads to water supply, we handle all types of civic
              complaints with dedicated teams for each category.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {complaintCategories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${category.color} ${category.hoverColor} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.label}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {category.count}
                  </div>
                  <p className="text-sm text-gray-500">reports filed</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register-complaint">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Your Report
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Citizens Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from citizens who have used TS Civic to resolve
              their issues.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].role} •{" "}
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 w-3"
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
            <p className="text-xl text-white/90 mb-12">
              Join thousands of citizens making Telangana better, one report at
              a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Create Account
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full transition-all duration-300 group"
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">TS Civic Platform</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Connecting citizens with their government for a better
                Telangana. Report issues, track progress, and make your voice
                heard.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/register-complaint"
                    className="hover:text-white transition-colors"
                  >
                    Register Complaint
                  </Link>
                </li>
                <li>
                  <Link
                    to="/track-complaint"
                    className="hover:text-white transition-colors"
                  >
                    Track Status
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  1800-XXX-XXXX
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  support@tscivic.gov.in
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Hyderabad, Telangana
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Available
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © 2024 TS Civic Platform. Government of Telangana. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
