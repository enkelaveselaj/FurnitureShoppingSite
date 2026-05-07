"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/Button";

interface Order {
  _id: string;
  sessionId: string;
  amount: number;
  status: string;
  customerEmail: string;
  userId: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "admin") {
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, status]);

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted order from the state
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-8">You need admin privileges to view this page.</p>
            <Link href="/">
              <Button size="lg">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
            <Link href="/admin/products">
              <Button variant="outline">Back to Admin</Button>
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">No Orders Found</h2>
              <p className="text-gray-600">There are no orders in the system yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            #{order.sessionId.slice(-8)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.customerEmail}</div>
                          <div className="text-xs text-gray-500">User ID: {order.userId.slice(-8)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
