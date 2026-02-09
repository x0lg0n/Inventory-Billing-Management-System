'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import type { EmailPreferencesData } from '@/types';

interface EmailPreferences extends EmailPreferencesData {
  [key: string]: boolean | undefined;
}

export default function EmailNotificationsPage() {
  const [preferences, setPreferences] = useState<EmailPreferences>({
    transactionCreated: true,
    transactionUpdated: true,
    lowStockAlert: true,
    dailyReport: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await apiClient.getEmailPreferences();
      if (response.success && response.data) {
        // Sanitize response to only include allowed fields
        const sanitizedPreferences: EmailPreferences = {
          transactionCreated: Boolean(response.data.transactionCreated),
          transactionUpdated: Boolean(response.data.transactionUpdated),
          lowStockAlert: Boolean(response.data.lowStockAlert),
          dailyReport: Boolean(response.data.dailyReport)
        };
        setPreferences(sanitizedPreferences);
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to load preferences' });
      }
    } catch (error) {
      console.error('Failed to fetch preferences:', error);
      setMessage({ type: 'error', text: 'Failed to load preferences' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key: keyof EmailPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      // Sanitize before sending to API
      const dataToSend: EmailPreferencesData = {
        transactionCreated: preferences.transactionCreated,
        transactionUpdated: preferences.transactionUpdated,
        lowStockAlert: preferences.lowStockAlert,
        dailyReport: preferences.dailyReport
      };
      
      const response = await apiClient.updateEmailPreferences(dataToSend);
      if (response.success) {
        setMessage({ type: 'success', text: 'Email preferences updated successfully!' });
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to save preferences' });
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
      setMessage({ type: 'error', text: 'Failed to save preferences' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading preferences...</p>
        </div>
      </div>
    );
  }

  const notificationOptions = [
    {
      key: 'transactionCreated' as const,
      label: 'Email when transaction is created',
      description: 'Get notified when a new sale or purchase is recorded',
    },
    {
      key: 'transactionUpdated' as const,
      label: 'Email when transaction status changes',
      description: 'Receive updates when transaction status changes (pending, completed, cancelled)',
    },
    {
      key: 'lowStockAlert' as const,
      label: 'Email when product stock is low',
      description: 'Get alerts when inventory falls below minimum levels',
    },
    {
      key: 'dailyReport' as const,
      label: 'Send daily business report',
      description: 'Receive a summary of daily transactions and inventory',
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Email Notifications</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Manage how and when you receive email notifications
        </p>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Preferences Card */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose which notifications you&apos;d like to receive via email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notification Options */}
          {notificationOptions.map(option => (
            <div key={option.key} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition">
              <input
                type="checkbox"
                id={option.key}
                checked={preferences[option.key] || false}
                onChange={() => handleToggle(option.key)}
                className="mt-1 h-5 w-5 text-blue-600 rounded cursor-pointer"
              />
              <div className="flex-1">
                <label
                  htmlFor={option.key}
                  className="block font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  {option.label}
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {option.description}
                </p>
              </div>
            </div>
          ))}

          {/* Save Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </Button>
            <Button
              variant="outline"
              onClick={fetchPreferences}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-base text-blue-900 dark:text-blue-100">
            💡 Tip
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 dark:text-blue-200">
          <p>
            Even if you disable email notifications, you can still view all transactions
            and updates in your dashboard. Email notifications are sent to the email address
            associated with your account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
