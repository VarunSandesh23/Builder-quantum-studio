import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MapPin,
  Calendar,
  User,
} from "lucide-react";

const TrackComplaint = () => {
  const sampleComplaints = [
    {
      id: "TSC2024001234",
      title: "Road damage near IT Hub",
      category: "Roads",
      status: "In Progress",
      priority: "High",
      date: "2024-01-15",
      location: "Hitec City, Hyderabad",
    },
    {
      id: "TSC2024001235",
      title: "Water supply issue",
      category: "Water",
      status: "Resolved",
      priority: "Medium",
      date: "2024-01-10",
      location: "Jubilee Hills, Hyderabad",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Track Your Complaint
          </h1>
          <p className="text-lg text-gray-600">
            Enter your complaint ID or phone number to check status
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Complaint
            </CardTitle>
            <CardDescription>
              Enter your complaint ID (e.g., TSC2024001234) or registered phone
              number
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Complaint ID or Phone Number"
                className="flex-1"
              />
              <Button className="bg-civic-600 hover:bg-civic-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Recent Complaints
          </h2>

          {sampleComplaints.map((complaint) => (
            <Card
              key={complaint.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-civic-600" />
                      <span className="font-mono text-sm text-civic-600 font-medium">
                        {complaint.id}
                      </span>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(complaint.priority)}
                      >
                        {complaint.priority}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {complaint.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {complaint.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {complaint.date}
                      </div>
                      <Badge variant="secondary">{complaint.category}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(complaint.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(complaint.status)}
                        {complaint.status}
                      </span>
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-8 bg-civic-50 border-civic-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-civic-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  If you can't find your complaint or need assistance, please
                  contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Live Chat Support
                  </Button>
                  <Button variant="outline" size="sm">
                    Call Helpline: 1800-XXX-XXXX
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackComplaint;
