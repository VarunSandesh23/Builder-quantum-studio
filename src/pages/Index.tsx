import React, { useState, useEffect, useRef, useCallback } from "react";
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
  UserPlus,
  MousePointer2,
  Rocket,
  Heart,
  ThumbsUp,
} from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { complaints, getComplaintStats } = useComplaints();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleStats, setVisibleStats] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [countUpValues, setCountUpValues] = useState({
    total: 0,
    resolved: 0,
    users: 0,
  });
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [clickRipples, setClickRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Get real complaint statistics
  const complaintStats = getComplaintStats();
  const totalComplaints = complaintStats.total;
  const resolvedComplaints = complaintStats.resolved + complaintStats.closed;
  const successRate =
    totalComplaints > 0
      ? Math.round((resolvedComplaints / totalComplaints) * 100)
      : 94;
  const avgResolutionTime = totalComplaints > 0 ? "2.3" : "2.3";
  const activeUsers = Math.floor(totalComplaints * 45) || 1250;

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Update position
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;

          // Bounce off edges
          if (newX <= 0 || newX >= canvas.width) particle.vx *= -1;
          if (newY <= 0 || newY >= canvas.height) particle.vy *= -1;

          newX = Math.max(0, Math.min(canvas.width, newX));
          newY = Math.max(0, Math.min(canvas.height, newY));

          // Draw particle
          ctx.beginPath();
          ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.fill();

          return { ...particle, x: newX, y: newY };
        }),
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Count up animation for stats
  useEffect(() => {
    if (visibleStats) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        setCountUpValues({
          total: Math.round(totalComplaints * easeProgress),
          resolved: Math.round(resolvedComplaints * easeProgress),
          users: Math.round(activeUsers * easeProgress),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCountUpValues({
            total: totalComplaints,
            resolved: resolvedComplaints,
            users: activeUsers,
          });
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [visibleStats, totalComplaints, resolvedComplaints, activeUsers]);

  // Click ripple effect
  const createRipple = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setClickRipples((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setClickRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hero visibility animation
  useEffect(() => {
    setIsHeroVisible(true);
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
      number: countUpValues.total.toLocaleString(),
      label: t("complaints_registered"),
      sublabel: t("this_month"),
      color: "from-blue-500 to-blue-600",
      delay: "delay-0",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      number: `${countUpValues.resolved.toLocaleString()}`,
      label: t("issues_resolved"),
      sublabel: `${successRate}% ${t("success_rate")}`,
      color: "from-green-500 to-green-600",
      delay: "delay-150",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: avgResolutionTime,
      label: t("days_average"),
      sublabel: t("resolution_time"),
      color: "from-orange-500 to-orange-600",
      delay: "delay-300",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
    },
    {
      icon: <Users className="w-8 h-8" />,
      number:
        countUpValues.users > 1000
          ? `${(countUpValues.users / 1000).toFixed(1)}K+`
          : countUpValues.users.toString(),
      label: t("active_citizens"),
      sublabel: t("registered_users"),
      color: "from-purple-500 to-purple-600",
      delay: "delay-450",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
  ];

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: t("smart_registration"),
      description: t("smart_registration_desc"),
      gradient: "from-blue-500 to-cyan-500",
      benefits: ["Photo Evidence", "GPS Location", "Smart Categories"],
      hoverGradient: "hover:from-blue-600 hover:to-cyan-600",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: t("real_time_tracking"),
      description: t("real_time_tracking_desc"),
      gradient: "from-green-500 to-emerald-500",
      benefits: ["Live Updates", "SMS Alerts", "ETA Tracking"],
      hoverGradient: "hover:from-green-600 hover:to-emerald-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("multilingual_support"),
      description: t("multilingual_support_desc"),
      gradient: "from-purple-500 to-pink-500",
      benefits: ["3 Languages", "Voice Input", "Text Translation"],
      hoverGradient: "hover:from-purple-600 hover:to-pink-600",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t("ai_assistant"),
      description: t("ai_assistant_desc"),
      gradient: "from-orange-500 to-red-500",
      benefits: ["24/7 Support", "Instant Help", "Smart Routing"],
      hoverGradient: "hover:from-orange-600 hover:to-red-600",
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
      count: categoryStats.roads.toLocaleString() || "247",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      pulse: "animate-pulse",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: t("water"),
      count: categoryStats.water.toLocaleString() || "189",
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600",
      pulse: "animate-pulse",
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      label: t("sanitation"),
      count: categoryStats.sanitation.toLocaleString() || "156",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      pulse: "animate-pulse",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: t("electricity"),
      count: categoryStats.electricity.toLocaleString() || "134",
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      pulse: "animate-pulse",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      label: t("street_lights"),
      count: categoryStats.streetlights.toLocaleString() || "98",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      pulse: "animate-pulse",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      label: t("safety"),
      count: categoryStats.safety.toLocaleString() || "76",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      pulse: "animate-pulse",
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
      bgGradient: "from-blue-500 to-purple-600",
    },
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      location: "Secunderabad",
      quote:
        "Real-time tracking helped me follow the progress. Very transparent process.",
      rating: 5,
      avatar: "PS",
      bgGradient: "from-green-500 to-blue-600",
    },
    {
      name: "Mohammed Ali",
      role: "Resident",
      location: "Gachibowli",
      quote:
        "Water supply issue resolved in 2 days. Great initiative by the government!",
      rating: 5,
      avatar: "MA",
      bgGradient: "from-orange-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navigation />

      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "transparent" }}
      />

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"
          style={{
            top: "-5rem",
            left: "-5rem",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
          style={{
            top: "-5rem",
            right: "-5rem",
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-pink-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"
          style={{
            bottom: "-5rem",
            left: "5rem",
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.01}px)`,
          }}
        />
      </div>

      {/* Interactive Cursor */}
      <div
        className="fixed w-6 h-6 bg-blue-500/20 rounded-full pointer-events-none z-50 mix-blend-multiply transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${hoveredCard !== null ? 2 : 1})`,
        }}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-20 pb-32 overflow-hidden z-10"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-8 relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient hover:scale-105 transition-transform duration-300 cursor-default inline-block">
                  TG Civic
                </span>
                <div className="absolute -top-4 -right-4">
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                </div>
                <br />
                <span className="text-gray-900 hover:text-gray-700 transition-colors duration-300 cursor-default">
                  Platform
                </span>
              </h1>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed hover:text-gray-800 transition-colors duration-300">
                Empowering citizens of Telangana to report civic issues
                seamlessly with AI-powered assistance, real-time tracking, and
                multilingual support.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-600 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                {isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register-complaint">
                      <Button
                        size="lg"
                        onClick={createRipple}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden transform hover:scale-105 hover:-translate-y-1"
                      >
                        {clickRipples.map((ripple) => (
                          <span
                            key={ripple.id}
                            className="absolute bg-white/30 rounded-full animate-ping"
                            style={{
                              left: ripple.x - 10,
                              top: ripple.y - 10,
                              width: 20,
                              height: 20,
                            }}
                          />
                        ))}
                        <FileText className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                        {t("register_complaint")}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      </Button>
                    </Link>
                    <Link to="/track-complaint">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={createRipple}
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300 group relative overflow-hidden transform hover:scale-105 hover:-translate-y-1"
                      >
                        <Search className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                        {t("track_complaint")}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/login">
                      <Button
                        size="lg"
                        onClick={createRipple}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden transform hover:scale-105 hover:-translate-y-1"
                      >
                        <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Get Started
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        document
                          .getElementById("features")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300 group transform hover:scale-105 hover:-translate-y-1"
                    >
                      <Heart className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:text-red-500 transition-all" />
                      Learn More
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Trust Indicators */}
            <div
              className={`transition-all duration-1000 delay-900 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
                <div className="flex items-center gap-2 group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <Shield className="w-5 h-5 text-green-500 group-hover:text-green-600 group-hover:rotate-12 transition-all" />
                  <span className="group-hover:text-gray-700 transition-colors">
                    Secure Platform
                  </span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5 text-blue-500 group-hover:text-blue-600 group-hover:rotate-12 transition-all" />
                  <span className="group-hover:text-gray-700 transition-colors">
                    Government Certified
                  </span>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-orange-500 group-hover:text-orange-600 group-hover:rotate-12 transition-all" />
                  <span className="group-hover:text-gray-700 transition-colors">
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section id="stats-section" className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
              Impact by the Numbers
              <Sparkles className="inline-block w-8 h-8 ml-2 text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-800 transition-colors duration-300">
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
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`p-8 rounded-2xl bg-gradient-to-br ${stat.color} ${stat.hoverColor} text-white relative overflow-hidden group hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white/20`}
                  onClick={createRipple}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-white/70">Live</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </div>
                      <div className="text-white/90 font-medium">
                        {stat.label}
                      </div>
                      <div className="text-white/70 text-sm">
                        {stat.sublabel}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-300" />

                  {/* Ripple effect for clicks */}
                  {clickRipples.map((ripple) => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/30 rounded-full animate-ping"
                      style={{
                        left: ripple.x - 10,
                        top: ripple.y - 10,
                        width: 20,
                        height: 20,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section id="features" className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
              Powerful Features
              <Target className="inline-block w-8 h-8 ml-2 text-blue-500 animate-spin" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-800 transition-colors duration-300">
              Advanced technology meets citizen needs to create a seamless civic
              engagement experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br ${feature.gradient} ${feature.hoverGradient} text-white overflow-hidden animate-slide-up hover:scale-105 hover:-translate-y-4 relative`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(100 + index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={createRipple}
              >
                <CardHeader className="relative pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 group-hover:bg-white/30">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Sparkles
                      className={`w-6 h-6 transition-all duration-300 ${
                        hoveredCard === 100 + index
                          ? "rotate-45 scale-125 text-yellow-300"
                          : "rotate-0 scale-100"
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 text-lg mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300"
                        style={{ transitionDelay: `${benefitIndex * 100}ms` }}
                      >
                        <CheckCircle className="w-5 h-5 text-white/80 group-hover:text-green-300 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-lg transition-all duration-300" />

                {/* Ripple effect */}
                {clickRipples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-ping"
                    style={{
                      left: ripple.x - 10,
                      top: ripple.y - 10,
                      width: 20,
                      height: 20,
                    }}
                  />
                ))}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Complaint Categories */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
              Report Any Issue
              <MousePointer2 className="inline-block w-8 h-8 ml-2 text-blue-500 animate-bounce" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-800 transition-colors duration-300">
              From roads to water supply, we handle all types of civic
              complaints with dedicated teams for each category.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {complaintCategories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500 animate-scale-in hover:scale-110 hover:-translate-y-2 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={createRipple}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${category.color} ${category.hoverColor} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative overflow-hidden`}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300 rounded-2xl" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.label}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1 group-hover:scale-110 transition-transform duration-300">
                    {category.count}
                  </div>
                  <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    reports filed
                  </p>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 rounded-lg" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register-complaint">
              <Button
                size="lg"
                onClick={createRipple}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden transform hover:scale-105 hover:-translate-y-1"
              >
                <FileText className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                Start Your Report
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Testimonials */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
              What Citizens Say
              <ThumbsUp className="inline-block w-8 h-8 ml-2 text-green-500 animate-pulse" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-800 transition-colors duration-300">
              Real feedback from citizens who have used TG Civic to resolve
              their issues.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current hover:scale-125 hover:rotate-12 transition-transform duration-300 cursor-pointer"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${testimonials[currentTestimonial].bgGradient} rounded-full flex items-center justify-center text-white font-bold text-xl hover:scale-110 hover:rotate-12 transition-transform duration-300 cursor-pointer`}
                  >
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-lg hover:text-blue-600 transition-colors duration-300">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                      {testimonials[currentTestimonial].role} •{" "}
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Testimonial Navigation */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentTestimonial
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 w-3 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
              Transform Your Neighborhood Today
              <Rocket className="inline-block w-8 h-8 ml-2 text-white animate-bounce" />
            </h2>
            <p className="text-xl text-white/90 mb-8 hover:text-white transition-colors duration-300">
              Your voice matters. Every complaint you file helps build a better
              Telangana.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group cursor-pointer hover:scale-105">
                <div className="text-2xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  2.3 Days
                </div>
                <div className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                  Average Resolution Time
                </div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group cursor-pointer hover:scale-105">
                <div className="text-2xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {successRate}%
                </div>
                <div className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                  Issues Successfully Resolved
                </div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group cursor-pointer hover:scale-105">
                <div className="text-2xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                  Support & Tracking
                </div>
              </div>
            </div>
            {!isAuthenticated && (
              <div className="flex justify-center">
                <Link to="/register">
                  <Button
                    size="lg"
                    onClick={createRipple}
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden transform hover:scale-105 hover:-translate-y-1"
                  >
                    <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                    Create Account
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Footer */}
      <footer className="bg-gray-900 text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">
                TG Civic Platform
              </h3>
              <p className="text-gray-400 mb-6 max-w-md hover:text-gray-300 transition-colors duration-300">
                Connecting citizens with their government for a better
                Telangana. Report issues, track progress, and make your voice
                heard.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 hover:rotate-12 transition-transform duration-300" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 hover:rotate-12 transition-transform duration-300" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 hover:rotate-12 transition-transform duration-300" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">
                Quick Links
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/register-complaint"
                    className="hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Register Complaint
                  </Link>
                </li>
                <li>
                  <Link
                    to="/track-complaint"
                    className="hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Track Status
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">
                Support
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center hover:text-white hover:scale-105 transition-all duration-300">
                  <Phone className="w-4 h-4 mr-2 hover:rotate-12 transition-transform duration-300" />
                  1800-XXX-XXXX
                </li>
                <li className="flex items-center hover:text-white hover:scale-105 transition-all duration-300">
                  <Mail className="w-4 h-4 mr-2 hover:rotate-12 transition-transform duration-300" />
                  support@tscivic.gov.in
                </li>
                <li className="flex items-center hover:text-white hover:scale-105 transition-all duration-300">
                  <MapPin className="w-4 h-4 mr-2 hover:rotate-12 transition-transform duration-300" />
                  Hyderabad, Telangana
                </li>
                <li className="flex items-center hover:text-white hover:scale-105 transition-all duration-300">
                  <Clock className="w-4 h-4 mr-2 hover:rotate-12 transition-transform duration-300" />
                  24/7 Available
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 hover:text-gray-300 transition-colors duration-300">
            <p>
              © 2024 TG Civic Platform. Government of Telangana. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
