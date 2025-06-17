import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  MapPin,
  Upload,
  FileText,
  Phone,
  Mail,
  User,
  Car,
  Droplets,
  Trash2,
  Zap,
  Lightbulb,
  Shield,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [language] = useState("en");
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    location: "",
    landmark: "",
    priority: "medium",
    name: "",
    phone: "",
    email: "",
    anonymous: false,
    images: [] as File[],
  });

  const categories = [
    {
      id: "roads",
      icon: <Car className="w-5 h-5" />,
      label:
        language === "te" ? "రోడ్లు" : language === "hi" ? "सड़कें" : "Roads",
      subcategories: [
        language === "te"
          ? "రోడ్ డ్యామేజ్"
          : language === "hi"
            ? "सड़क क्षति"
            : "Road Damage",
        language === "te"
          ? "పోట్‌హోల్స్"
          : language === "hi"
            ? "गड्ढे"
            : "Potholes",
        language === "te"
          ? "ట్రాఫిక్ సిగ్నల్స్"
          : language === "hi"
            ? "ट्रैफिक सिग्नल"
            : "Traffic Signals",
      ],
    },
    {
      id: "water",
      icon: <Droplets className="w-5 h-5" />,
      label: language === "te" ? "నీరు" : language === "hi" ? "पानी" : "Water",
      subcategories: [
        language === "te"
          ? "నీటి కొరత"
          : language === "hi"
            ? "पानी की कमी"
            : "Water Shortage",
        language === "te"
          ? "పైప్ లీకేజీ"
          : language === "hi"
            ? "पाइप लीकेज"
            : "Pipe Leakage",
        language === "te"
          ? "నీటి నాణ్యత"
          : language === "hi"
            ? "पानी की गुणवत्ता"
            : "Water Quality",
      ],
    },
    {
      id: "sanitation",
      icon: <Trash2 className="w-5 h-5" />,
      label:
        language === "te"
          ? "పరిశుభ్రత"
          : language === "hi"
            ? "स्वच्छता"
            : "Sanitation",
      subcategories: [
        language === "te"
          ? "చెత్త సేకరణ"
          : language === "hi"
            ? "कचरा संग्रह"
            : "Garbage Collection",
        language === "te"
          ? "డ్రైనేజీ"
          : language === "hi"
            ? "ड्रेनेज"
            : "Drainage",
        language === "te"
          ? "మురుగు నీరు"
          : language === "hi"
            ? "गंदा पानी"
            : "Sewage",
      ],
    },
    {
      id: "electricity",
      icon: <Zap className="w-5 h-5" />,
      label:
        language === "te"
          ? "విద్యుత్"
          : language === "hi"
            ? "बिजली"
            : "Electricity",
      subcategories: [
        language === "te"
          ? "పవర్ కట్"
          : language === "hi"
            ? "बिजली कटौती"
            : "Power Cut",
        language === "te"
          ? "లైన్ ఫాల్ట్"
          : language === "hi"
            ? "लाइन फॉल्ट"
            : "Line Fault",
        language === "te"
          ? "ట్రాన్స్‌ఫార్మర్ ఇష్యూ"
          : language === "hi"
            ? "ट्रांसफार्मर समस्या"
            : "Transformer Issue",
      ],
    },
    {
      id: "streetlights",
      icon: <Lightbulb className="w-5 h-5" />,
      label:
        language === "te"
          ? "వీధి దీపాలు"
          : language === "hi"
            ? "स्ट्रीट लाइट्स"
            : "Street Lights",
      subcategories: [
        language === "te"
          ? "దీపం పని చేయడం లేదు"
          : language === "hi"
            ? "लाइट काम नहीं कर रही"
            : "Light Not Working",
        language === "te"
          ? "పోల్ డ్యామ��జ్"
          : language === "hi"
            ? "पोल क्षति"
            : "Pole Damage",
      ],
    },
    {
      id: "safety",
      icon: <Shield className="w-5 h-5" />,
      label:
        language === "te" ? "భద్రత" : language === "hi" ? "सुरक्षा" : "Safety",
      subcategories: [
        language === "te"
          ? "వాహన పార్కింగ్"
          : language === "hi"
            ? "वाहन पार्किंग"
            : "Vehicle Parking",
        language === "te"
          ? "అనధికార నిర్మాణం"
          : language === "hi"
            ? "अवैध निर्माण"
            : "Illegal Construction",
        language === "te"
          ? "గోవర్నమెంట్ ప్రాపర్టీ ఎన్‌క్రోచ్‌మెంట్"
          : language === "hi"
            ? "सरकारी संपत्ति अतिक्रमण"
            : "Government Property Encroachment",
      ],
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({
      ...formData,
      images: [...formData.images, ...files].slice(0, 5),
    });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate complaint submission
    console.log("Complaint submitted:", formData);

    // Show success message and redirect
    alert(
      language === "te"
        ? "మీ ఫిర్యాదు విజయవంతంగా నమోదు చేయబడింది!"
        : language === "hi"
          ? "आपकी शिकायत सफलतापूर्वक दर्ज की गई!"
          : "Your complaint has been registered successfully!",
    );

    navigate("/track-complaint");
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData({
          ...formData,
          location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === "te" && "ఫిర్యాదు నమోదు చేయండి"}
            {language === "hi" && "शिकायत दर्ज करें"}
            {language === "en" && "Register Complaint"}
          </h1>
          <p className="text-lg text-gray-600">
            {language === "te" && "మీ పౌర సమస్యను వివరంగా నివేదించండి"}
            {language === "hi" && "अपनी नागरिक समस्या का विस्तार से वर्णन करें"}
            {language === "en" && "Report your civic issue in detail"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {language === "te" && "సమస్య వర్గం"}
                {language === "hi" && "समस्या श्रेणी"}
                {language === "en" && "Issue Category"}
              </CardTitle>
              <CardDescription>
                {language === "te" &&
                  "మీ సమస్యకు సంబంధించిన వర్గాన్ని ఎంచుకోండి"}
                {language === "hi" && "अपनी समस्या से संबंधित श्रेणी चुनें"}
                {language === "en" &&
                  "Choose the category related to your issue"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.category === category.id
                        ? "border-civic-500 bg-civic-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: category.id,
                        subcategory: "",
                      })
                    }
                  >
                    <div className="flex items-center space-x-3">
                      {category.icon}
                      <span className="font-medium">{category.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {formData.category && (
                <div className="mt-4">
                  <Label htmlFor="subcategory">
                    {language === "te" && "ఉప వర్గం"}
                    {language === "hi" && "उप श्रेणी"}
                    {language === "en" && "Subcategory"}
                  </Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) =>
                      setFormData({ ...formData, subcategory: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          language === "te"
                            ? "ఉప వర్గాన్ని ఎంచుకోండి"
                            : language === "hi"
                              ? "उप श्रेणी चुनें"
                              : "Select subcategory"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .find((cat) => cat.id === formData.category)
                        ?.subcategories.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Issue Details */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "te" && "సమస్య వివరాలు"}
                {language === "hi" && "समस्या विवरण"}
                {language === "en" && "Issue Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">
                  {language === "te" && "సమస్య శీర్షిక"}
                  {language === "hi" && "समस्या शीर्षक"}
                  {language === "en" && "Issue Title"}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder={
                    language === "te"
                      ? "సంక్షిప్త శీర్షిక రాయండి"
                      : language === "hi"
                        ? "संक्षिप्त शीर्षक लिखें"
                        : "Write a brief title"
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">
                  {language === "te" && "వివరణ"}
                  {language === "hi" && "विवरण"}
                  {language === "en" && "Description"}
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder={
                    language === "te"
                      ? "సమస్యను వివరంగా వర్ణించండి"
                      : language === "hi"
                        ? "समस्या का विस्तृत वर्णन करें"
                        : "Describe the issue in detail"
                  }
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="priority">
                  {language === "te" && "ప్రాధాన్యత"}
                  {language === "hi" && "प्राथमिकता"}
                  {language === "en" && "Priority"}
                </Label>
                <RadioGroup
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label
                      htmlFor="low"
                      className="flex items-center space-x-1"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>
                        {language === "te"
                          ? "తక్కువ"
                          : language === "hi"
                            ? "कम"
                            : "Low"}
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label
                      htmlFor="medium"
                      className="flex items-center space-x-1"
                    >
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>
                        {language === "te"
                          ? "మధ్యమ"
                          : language === "hi"
                            ? "मध्यम"
                            : "Medium"}
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label
                      htmlFor="high"
                      className="flex items-center space-x-1"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>
                        {language === "te"
                          ? "అధిక"
                          : language === "hi"
                            ? "उच्च"
                            : "High"}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {language === "te" && "స్థానం"}
                {language === "hi" && "स्थान"}
                {language === "en" && "Location"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder={
                    language === "te"
                      ? "చిరునామా లేదా అక్షాంశం, రేఖాంశం"
                      : language === "hi"
                        ? "पता या अक्षांश, देशांतर"
                        : "Address or latitude, longitude"
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === "te"
                    ? "నా స్థానం"
                    : language === "hi"
                      ? "मेरा स्थान"
                      : "My Location"}
                </Button>
              </div>

              <div>
                <Label htmlFor="landmark">
                  {language === "te" && "సమీప ల్యాండ్‌మార్క్"}
                  {language === "hi" && "निकटतम लैंडमार्क"}
                  {language === "en" && "Nearby Landmark"}
                </Label>
                <Input
                  id="landmark"
                  value={formData.landmark}
                  onChange={(e) =>
                    setFormData({ ...formData, landmark: e.target.value })
                  }
                  placeholder={
                    language === "te"
                      ? "సమీప దుకాణం, పార్క్ లేదా ప్రసిద్ధ ప్రదేశం"
                      : language === "hi"
                        ? "निकटतम दुकान, पार्क या प्रसिद्ध स्थान"
                        : "Nearby shop, park or famous place"
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                {language === "te" && "చిత్రాలు"}
                {language === "hi" && "तस्वीरें"}
                {language === "en" && "Photos"}
              </CardTitle>
              <CardDescription>
                {language === "te" &&
                  "సమస్యకు సంబంధించిన చిత్రాలను అప్‌లోడ్ చేయండి (గరిష్ఠంగా 5)"}
                {language === "hi" &&
                  "समस्या से संबंधित तस्वीरें अपलोड करें (अधिकतम 5)"}
                {language === "en" &&
                  "Upload photos related to the issue (max 5)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600">
                      {language === "te" &&
                        "క్లిక్ చేసి చిత్రాలను ఎంచుకోండి లేదా ఇక్కడ డ్రాగ్ చేయండి"}
                      {language === "hi" &&
                        "तस्वीरें चुनने के लिए क्लिक करें या यहाँ ड्रैग करें"}
                      {language === "en" &&
                        "Click to select photos or drag them here"}
                    </p>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {language === "te" && "సంప్రదింపు వివరాలు"}
                {language === "hi" && "संपर्क विवरण"}
                {language === "en" && "Contact Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">
                    {language === "te" && "పూర్తి పేరు"}
                    {language === "hi" && "पूरा नाम"}
                    {language === "en" && "Full Name"}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">
                    {language === "te" && "ఫోన్ నంబర్"}
                    {language === "hi" && "फोन नंबर"}
                    {language === "en" && "Phone Number"}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">
                  {language === "te" && "ఇమెయిల్ చిరునామా"}
                  {language === "hi" && "ईमेल पता"}
                  {language === "en" && "Email Address"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-yellow-800">
                      {language === "te" && "గోప్యతా నోటీస్"}
                      {language === "hi" && "गोपनीयता सूचना"}
                      {language === "en" && "Privacy Notice"}
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      {language === "te" &&
                        "మీ వ్యక్తిగత వివరాలు సురక్షితంగా ఉంచబడతాయి మరియు అప్‌డేట్‌ల కోసం మాత్రమే ఉపయోగించబడతాయి."}
                      {language === "hi" &&
                        "आपकी व्यक्तिगत जानकारी सुरक्षित रखी जाएगी और केवल अपडेट के लिए उपयोग की जाएगी।"}
                      {language === "en" &&
                        "Your personal information will be kept secure and used only for updates."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>
                    {language === "te" &&
                      "ఫిర్యాదు ID స్వయంచాలకంగా జనరేట్ చేయబడుతుంది"}
                    {language === "hi" &&
                      "शिकायत ID स्वचालित रूप से जेनरेट होगी"}
                    {language === "en" && "Complaint ID will be auto-generated"}
                  </span>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-civic-600 hover:bg-civic-700"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {language === "te" && "ఫిర్యాదు సబ్మిట్ చేయండి"}
                  {language === "hi" && "शिकायत जमा करें"}
                  {language === "en" && "Submit Complaint"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default RegisterComplaint;
