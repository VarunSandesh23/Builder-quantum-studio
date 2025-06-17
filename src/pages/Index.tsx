import { useState } from "react";
import { Link } from "react-router-dom";
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
  FileText,
  Search,
  MapPin,
  Camera,
  MessageCircle,
  BarChart3,
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
} from "lucide-react";

const Index = () => {
  const [language] = useState("en");

  const stats = [
    {
      icon: <FileText className="w-8 h-8 text-civic-600" />,
      number: "12,847",
      label:
        language === "te"
          ? "ఫిర్యాదులు"
          : language === "hi"
            ? "शिकायतें"
            : "Complaints",
      sublabel:
        language === "te"
          ? "నమోదు చేయబడింది"
          : language === "hi"
            ? "दर्ज किए गए"
            : "Registered",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-success-600" />,
      number: "9,234",
      label:
        language === "te"
          ? "పరిష్కరించబడింది"
          : language === "hi"
            ? "हल हो गए"
            : "Resolved",
      sublabel:
        language === "te"
          ? "పూర్తి చేయబడింది"
          : language === "hi"
            ? "पूर्ण किए गए"
            : "Completed",
    },
    {
      icon: <Clock className="w-8 h-8 text-telangana-600" />,
      number: "2.3",
      label: language === "te" ? "రోజులు" : language === "hi" ? "दिन" : "Days",
      sublabel:
        language === "te"
          ? "సగటు సమయం"
          : language === "hi"
            ? "औसत समय"
            : "Average Time",
    },
    {
      icon: <Users className="w-8 h-8 text-civic-600" />,
      number: "1.2M+",
      label:
        language === "te"
          ? "పౌరులు"
          : language === "hi"
            ? "नागरिक"
            : "Citizens",
      sublabel:
        language === "te"
          ? "నమోదు చేసుకున్నారు"
          : language === "hi"
            ? "पंजीकृत"
            : "Registered",
    },
  ];

  const features = [
    {
      icon: <FileText className="w-12 h-12 text-civic-600" />,
      title:
        language === "te"
          ? "ఫిర్యాదు నమోదు"
          : language === "hi"
            ? "शिकायत दर्ज करें"
            : "Register Complaint",
      description:
        language === "te"
          ? "చిత్రాలు మరియు స్థానంతో పౌర సమస్యలను నివేదించండి"
          : language === "hi"
            ? "चित्रों और स्थान के साथ नागरिक मुद्दों की रिपोर्ट करें"
            : "Report civic issues with photos and location",
    },
    {
      icon: <Search className="w-12 h-12 text-civic-600" />,
      title:
        language === "te"
          ? "రియల్-టైమ్ ట్రాకింగ్"
          : language === "hi"
            ? "रियल-टाइम ट्रैकिंग"
            : "Real-time Tracking",
      description:
        language === "te"
          ? "మీ ఫిర్యాదు స్థితిని తక్షణమే తనిఖీ చేయండి"
          : language === "hi"
            ? "अपनी शिकायत की स्थिति तुरंत जांचें"
            : "Check your complaint status instantly",
    },
    {
      icon: <Globe className="w-12 h-12 text-civic-600" />,
      title:
        language === "te"
          ? "బహుభాషా మద్దతు"
          : language === "hi"
            ? "बहुभाषी समर्थन"
            : "Multilingual Support",
      description:
        language === "te"
          ? "తెలుగు, హిందీ మరియు ఇంగ్లీష్‌లో అందుబాటులో"
          : language === "hi"
            ? "तेलुगु, हिंदी और अंग्रेजी में उपलब्ध"
            : "Available in Telugu, Hindi & English",
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-civic-600" />,
      title:
        language === "te"
          ? "AI చాట్‌బాట్ సహాయం"
          : language === "hi"
            ? "AI चैटबॉट सहायता"
            : "AI Chatbot Support",
      description:
        language === "te"
          ? "24/7 తక్షణ సహాయం మరియు మార్గదర్శకత్వం"
          : language === "hi"
            ? "24/7 तत्काल सहायता और मार्गदर्शन"
            : "24/7 instant help and guidance",
    },
  ];

  const complaintCategories = [
    {
      icon: <Car className="w-6 h-6" />,
      label:
        language === "te" ? "రోడ్లు" : language === "hi" ? "सड़कें" : "Roads",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: language === "te" ? "నీరు" : language === "hi" ? "पानी" : "Water",
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      label:
        language === "te"
          ? "పరిశుభ్రత"
          : language === "hi"
            ? "स्वच्छता"
            : "Sanitation",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label:
        language === "te"
          ? "విద్యుత్"
          : language === "hi"
            ? "बिजली"
            : "Electricity",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      label:
        language === "te"
          ? "వీధి దీపాలు"
          : language === "hi"
            ? "स्ट्रीट लाइट्स"
            : "Street Lights",
      color: "bg-orange-100 text-orange-700",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      label:
        language === "te" ? "భద్రత" : language === "hi" ? "सुरक्षा" : "Safety",
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {language === "te" && (
                <>
                  <span className="block">తెలంగాణ</span>
                  <span className="block text-civic-600">పౌర సేవలు</span>
                </>
              )}
              {language === "hi" && (
                <>
                  <span className="block">तेलंगाना</span>
                  <span className="block text-civic-600">नागरिक सेवाएं</span>
                </>
              )}
              {language === "en" && (
                <>
                  <span className="block">TS Civic</span>
                  <span className="block text-civic-600">
                    Empowering Citizens
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {language === "te" &&
                "పౌర సమస్యలను నివేదించండి, ట్రాక్ చేయండి మరియు పరిష్కరించండి. మంచి పాలనల కోసం మేం కలిసి పని చేద్దాం."}
              {language === "hi" &&
                "नागरिक समस्याओं की रिपोर्ट करें, ट्रैक करें और हल करें। बेहतर गवर्नेंस के लिए आइए मिलकर काम करते हैं।"}
              {language === "en" &&
                "Report, track, and resolve civic issues. Let's work together for better governance and enhanced citizen services."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-civic-600 hover:bg-civic-700"
              >
                <Link to="/register-complaint">
                  <FileText className="w-5 h-5 mr-2" />
                  {language === "te" && "ఫిర్యాదు నమోదు చేయండి"}
                  {language === "hi" && "शिकायत दर्ज करें"}
                  {language === "en" && "Register Complaint"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/track-complaint">
                  <Search className="w-5 h-5 mr-2" />
                  {language === "te" && "ఫిర్యాదు ట్రాక్ చేయండి"}
                  {language === "hi" && "शिकायत ट्रैक करें"}
                  {language === "en" && "Track Complaint"}
                </Link>
              </Button>
            </div>

            {/* Quick Complaint Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {complaintCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-2`}
                  >
                    {category.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">
                    {category.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-civic-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "te" && "మా ప్రధాన సేవలు"}
              {language === "hi" && "हमारी मुख्य सेवाएं"}
              {language === "en" && "Key Features"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "te" &&
                "పౌరులు మరియు ప్రభుత్వ అధికారుల మధ్య వంతెనగా పనిచేస్తున్న ఆధునిక డిజిటల్ ప్లాట్‌ఫారమ్"}
              {language === "hi" &&
                "नागरिकों और सरकारी अधिकारियों के बीच सेतु का काम करने वाला आधुनिक डिजिटल प्लेटफॉर्म"}
              {language === "en" &&
                "Modern digital platform bridging citizens and government officials"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "te" && "ఇది ఎలా పనిచేస్తుంది"}
              {language === "hi" && "यह कैसे काम करता है"}
              {language === "en" && "How It Works"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-civic-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-civic-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {language === "te" && "1. నివేదించండి"}
                {language === "hi" && "1. रिपोर्ट करें"}
                {language === "en" && "1. Report"}
              </h3>
              <p className="text-gray-600">
                {language === "te" &&
                  "సమస్యను ఫొటోలు మరియు లొకేషన్‌తో నివేదించండి"}
                {language === "hi" &&
                  "समस्या को फोटो और लोकेशन के साथ रिपोर्ट करें"}
                {language === "en" &&
                  "Report the issue with photos and location"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-telangana-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-telangana-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {language === "te" && "2. ట్రాక్ చేయండి"}
                {language === "hi" && "2. ट्रैक करें"}
                {language === "en" && "2. Track"}
              </h3>
              <p className="text-gray-600">
                {language === "te" &&
                  "మీ ఫిర్యాదు స్థితిని రియల్-టైమ్‌లో ట్రాక్ చేయండి"}
                {language === "hi" &&
                  "अपनी शिकायत की स्थिति को रियल-टाइम में ट्रैक करें"}
                {language === "en" &&
                  "Track your complaint status in real-time"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {language === "te" && "3. పరిష్కరించబడింది"}
                {language === "hi" && "3. हल हो गया"}
                {language === "en" && "3. Resolved"}
              </h3>
              <p className="text-gray-600">
                {language === "te" &&
                  "అధికారులు సమస్యను పరిష్కరించి మీకు అప్‌డేట్ అందిస్తారు"}
                {language === "hi" &&
                  "अधिकारी समस्या का समाधान करके आपको अपडेट देते हैं"}
                {language === "en" &&
                  "Officials resolve the issue and provide updates"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-civic-600 to-civic-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === "te" && "మీ గొంతుకను విన్న అధికారులు"}
            {language === "hi" && "आपकी आवाज़ सुनने वाले अधिकारी"}
            {language === "en" && "Make Your Voice Heard"}
          </h2>
          <p className="text-xl text-civic-100 mb-8 max-w-3xl mx-auto">
            {language === "te" &&
              "మెరుగైన పాలనల కోసం మీ పౌర బాధ్యతను నిర్వర్తించండి"}
            {language === "hi" &&
              "बेहतर गवर्नेंस के लिए अपनी नागरिक जिम्मेदारी निभाएं"}
            {language === "en" &&
              "Take civic responsibility for better governance"}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/register-complaint">
                <Smartphone className="w-5 h-5 mr-2" />
                {language === "te" && "మొబైల్ యాప్ డౌన్‌లోడ్ చేయండి"}
                {language === "hi" && "मोबाइल ऐप डाउनलोड करें"}
                {language === "en" && "Download Mobile App"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-civic-600"
            >
              <Link to="/dashboard">
                <BarChart3 className="w-5 h-5 mr-2" />
                {language === "te" && "అధికారుల డాష్‌బోర్డ్"}
                {language === "hi" && "अधिकारी डैशबोर्ड"}
                {language === "en" && "Official Dashboard"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-civic-500 to-civic-700 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">TS Civic</div>
                  <div className="text-sm text-gray-400">
                    Government of Telangana
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                {language === "te" &&
                  "పౌరులను శక్తివంతం చేయడం, పాలనను మెరుగుపరచడం - తెలంగాణ పౌర సేవల డిజిటల్ ప్లాట్‌ఫారమ్"}
                {language === "hi" &&
                  "नागरिकों को सशक्त बनाना, गवर्नेंस को बेहतर बनाना - तेलंगाना नागरिक सेवाओं का डिजिटल प्लेटफॉर्म"}
                {language === "en" &&
                  "Empowering Citizens, Enhancing Governance - Digital platform for Telangana civic services"}
              </p>
              <div className="flex space-x-2">
                <Badge variant="secondary">24/7 Support</Badge>
                <Badge variant="secondary">Multilingual</Badge>
                <Badge variant="secondary">Real-time Updates</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                {language === "te" && "త్వరిత లింకులు"}
                {language === "hi" && "त्वरित लिंक"}
                {language === "en" && "Quick Links"}
              </h3>
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
                    to="/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                {language === "te" && "సంప్రదించండి"}
                {language === "hi" && "संपर्क"}
                {language === "en" && "Contact"}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Helpline: 1800-XXX-XXXX</li>
                <li>Email: support@tscivic.gov.in</li>
                <li>Emergency: 100</li>
                <li>Office Hours: 9 AM - 6 PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 TS Civic - Government of Telangana. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
