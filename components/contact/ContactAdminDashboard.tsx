import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  message: string;
  timestamp: string;
  createdAt: Timestamp;
  status: 'new' | 'read' | 'replied';
  read: boolean;
  source?: string;
}

export const ContactAdminDashboard: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if db is initialized
      if (!db) {
        throw new Error('Firestore database not initialized. Please check Firebase configuration.');
      }
      
      const messagesRef = collection(db, 'contactMessages');
      
      // Try with orderBy first, fallback to simple query if it fails
      let querySnapshot;
      try {
        const q = query(messagesRef, orderBy('createdAt', 'desc'));
        querySnapshot = await getDocs(q);
      } catch (orderError) {
        // If orderBy fails (no index or no createdAt field), try without ordering
        console.warn('OrderBy failed, trying without ordering:', orderError);
        querySnapshot = await getDocs(messagesRef);
      }
      
      const messagesData: ContactMessage[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({
          id: doc.id,
          name: data.name || 'Unknown',
          email: data.email || 'No email',
          company: data.company,
          budget: data.budget,
          timeline: data.timeline,
          services: data.services,
          message: data.message || '',
          timestamp: data.timestamp || data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          createdAt: data.createdAt || Timestamp.now(),
          status: data.status || 'new',
          read: data.read || false,
          source: data.source
        } as ContactMessage);
      });
      
      // Sort manually if orderBy didn't work
      messagesData.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.timestamp).getTime();
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.timestamp).getTime();
        return dateB - dateA; // Descending order
      });
      
      setMessages(messagesData);
    } catch (error: any) {
      console.error('Error loading messages:', error);
      setError(error.message || 'Failed to load messages. Please check Firestore configuration and security rules.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const messageRef = doc(db, 'contactMessages', messageId);
      await updateDoc(messageRef, {
        read: true,
        status: 'read'
      });
      loadMessages();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAsReplied = async (messageId: string) => {
    try {
      const messageRef = doc(db, 'contactMessages', messageId);
      await updateDoc(messageRef, {
        status: 'replied'
      });
      loadMessages();
    } catch (error) {
      console.error('Error marking as replied:', error);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  const unreadCount = messages.filter(msg => !msg.read).length;
  const newCount = messages.filter(msg => msg.status === 'new').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-color)] mx-auto mb-4"></div>
          <p className="text-[var(--secondary-text)]">Loading messages...</p>
          <p className="text-xs text-[var(--secondary-text)] mt-2">If this takes too long, check browser console for errors</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] p-4">
        <div className="max-w-2xl w-full bg-[var(--card-bg)] rounded-lg p-6 border border-red-500">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Messages</h2>
          <p className="text-[var(--primary-text)] mb-4">{error}</p>
          <div className="bg-[var(--hover-bg)] rounded p-4 mb-4">
            <h3 className="font-semibold text-[var(--primary-text)] mb-2">Common Solutions:</h3>
            <ul className="list-disc list-inside text-sm text-[var(--secondary-text)] space-y-1">
              <li>Make sure Firestore is enabled in Firebase Console</li>
              <li>Check Firestore security rules allow reads: <code className="bg-black/10 px-1 rounded">allow read: if true;</code></li>
              <li>Verify Firebase configuration in <code className="bg-black/10 px-1 rounded">config/firebase.ts</code></li>
              <li>Check browser console (F12) for detailed error messages</li>
            </ul>
          </div>
          <button
            onClick={loadMessages}
            className="px-4 py-2 bg-[var(--accent-color)] text-white rounded hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--primary-text)] mb-2">
            Contact Messages Dashboard
          </h1>
          <p className="text-[var(--secondary-text)]">
            Manage and respond to contact form submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--card-border)]">
            <div className="text-2xl font-bold text-[var(--accent-color)]">{messages.length}</div>
            <div className="text-sm text-[var(--secondary-text)]">Total Messages</div>
          </div>
          <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--card-border)]">
            <div className="text-2xl font-bold text-orange-500">{newCount}</div>
            <div className="text-sm text-[var(--secondary-text)]">New Messages</div>
          </div>
          <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--card-border)]">
            <div className="text-2xl font-bold text-blue-500">{unreadCount}</div>
            <div className="text-sm text-[var(--secondary-text)]">Unread</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'new', 'read', 'replied'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-[var(--accent-color)] text-white'
                  : 'bg-[var(--card-bg)] text-[var(--primary-text)] border border-[var(--card-border)] hover:bg-[var(--hover-bg)]'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)]">
              <p className="text-[var(--secondary-text)]">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-[var(--card-bg)] rounded-lg p-4 sm:p-6 border border-[var(--card-border)] cursor-pointer transition-all hover:shadow-lg ${
                  !message.read ? 'border-l-4 border-l-[var(--accent-color)]' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.read) {
                    markAsRead(message.id);
                  }
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-[var(--primary-text)] text-lg">
                          {message.name}
                        </h3>
                        <p className="text-[var(--accent-color)] text-sm">{message.email}</p>
                        {message.company && (
                          <p className="text-[var(--secondary-text)] text-sm">{message.company}</p>
                        )}
                      </div>
                      {!message.read && (
                        <span className="px-2 py-1 bg-[var(--accent-color)] text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        message.status === 'new' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                        message.status === 'read' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {message.status}
                      </span>
                    </div>
                    
                    <p className="text-[var(--secondary-text)] text-sm mb-3 line-clamp-2">
                      {message.message}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs">
                      {message.budget && (
                        <span className="px-2 py-1 bg-[var(--hover-bg)] rounded">
                          Budget: {message.budget}
                        </span>
                      )}
                      {message.timeline && (
                        <span className="px-2 py-1 bg-[var(--hover-bg)] rounded">
                          Timeline: {message.timeline}
                        </span>
                      )}
                      {message.services && message.services.length > 0 && (
                        <span className="px-2 py-1 bg-[var(--hover-bg)] rounded">
                          Services: {message.services.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-[var(--secondary-text)]">
                      {message.createdAt?.toDate ? 
                        message.createdAt.toDate().toLocaleString() : 
                        new Date(message.timestamp).toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${message.email}?subject=Re: Your Contact Form Submission`}
                        className="px-3 py-1 bg-[var(--accent-color)] text-white text-sm rounded hover:opacity-90"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Reply
                      </a>
                      {message.status !== 'replied' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsReplied(message.id);
                          }}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:opacity-90"
                        >
                          Mark Replied
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMessage(null)}
          >
            <div
              className="bg-[var(--card-bg)] rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[var(--card-border)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-text)] mb-2">
                    {selectedMessage.name}
                  </h2>
                  <p className="text-[var(--accent-color)]">{selectedMessage.email}</p>
                  {selectedMessage.company && (
                    <p className="text-[var(--secondary-text)]">{selectedMessage.company}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-[var(--secondary-text)] hover:text-[var(--primary-text)]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {selectedMessage.budget && (
                  <div>
                    <span className="font-semibold text-[var(--primary-text)]">Budget: </span>
                    <span className="text-[var(--secondary-text)]">{selectedMessage.budget}</span>
                  </div>
                )}
                {selectedMessage.timeline && (
                  <div>
                    <span className="font-semibold text-[var(--primary-text)]">Timeline: </span>
                    <span className="text-[var(--secondary-text)]">{selectedMessage.timeline}</span>
                  </div>
                )}
                {selectedMessage.services && selectedMessage.services.length > 0 && (
                  <div>
                    <span className="font-semibold text-[var(--primary-text)]">Services: </span>
                    <span className="text-[var(--secondary-text)]">
                      {selectedMessage.services.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-[var(--primary-text)] mb-2">Message:</h3>
                <p className="text-[var(--secondary-text)] whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Your Contact Form Submission`}
                  className="px-4 py-2 bg-[var(--accent-color)] text-white rounded hover:opacity-90"
                >
                  Reply via Email
                </a>
                {selectedMessage.status !== 'replied' && (
                  <button
                    onClick={() => {
                      markAsReplied(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:opacity-90"
                  >
                    Mark as Replied
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

