
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "system" | "user" | "alert";
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "System Update",
      message: "A new system update is available. Please update to the latest version.",
      time: "30 minutes ago",
      read: false,
      type: "system",
    },
    {
      id: 2,
      title: "New User Registration",
      message: "A new user has registered to the system.",
      time: "1 hour ago",
      read: false,
      type: "user",
    },
    {
      id: 3,
      title: "Security Alert",
      message: "Multiple failed login attempts detected from IP 192.168.1.1.",
      time: "2 hours ago",
      read: false,
      type: "alert",
    },
    {
      id: 4,
      title: "Resource Update",
      message: "Resources have been updated successfully.",
      time: "5 hours ago",
      read: true,
      type: "system",
    },
    {
      id: 5,
      title: "User Profile Updated",
      message: "User John Doe updated their profile information.",
      time: "1 day ago",
      read: true,
      type: "user",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast.success("Notification marked as read");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const filterNotifications = (type: string | null) => {
    if (!type) return notifications;
    return notifications.filter(notification => notification.type === type);
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            View and manage your notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="outline" onClick={clearAllNotifications}>
            Clear all
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <Badge>{unreadCount} unread</Badge>
            )}
          </CardTitle>
          <CardDescription>Your recent system notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="user">Users</TabsTrigger>
              <TabsTrigger value="alert">Alerts</TabsTrigger>
            </TabsList>

            {["all", "system", "user", "alert"].map(tabValue => (
              <TabsContent key={tabValue} value={tabValue}>
                {filterNotifications(tabValue === "all" ? null : tabValue).length > 0 ? (
                  <div className="space-y-4">
                    {filterNotifications(tabValue === "all" ? null : tabValue).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg transition-colors ${
                          !notification.read ? "bg-muted/40" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                          
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No notifications to display
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
