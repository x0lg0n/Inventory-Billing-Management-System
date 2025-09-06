'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiClient } from '@/lib/api';
import { Contact } from '@/types';
import { Plus, Search, Edit, Trash2, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadContacts();
  }, [search, activeTab]);

  const loadContacts = async () => {
    try {
      let response;
      if (activeTab === 'customers') {
        response = await apiClient.getCustomers({ search });
      } else if (activeTab === 'vendors') {
        response = await apiClient.getVendors({ search });
      } else {
        response = await apiClient.getContacts({ search });
      }
      
      if (response.success) {
        setContacts(response.data.contacts || response.data.customers || response.data.vendors);
      }
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await apiClient.deleteContact(id);
        loadContacts();
      } catch (error) {
        console.error('Failed to delete contact:', error);
      }
    }
  };

  const ContactTable = ({ contacts }: { contacts: Contact[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Contact Info</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact._id}>
            <TableCell>
              <div>
                <div className="font-medium">{contact.name}</div>
                {contact.address?.city && (
                  <div className="text-sm text-muted-foreground">
                    {contact.address.city}, {contact.address.state}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={contact.type === 'customer' ? 'default' : 'secondary'}>
                {contact.type}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center space-x-1 text-sm">
                  <Phone className="h-3 w-3" />
                  <span>{contact.phone}</span>
                </div>
                {contact.email && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{contact.email}</span>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className={`font-medium ${
                contact.currentBalance > 0 ? 'text-green-500' : 
                contact.currentBalance < 0 ? 'text-red-500' : ''
              }`}>
                ${contact.currentBalance.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                Limit: ${contact.creditLimit.toFixed(2)}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Link href={`/contacts/${contact._id}/edit`}>
                  <Button variant="outline" size="sm" aria-label={`Edit ${contact.name}`}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(contact._id)}
                  aria-label={`Delete ${contact.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {contacts.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              No contacts found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Contacts</h1>
              <p className="text-muted-foreground">Manage your customers and vendors</p>
            </div>
            <Link href="/contacts/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Management</CardTitle>
              <CardDescription>All your customers and vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Contacts</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="vendors">Vendors</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <ContactTable contacts={contacts} />
                  )}
                </TabsContent>

                <TabsContent value="customers" className="mt-4">
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <ContactTable contacts={contacts} />
                  )}
                </TabsContent>

                <TabsContent value="vendors" className="mt-4">
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <ContactTable contacts={contacts} />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}