"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    messages: 0,
    pendingMessages: 0
  });

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
    
    if (session.user?.role !== "admin") {
      router.push("/");
      return;
    }

    fetchStats();
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      // Fetch basic stats
      const [productsRes, ordersRes, allMessagesRes, pendingMessagesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
        fetch('/api/contact'),
        fetch('/api/contact?status=pending')
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setStats(prev => ({ ...prev, products: productsData.length || 0 }));
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setStats(prev => ({ ...prev, orders: ordersData.length || 0 }));
      }

      if (allMessagesRes.ok) {
        const allMessagesData = await allMessagesRes.json();
        setStats(prev => ({ ...prev, messages: allMessagesData.contacts?.length || 0 }));
      }

      if (pendingMessagesRes.ok) {
        const pendingMessagesData = await pendingMessagesRes.json();
        setStats(prev => ({ ...prev, pendingMessages: pendingMessagesData.contacts?.length || 0 }));
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const adminSections = [
    {
      title: "Products",
      description: "Manage your product catalog",
      icon: "📦",
      href: "/admin/products",
      count: stats.products,
      color: "bg-blue-500"
    },
    {
      title: "Orders",
      description: "View and manage customer orders",
      icon: "🛒",
      href: "/admin/orders",
      count: stats.orders,
      color: "bg-green-500"
    },
    {
      title: "Contact Messages",
      description: "Handle customer inquiries",
      icon: "💬",
      href: "/admin/contact-messages",
      count: stats.messages,
      badge: stats.pendingMessages > 0 ? `${stats.pendingMessages} pending` : null,
      color: "bg-purple-500"
    },
    {
      title: "Profile",
      description: "Manage your admin account",
      icon: "👤",
      href: "/admin/profile",
      count: null,
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {session?.user?.name}. Manage your furniture store.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-3xl font-light text-gray-900">{stats.products}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Orders</p>
                <p className="text-3xl font-light text-gray-900">{stats.orders}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6l-1-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-3xl font-light text-gray-900">{stats.messages}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-light text-gray-900">{stats.pendingMessages}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
          {adminSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                  <span className="text-lg">{section.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                    {section.count !== null && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                        {section.count}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{section.description}</p>
                  {section.badge && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-800 mt-2">
                      {section.badge}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/contact-messages"
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200 relative"
            >
              Messages
              {stats.pendingMessages > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {stats.pendingMessages}
                </span>
              )}
            </Link>
            <Link
              href="/admin/products"
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium px-5 py-2.5 rounded-md border border-gray-300 transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium px-5 py-2.5 rounded-md border border-gray-300 transition-colors duration-200"
            >
              Orders
            </Link>
            <Link
              href="/products"
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium px-5 py-2.5 rounded-md border border-gray-300 transition-colors duration-200"
            >
              View Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
