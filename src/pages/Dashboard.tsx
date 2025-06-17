import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  Filter,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Complaints",
      value: "12,847",
      change: "+5.2%",
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-600",
    },
    {
      title: "Resolved",
      value: "9,234",
      change: "+8.1%",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
    },
    {
      title: "In Progress",
      value: "2,891",
      change: "-2.3%",
      icon: <Clock className="w-6 h-6" />,
      color: "text-yellow-600",
    },
    {
      title: "Pending",
      value: "722",
      change: "-12.5%",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "text-red-600",
    },
  ];

  const recentComplaints = [
    {
      id: "TSC2024001245",
      title: "Street light not working",
      location: "Banjara Hills",
      category: "Street Lights",
      priority: "Medium",
      status: "Assigned",
      assignedTo: "GHMC Zone 4",
      time: "2 hours ago",
    },
    {
      id: "TSC2024001244",
      title: "Road pothole causing traffic",
      location: "Hitec City",
      category: "Roads",
      priority: "High",
      status: "In Progress",
      assignedTo: "Roads Dept",
      time: "4 hours ago",
    },
    {
      id: "TSC2024001243",
      title: "Water leakage in main pipeline",
      location: "Jubilee Hills",
      category: "Water",
      priority: "High",
      status: "Resolved",
      assignedTo: "Water Board",
      time: "1 day ago",
    },
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Assigned":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Monitor and manage civic complaints across Telangana
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-civic-600 hover:bg-civic-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm flex items-center gap-1 mt-1 ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Complaints by Category</CardTitle>
              <CardDescription>
                Distribution of complaints across different categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Chart placeholder - Coming soon</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resolution Trend</CardTitle>
              <CardDescription>
                Monthly resolution rate over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Chart placeholder - Coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Complaints
            </CardTitle>
            <CardDescription>
              Latest complaints requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm text-civic-600 font-medium">
                        {complaint.id}
                      </span>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(complaint.priority)}
                      >
                        {complaint.priority}
                      </Badge>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">
                      {complaint.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {complaint.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {complaint.assignedTo}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {complaint.time}
                      </div>
                      <Badge variant="secondary">{complaint.category}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 md:mt-0">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-civic-600 hover:bg-civic-700"
                    >
                      Take Action
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6 bg-civic-50 border-civic-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Assign Bulk Complaints
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                View Map View
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Export Analytics
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                High Priority Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
