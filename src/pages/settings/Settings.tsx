import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Building, 
  Users, 
  Shield, 
  Database, 
  Bell, 
  Mail,
  Phone,
  MapPin,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff
} from "lucide-react";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [hospitalSettings, setHospitalSettings] = useState({
    name: "MediCare General Hospital",
    address: "123 Medical Center Drive, Healthcare City",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    phone: "+1 (555) 123-4567",
    email: "info@medicarehospital.com",
    website: "www.medicarehospital.com",
    licenseNumber: "HOSP-2024-001",
    taxId: "12-3456789",
    establishedYear: "1985"
  });

  const [systemSettings, setSystemSettings] = useState({
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    language: "English",
    currency: "USD",
    sessionTimeout: 30,
    backupFrequency: "daily",
    emailNotifications: true,
    smsNotifications: true,
    maintenanceMode: false,
    debugMode: false
  });

  const departments = [
    { id: "DEPT001", name: "Cardiology", head: "Dr. Emily Chen", status: "active" },
    { id: "DEPT002", name: "Neurology", head: "Dr. Robert Smith", status: "active" },
    { id: "DEPT003", name: "Orthopedics", head: "Dr. Michael Johnson", status: "active" },
    { id: "DEPT004", name: "Pediatrics", head: "Dr. Lisa Anderson", status: "active" },
    { id: "DEPT005", name: "Emergency", head: "Dr. Sarah Wilson", status: "active" },
    { id: "DEPT006", name: "Surgery", head: "Dr. David Brown", status: "inactive" }
  ];

  const userRoles = [
    { id: "ROLE001", name: "Admin", description: "Full system access", permissions: 15, users: 2 },
    { id: "ROLE002", name: "Doctor", description: "Medical staff access", permissions: 12, users: 8 },
    { id: "ROLE003", name: "Nurse", description: "Patient care access", permissions: 10, users: 15 },
    { id: "ROLE004", name: "Receptionist", description: "Front desk access", permissions: 8, users: 4 },
    { id: "ROLE005", name: "Billing", description: "Financial access", permissions: 6, users: 3 },
    { id: "ROLE006", name: "Patient", description: "Patient portal access", permissions: 4, users: 1250 }
  ];

  const integrations = [
    { name: "Email Service", provider: "SendGrid", status: "connected", lastSync: "2024-10-21 14:30" },
    { name: "SMS Service", provider: "Twilio", status: "connected", lastSync: "2024-10-21 14:25" },
    { name: "Payment Gateway", provider: "Stripe", status: "connected", lastSync: "2024-10-21 14:20" },
    { name: "Lab System", provider: "LabCorp", status: "disconnected", lastSync: "2024-10-20 16:45" },
    { name: "Insurance API", provider: "CoverageAPI", status: "connected", lastSync: "2024-10-21 14:15" }
  ];

  const handleSaveHospitalSettings = () => {
    // Save hospital settings logic
    console.log("Saving hospital settings:", hospitalSettings);
  };

  const handleSaveSystemSettings = () => {
    // Save system settings logic
    console.log("Saving system settings:", systemSettings);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-light text-success";
      case "inactive":
        return "bg-destructive-light text-destructive";
      case "connected":
        return "bg-success-light text-success";
      case "disconnected":
        return "bg-destructive-light text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Settings</h1>
            <p className="text-muted-foreground">Configure hospital settings and system preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Database className="h-4 w-4" />
              Backup Data
            </Button>
            <Button variant="hero" className="gap-2">
              <Save className="h-4 w-4" />
              Save All Changes
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="hospital" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hospital">Hospital Info</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="roles">User Roles</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Hospital Information Tab */}
          <TabsContent value="hospital">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Hospital Information
                </CardTitle>
                <CardDescription>Configure basic hospital details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input
                        id="hospitalName"
                        value={hospitalSettings.name}
                        onChange={(e) => setHospitalSettings({...hospitalSettings, name: e.target.value})}
                        placeholder="Enter hospital name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        value={hospitalSettings.licenseNumber}
                        onChange={(e) => setHospitalSettings({...hospitalSettings, licenseNumber: e.target.value})}
                        placeholder="Enter license number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxId">Tax ID</Label>
                      <Input
                        id="taxId"
                        value={hospitalSettings.taxId}
                        onChange={(e) => setHospitalSettings({...hospitalSettings, taxId: e.target.value})}
                        placeholder="Enter tax ID"
                      />
                    </div>
                    <div>
                      <Label htmlFor="establishedYear">Established Year</Label>
                      <Input
                        id="establishedYear"
                        value={hospitalSettings.establishedYear}
                        onChange={(e) => setHospitalSettings({...hospitalSettings, establishedYear: e.target.value})}
                        placeholder="Enter established year"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={hospitalSettings.phone}
                        onChange={(e) => setHospitalSettings({...hospitalSettings, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={hospitalSettings.email}
                        onChange={(e) => setHospitalSettings({...hospitalSettings, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={hospitalSettings.website}
                        onChange={(e) => setHospitalSettings({...hospitalSettings, website: e.target.value})}
                        placeholder="Enter website URL"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={hospitalSettings.address}
                    onChange={(e) => setHospitalSettings({...hospitalSettings, address: e.target.value})}
                    placeholder="Enter full address"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={hospitalSettings.city}
                      onChange={(e) => setHospitalSettings({...hospitalSettings, city: e.target.value})}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={hospitalSettings.state}
                      onChange={(e) => setHospitalSettings({...hospitalSettings, state: e.target.value})}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={hospitalSettings.zipCode}
                      onChange={(e) => setHospitalSettings({...hospitalSettings, zipCode: e.target.value})}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={handleSaveHospitalSettings} variant="hero" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Hospital Settings
                  </Button>
                  <Button variant="outline">
                    Reset to Default
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Preferences
                </CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings({...systemSettings, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select value={systemSettings.dateFormat} onValueChange={(value) => setSystemSettings({...systemSettings, dateFormat: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeFormat">Time Format</Label>
                      <Select value={systemSettings.timeFormat} onValueChange={(value) => setSystemSettings({...systemSettings, timeFormat: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24 Hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings({...systemSettings, language: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={systemSettings.currency} onValueChange={(value) => setSystemSettings({...systemSettings, currency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={systemSettings.sessionTimeout}
                        onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
                        placeholder="Enter session timeout"
                      />
                    </div>
                    <div>
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <Select value={systemSettings.backupFrequency} onValueChange={(value) => setSystemSettings({...systemSettings, backupFrequency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select backup frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send notifications via email</p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={systemSettings.emailNotifications}
                          onCheckedChange={(checked) => setSystemSettings({...systemSettings, emailNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsNotifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                        </div>
                        <Switch
                          id="smsNotifications"
                          checked={systemSettings.smsNotifications}
                          onCheckedChange={(checked) => setSystemSettings({...systemSettings, smsNotifications: checked})}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">Enable maintenance mode</p>
                        </div>
                        <Switch
                          id="maintenanceMode"
                          checked={systemSettings.maintenanceMode}
                          onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="debugMode">Debug Mode</Label>
                          <p className="text-sm text-muted-foreground">Enable debug logging</p>
                        </div>
                        <Switch
                          id="debugMode"
                          checked={systemSettings.debugMode}
                          onCheckedChange={(checked) => setSystemSettings({...systemSettings, debugMode: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={handleSaveSystemSettings} variant="hero" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save System Settings
                  </Button>
                  <Button variant="outline">
                    Reset to Default
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments">
            <Card className="shadow-md border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Hospital Departments
                    </CardTitle>
                    <CardDescription>Manage hospital departments and department heads</CardDescription>
                  </div>
                  <Button variant="hero" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Department
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                            <Building className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{dept.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Head: {dept.head} • ID: {dept.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(dept.status)}>
                            {dept.status.charAt(0).toUpperCase() + dept.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          View Staff
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Roles Tab */}
          <TabsContent value="roles">
            <Card className="shadow-md border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      User Roles & Permissions
                    </CardTitle>
                    <CardDescription>Manage user roles and access permissions</CardDescription>
                  </div>
                  <Button variant="hero" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Role
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRoles.map((role) => (
                    <div
                      key={role.id}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-secondary-light flex items-center justify-center">
                            <Shield className="h-6 w-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{role.name}</h3>
                            <p className="text-sm text-muted-foreground">{role.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{role.permissions} Permissions</Badge>
                          <Badge variant="outline">{role.users} Users</Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Permissions
                        </Button>
                        <Button size="sm" variant="outline">
                          View Users
                        </Button>
                        <Button size="sm" variant="outline">
                          Copy Role
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card className="shadow-md border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Integrations
                </CardTitle>
                <CardDescription>Manage third-party integrations and API connections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-lg border border-border hover:shadow-md transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                            integration.status === "connected" ? "bg-success-light" : "bg-destructive-light"
                          }`}>
                            <Database className={`h-6 w-6 ${
                              integration.status === "connected" ? "text-success" : "text-destructive"
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{integration.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Provider: {integration.provider} • Last Sync: {integration.lastSync}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        {integration.status === "connected" ? (
                          <Button size="sm" variant="outline">
                            Disconnect
                          </Button>
                        ) : (
                          <Button size="sm" variant="hero">
                            Connect
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Configure
                        </Button>
                        <Button size="sm" variant="outline">
                          Test Connection
                        </Button>
                        <Button size="sm" variant="outline">
                          View Logs
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  );
};

export default SettingsPage;
