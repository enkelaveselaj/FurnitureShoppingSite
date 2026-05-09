'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'responded';
  createdAt: string;
  updatedAt: string;
}

export default function ContactMessages() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }
    
    if (session.user?.role !== 'admin') {
      router.push('/');
      return;
    }
    
    fetchMessages();
  }, [session, status, router]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const url = selectedStatus === 'all' 
        ? '/api/contact' 
        : `/api/contact?status=${selectedStatus}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setMessages(data.contacts || []);
      } else {
        setError('Failed to fetch messages');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchMessages();
    }
  }, [selectedStatus, session]);

  const updateMessageStatus = async (messageId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, status: newStatus as any } : msg
        ));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(messages.filter(msg => msg._id !== messageId));
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '🕐';
      case 'read':
        return '👁️';
      case 'responded':
        return '✅';
      default:
        return '📝';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600">
            Manage customer inquiries and support requests
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <div className="flex gap-2">
              {['all', 'pending', 'read', 'responded'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    selectedStatus === status
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-2">
                      {getStatusIcon(status)}
                      {messages.filter(m => m.status === status).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Messages List */}
        {messages.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">
              No messages found
            </h3>
            <p className="text-gray-600">
              {selectedStatus === 'all' 
                ? 'No contact messages have been received yet.' 
                : `No messages with status "${selectedStatus}".`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{message.name}</h3>
                        <span className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(message.status)}`}>
                          {getStatusIcon(message.status)} {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <a href={`mailto:${message.email}`} className="hover:text-gray-900">
                          {message.email}
                        </a>
                        <span>
                          {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      {message.subject && (
                        <h4 className="font-medium text-gray-800 mt-2">{message.subject}</h4>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setExpandedMessage(expandedMessage === message._id ? null : message._id)}
                        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                      >
                        {expandedMessage === message._id ? 'Hide' : 'View'}
                      </button>
                      <button
                        onClick={() => deleteMessage(message._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {expandedMessage === message._id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Message:</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        {message.status !== 'read' && (
                          <button
                            onClick={() => updateMessageStatus(message._id, 'read')}
                            className="px-3 py-1.5 bg-white text-gray-700 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50"
                          >
                            Mark as Read
                          </button>
                        )}
                        {message.status !== 'responded' && (
                          <button
                            onClick={() => updateMessageStatus(message._id, 'responded')}
                            className="px-3 py-1.5 bg-white text-gray-700 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50"
                          >
                            Mark as Responded
                          </button>
                        )}
                        {message.status !== 'pending' && (
                          <button
                            onClick={() => updateMessageStatus(message._id, 'pending')}
                            className="px-3 py-1.5 bg-white text-gray-700 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50"
                          >
                            Mark as Pending
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
