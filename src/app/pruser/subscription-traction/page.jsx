"use client";

import { useState, useEffect } from "react";
import { useModelContext } from "../../context/Context";

export default function SubscriptionTrackingPage() {
  const { email } = useModelContext();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodedEmail = email ? decodeURIComponent(email) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!decodedEmail) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/users?email=${decodedEmail}`);
        const data = await res.json();

        if (res.ok) {
          setUserData(data);
          console.log("Full userData:", data);
          console.log("Subscriptions:", data.subscriptions);
        } else {
          setError(data.error || "Failed to fetch data");
        }
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedEmail]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const isSubscriptionActive = (subscription) => {
    console.log("Checking subscription:", subscription);
    const isSubscribed =
      subscription.subscribe === true || String(subscription.subscribe) === "true";
    const hasValidExpiry = subscription.subscriptionExpiry && subscription.subscriptionExpiry !== "N/A";
    const isNotExpired = hasValidExpiry
      ? new Date(subscription.subscriptionExpiry) > new Date()
      : false;
    console.log("isSubscribed:", isSubscribed, "hasValidExpiry:", hasValidExpiry, "isNotExpired:", isNotExpired);
    return isSubscribed && isNotExpired;
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Error</h2>
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading subscription details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Debug the subscriptions data structure
  console.log("userData:", userData);
  console.log("userData.subscriptions:", userData?.subscriptions);

  // Handle the nested array structure correctly
  let subscriptions = [];

  if (userData?.subscriptions) {
    console.log("Raw subscriptions data:", userData.subscriptions);

    if (Array.isArray(userData.subscriptions)) {
      subscriptions = userData.subscriptions.flatMap((item) => {
        if (Array.isArray(item)) {
          return item;
        } else if (typeof item === "object" && item !== null) {
          return Object.entries(item)
            .filter(([key, value]) => key !== "_id" && typeof value === "object" && value !== null)
            .map(([key, value]) => value);
        }
        return [];
      });
    } else if (typeof userData.subscriptions === "object") {
      subscriptions = Object.entries(userData.subscriptions)
        .filter(([key, value]) => key !== "_id" && typeof value === "object" && value !== null)
        .map(([key, value]) => value);
    }
  }

  console.log("Final processed subscriptions array:", subscriptions);

  const activeSubscriptions = subscriptions.filter(isSubscriptionActive);
  const totalSubscriptions = subscriptions.length;

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Subscription Management</h1>
        <p className="text-gray-400">Track your subscription history and current status for {decodedEmail}</p>
      </div>

      {/* Debug Info - Remove this in production */}
     

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="text-2xl font-bold text-blue-400">{totalSubscriptions}</div>
          <p className="text-sm text-gray-400">Total Subscriptions</p>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="text-2xl font-bold text-green-400">{activeSubscriptions.length}</div>
          <p className="text-sm text-gray-400">Active Subscriptions</p>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="text-2xl font-bold text-orange-400">{totalSubscriptions - activeSubscriptions.length}</div>
          <p className="text-sm text-gray-400">Expired/Inactive</p>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Subscription History</h2>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-750">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Subscription ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {subscriptions.length > 0 ? (
                  subscriptions.map((subscription, index) => {
                    console.log(`Processing subscription ${index}:`, subscription);
                    const isActive = isSubscriptionActive(subscription);

                    return (
                      <tr
                        key={subscription._id || subscription.id || index}
                        className="hover:bg-gray-750 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{subscription.orderId || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {isActive ? "Active" : "Expired"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {formatDate(subscription.subscriptionExpiry)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {subscription._id || subscription.id || "N/A"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center">
                      <div className="text-gray-400">
                        <p className="text-lg mb-2">No subscriptions found</p>
                        <p className="text-sm">No subscription history is available for this account.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      {userData?.updatedAt && (
        <div className="text-center">
          <p className="text-sm text-gray-400">Last updated: {formatDateTime(userData.updatedAt)}</p>
        </div>
      )}
    </div>
  );
}
