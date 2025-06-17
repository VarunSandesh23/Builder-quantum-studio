import { useState } from "react";
import { useComplaints, Complaint } from "@/context/ComplaintContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Eye,
  Edit,
  Building2,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { complaints, updateComplaintStatus, getComplaintStats } =
    useComplaints();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null,
  );
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Action form state
  const [actionForm, setActionForm] = useState({
    status: "",
    notes: "",
    assignedTo: "",
    estimatedResolution: "",
  });

  const stats = getComplaintStats();
  const statsData = [
    {
      title: "Total Complaints",
      value: stats.total.toString(),
      change: "+5.2%",
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-600",
    },
    {
      title: "Resolved",
      value: stats.resolved.toString(),
      change: "+8.1%",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-green-600",
    },
    {
      title: "In Progress",
      value: stats.inProgress.toString(),
      change: "-2.3%",
      icon: <Clock className="w-6 h-6" />,
      color: "text-yellow-600",
    },
    {
      title: "Pending",
      value: stats.pending.toString(),
      change: "-12.5%",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "text-red-600",
    },
  ];

  // Filter complaints
  const filteredComplaints = complaints.filter((complaint) => {
    const statusMatch =
      filterStatus === "all" || complaint.status === filterStatus;
    const priorityMatch =
      filterPriority === "all" || complaint.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "assigned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "assigned":
        return <Users className="w-4 h-4 text-yellow-600" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "closed":
        return <XCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "assigned":
        return "Assigned";
      case "pending":
        return "Pending";
      case "resolved":
        return "Resolved";
      case "closed":
        return "Closed";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const viewComplaintDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsDialog(true);
  };

  const takeAction = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setActionForm({
      status: complaint.status,
      notes: "",
      assignedTo: complaint.assignedTo || "",
      estimatedResolution: complaint.estimatedResolution || "",
    });
    setShowActionDialog(true);
  };

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    updateComplaintStatus(
      selectedComplaint.id,
      actionForm.status as Complaint["status"],
      actionForm.notes,
      "Admin Dashboard",
    );

    // Update additional fields if provided
    const updates: Partial<Complaint> = {};
    if (actionForm.assignedTo !== selectedComplaint.assignedTo) {
      updates.assignedTo = actionForm.assignedTo;
    }
    if (
      actionForm.estimatedResolution !== selectedComplaint.estimatedResolution
    ) {
      updates.estimatedResolution = actionForm.estimatedResolution;
    }
    if (actionForm.status === "resolved" && actionForm.notes) {
      updates.resolutionNotes = actionForm.notes;
    }

    setShowActionDialog(false);
    setActionForm({
      status: "",
      notes: "",
      assignedTo: "",
      estimatedResolution: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  TS Civic
                </span>
                <span className="text-xs text-gray-600 ml-2">
                  Admin Dashboard
                </span>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
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

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <Label>Priority</Label>
                <Select
                  value={filterPriority}
                  onValueChange={setFilterPriority}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterStatus("all");
                    setFilterPriority("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Complaints ({filteredComplaints.length})
            </CardTitle>
            <CardDescription>
              Manage and resolve citizen complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm text-blue-600 font-medium">
                        {complaint.id}
                      </span>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(complaint.priority)}
                      >
                        {complaint.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(complaint.status)}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1">
                          {getStatusDisplayName(complaint.status)}
                        </span>
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">
                      {complaint.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {complaint.landmark || complaint.location.split(",")[0]}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {complaint.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {complaint.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(complaint.createdAt)}
                      </div>
                      <Badge variant="secondary">{complaint.subcategory}</Badge>
                      {complaint.assignedTo && (
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {complaint.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewComplaintDetails(complaint)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => takeAction(complaint)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Take Action
                    </Button>
                  </div>
                </div>
              ))}

              {filteredComplaints.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No complaints found
                  </h3>
                  <p className="text-gray-600">
                    No complaints match the current filters.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaint Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedComplaint && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Complaint Details - {selectedComplaint.id}
                </DialogTitle>
                <DialogDescription>
                  Complete information and history for this complaint
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedComplaint.status)}>
                      {getStatusDisplayName(selectedComplaint.status)}
                    </Badge>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge
                      className={getPriorityColor(selectedComplaint.priority)}
                    >
                      {selectedComplaint.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Title</Label>
                  <p className="font-medium">{selectedComplaint.title}</p>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-gray-700">
                    {selectedComplaint.description}
                  </p>
                </div>
                <div>
                  <Label>Contact</Label>
                  <p>
                    {selectedComplaint.name} - {selectedComplaint.phone}
                  </p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p>{selectedComplaint.location}</p>
                  {selectedComplaint.landmark && (
                    <p>Near: {selectedComplaint.landmark}</p>
                  )}
                </div>
                {selectedComplaint.assignedTo && (
                  <div>
                    <Label>Assigned To</Label>
                    <p>{selectedComplaint.assignedTo}</p>
                  </div>
                )}
                <div>
                  <Label>History</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedComplaint.history.map((entry, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {getStatusDisplayName(entry.status)}
                          </span>
                          <span className="text-sm text-gray-600">
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{entry.notes}</p>
                        <p className="text-xs text-gray-600">
                          By: {entry.updatedBy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Take Action</DialogTitle>
            <DialogDescription>
              Update complaint status and add notes
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleActionSubmit} className="space-y-4">
            <div>
              <Label>Status</Label>
              <Select
                value={actionForm.status}
                onValueChange={(value) =>
                  setActionForm({ ...actionForm, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Assign To</Label>
              <Input
                value={actionForm.assignedTo}
                onChange={(e) =>
                  setActionForm({ ...actionForm, assignedTo: e.target.value })
                }
                placeholder="Department or team name"
              />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                value={actionForm.notes}
                onChange={(e) =>
                  setActionForm({ ...actionForm, notes: e.target.value })
                }
                placeholder="Add update notes..."
                required
              />
            </div>
            <div className="flex space-x-3">
              <Button type="submit" className="flex-1">
                Update
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowActionDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
