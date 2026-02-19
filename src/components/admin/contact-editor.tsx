'use client';

import { useState, useEffect } from 'react';
import { Trash2, Mail, MailOpen, Clock, User, AtSign } from 'lucide-react';
import {
  AdminCard,
  AdminCardHeader,
  DangerButton,
  Badge,
  Toast,
  EmptyState,
  LoadingSpinner,
  SecondaryButton,
} from './ui';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactEditor() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/contact')
      .then((r) => r.json())
      .then(setContacts)
      .catch(() =>
        setToast({ message: 'Failed to load messages', type: 'error' }),
      )
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (id: string, read: boolean) => {
    try {
      const res = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read }),
      });
      if (!res.ok) throw new Error();
      setContacts((p) => p.map((c) => (c.id === id ? { ...c, read } : c)));
      if (selected?.id === id) setSelected((p) => (p ? { ...p, read } : null));
    } catch {
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/contact?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setContacts((p) => p.filter((c) => c.id !== id));
      if (selected?.id === id) setSelected(null);
      setToast({ message: 'Message deleted', type: 'success' });
    } catch {
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const openMessage = async (c: Contact) => {
    setSelected(c);
    if (!c.read) await markRead(c.id, true);
  };

  const unread = contacts.filter((c) => !c.read).length;

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className='space-y-6'>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
        {/* Message List */}
        <div className='lg:col-span-2'>
          <AdminCard className='p-0 overflow-hidden'>
            <div className='px-5 py-4 border-b border-[#1a1a2e] flex items-center justify-between'>
              <div>
                <h3 className='text-sm font-semibold text-white'>Inbox</h3>
                <p className='text-xs text-[#6b7280] mt-0.5'>
                  {contacts.length} messages
                </p>
              </div>
              {unread > 0 && <Badge variant='info'>{unread} unread</Badge>}
            </div>
            {contacts.length === 0 ? (
              <EmptyState
                title='No messages yet'
                description='Contact form submissions will appear here'
              />
            ) : (
              <div className='divide-y divide-[#1a1a2e]'>
                {contacts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => openMessage(c)}
                    className={`w-full text-left px-5 py-4 hover:bg-[#14141f] transition-colors ${
                      selected?.id === c.id
                        ? 'bg-[#14141f] border-l-2 border-violet-500'
                        : ''
                    }`}
                  >
                    <div className='flex items-start gap-3'>
                      <div
                        className={`mt-0.5 shrink-0 ${!c.read ? 'text-violet-400' : 'text-[#374151]'}`}
                      >
                        {c.read ? (
                          <MailOpen className='w-4 h-4' />
                        ) : (
                          <Mail className='w-4 h-4' />
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center justify-between gap-2'>
                          <p
                            className={`text-sm truncate ${!c.read ? 'font-semibold text-white' : 'font-medium text-[#d1d5db]'}`}
                          >
                            {c.name}
                          </p>
                          <span className='text-xs text-[#4b5563] shrink-0'>
                            {formatDate(c.createdAt)}
                          </span>
                        </div>
                        <p
                          className={`text-xs truncate mt-0.5 ${!c.read ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}
                        >
                          {c.subject || 'No subject'}
                        </p>
                        <p className='text-xs text-[#4b5563] truncate mt-0.5'>
                          {c.message}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </AdminCard>
        </div>

        {/* Message Detail */}
        <div className='lg:col-span-3'>
          {selected ? (
            <AdminCard>
              {/* Header */}
              <div className='flex items-start justify-between gap-4 mb-6 pb-5 border-b border-[#1a1a2e]'>
                <div>
                  <h3 className='text-base font-semibold text-white'>
                    {selected.subject || 'No subject'}
                  </h3>
                  <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-2'>
                    <span className='flex items-center gap-1.5 text-sm text-[#9ca3af]'>
                      <User className='w-3.5 h-3.5 text-[#4b5563]' />
                      {selected.name}
                    </span>
                    <span className='flex items-center gap-1.5 text-sm text-[#9ca3af]'>
                      <AtSign className='w-3.5 h-3.5 text-[#4b5563]' />
                      {selected.email}
                    </span>
                    <span className='flex items-center gap-1.5 text-xs text-[#6b7280]'>
                      <Clock className='w-3.5 h-3.5' />
                      {formatDate(selected.createdAt)}
                    </span>
                  </div>
                </div>
                <div className='flex gap-2 shrink-0'>
                  <SecondaryButton
                    onClick={() => markRead(selected.id, !selected.read)}
                    className='text-xs px-3 py-2'
                  >
                    {selected.read ? (
                      <>
                        <Mail className='w-3.5 h-3.5' />
                        Mark Unread
                      </>
                    ) : (
                      <>
                        <MailOpen className='w-3.5 h-3.5' />
                        Mark Read
                      </>
                    )}
                  </SecondaryButton>
                  <DangerButton onClick={() => handleDelete(selected.id)}>
                    <Trash2 className='w-3.5 h-3.5' />
                  </DangerButton>
                </div>
              </div>

              {/* Body */}
              <div className='bg-[#0d0d14] border border-[#1f1f2e] rounded-xl p-5'>
                <p className='text-sm text-[#d1d5db] leading-relaxed whitespace-pre-wrap'>
                  {selected.message}
                </p>
              </div>

              {/* Reply link */}
              <div className='mt-4'>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`}
                  className='inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors'
                >
                  <Mail className='w-4 h-4' />
                  Reply via email
                </a>
              </div>
            </AdminCard>
          ) : (
            <AdminCard
              className='flex items-center justify-center'
              style={{ minHeight: '300px' }}
            >
              <div className='text-center'>
                <div className='w-14 h-14 rounded-2xl bg-[#1a1a2e] border border-[#2a2a3e] flex items-center justify-center mx-auto mb-3'>
                  <Mail className='w-6 h-6 text-[#4b5563]' />
                </div>
                <p className='text-[#6b7280] text-sm'>
                  Select a message to read
                </p>
              </div>
            </AdminCard>
          )}
        </div>
      </div>
    </div>
  );
}
