import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComplaints } from "@/context/ComplaintContext";
import { useNotifications } from "@/context/NotificationContext";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  MapPin,
  Upload,
  FileText,
  User,
  Car,
  Droplets,
  Trash2,
  Zap,
  Lightbulb,
  Shield,
  AlertCircle,
  CheckCircle2,
  Copy,
} from "lucide-react";

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const { addComplaint } = useComplaints();
  const { addNotification } = useNotifications();
  const [language] = useState("en");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    location: "",
    landmark: "",
    priority: "medium" as "low" | "medium" | "high",
    name: "",
    phone: "",
    email: "",
    images: [] as File[],
  });

  const categories = [
    {
      id: "roads",
      icon: <Car className="w-5 h-5" />,
      label: "Roads",
      subcategories: ["Road Damage", "Potholes", "Traffic Signals"],
    },
    {
      id: "water",
      icon: <Droplets className="w-5 h-5" />,
      label: "Water",
      subcategories: ["Water Shortage", "Pipe Leakage", "Water Quality"],
    },
    {
      id: "sanitation",
      icon: <Trash2 className="w-5 h-5" />,
      label: "Sanitation",
      subcategories: ["Garbage Collection", "Drainage", "Sewage"],
    },
    {
      id: "electricity",
      icon: <Zap className="w-5 h-5" />,
      label: "Electricity",
      subcategories: ["Power Cut", "Line Fault", "Transformer Issue"],
    },
    {
      id: "streetlights",
      icon: <Lightbulb className="w-5 h-5" />,
      label: "Street Lights",
      subcategories: ["Light Not Working", "Pole Damage"],
    },
    {
      id: "safety",
      icon: <Shield className="w-5 h-5" />,
      label: "Safety",
      subcategories: [
        "Vehicle Parking",
        "Illegal Construction",
        "Government Property Encroachment",
      ],
    },
  ];

  const convertFilesToBase64 = async (files: File[]): Promise<string[]> => {
    const promises = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert images to base64
      const imageBase64 = await convertFilesToBase64(formData.images);

      // Submit complaint
      const id = addComplaint({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory,
        location: formData.location,
        landmark: formData.landmark,
        priority: formData.priority,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        images: imageBase64,
      });

      // Send notification to admins about new complaint
      addNotification({
        type: "complaint_submitted",
        title: "🚨 New Complaint Alert",
        message: `New ${formData.category.toUpperCase()} complaint: "${formData.title}" submitted by ${formData.name} in ${formData.landmark || formData.location}. Priority: ${formData.priority.toUpperCase()}`,
        complaintId: id,
        userId: "all-admins", // Target all admin users
        userRole: "admin",
        priority: formData.priority === "high" ? "high" : "medium",
        actionUrl: "/dashboard",
      });

      // Also send a general notification for all officials
      addNotification({
        type: "complaint_submitted",
        title: "📋 New Complaint Assigned",
        message: `${formData.category.charAt(0).toUpperCase() + formData.category.slice(1)} complaint "${formData.title}" needs review. Location: ${formData.landmark || formData.location}`,
        complaintId: id,
        userId: "all-officials",
        userRole: "official",
        priority: formData.priority === "high" ? "high" : "medium",
        actionUrl: "/dashboard",
      });

      setComplaintId(id);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Error submitting complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

  const copyComplaintId = () => {
    navigator.clipboard.writeText(complaintId);
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    navigate("/track-complaint");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Simple Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  TG Civic
                </span>
                <span className="text-xs text-gray-600 ml-2">
                  Register Complaint
                </span>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Register Complaint
          </h1>
          <p className="text-lg text-gray-600">
            Report your civic issue in detail
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Issue Category
              </CardTitle>
              <CardDescription>
                Choose the category related to your issue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.category === category.id
                        ? "border-blue-500 bg-blue-50"
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
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) =>
                      setFormData({ ...formData, subcategory: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
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
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">
                  Issue Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Write a brief title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the issue in detail"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <RadioGroup
                  value={formData.priority}
                  onValueChange={(value: "low" | "medium" | "high") =>
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
                      <span>Low</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label
                      htmlFor="medium"
                      className="flex items-center space-x-1"
                    >
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>Medium</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label
                      htmlFor="high"
                      className="flex items-center space-x-1"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>High</span>
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
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Address or latitude, longitude"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  My Location
                </Button>
              </div>

              <div>
                <Label htmlFor="landmark">Nearby Landmark</Label>
                <Input
                  id="landmark"
                  value={formData.landmark}
                  onChange={(e) =>
                    setFormData({ ...formData, landmark: e.target.value })
                  }
                  placeholder="Nearby shop, park or famous place"
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Photos
              </CardTitle>
              <CardDescription>
                Upload photos related to the issue (max 5)
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
                      Click to select photos or drag them here
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
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
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
                    Phone Number <span className="text-red-500">*</span>
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
                <Label htmlFor="email">Email Address</Label>
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
                      Privacy Notice
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your personal information will be kept secure and used
                      only for updates.
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
                  <span>Complaint ID will be auto-generated</span>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-6 h-6" />
              Complaint Registered Successfully!
            </DialogTitle>
            <DialogDescription>
              Your complaint has been registered and assigned a tracking ID.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-700">
                Your Complaint ID
              </Label>
              <div className="flex items-center justify-between mt-2">
                <span className="font-mono text-lg font-bold text-blue-600">
                  {complaintId}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyComplaintId}
                  className="ml-2"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-800">Important Notes</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Save this ID to track your complaint status</li>
                    <li>• You will receive SMS/Email updates</li>
                    <li>• Expected resolution within 3-5 working days</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => navigate("/track-complaint")}
                className="flex-1"
              >
                Track Complaint
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterComplaint;
