import React, { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { Loader2, User } from 'lucide-react';

const ProfileSetupModal: React.FC = () => {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [name, setName] = useState('');

  const { data: userProfile, isLoading, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  const showModal = isAuthenticated && !isLoading && isFetched && userProfile === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
    } catch (err) {
      console.error('Failed to save profile', err);
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8"
        style={{
          background: 'white',
          boxShadow: '0 32px 64px rgba(0,0,0,0.3)',
          border: '1px solid rgba(201,168,76,0.3)',
        }}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: 'rgba(107,26,26,0.1)' }}
        >
          <User size={28} style={{ color: 'var(--maroon)' }} />
        </div>

        <h2
          className="text-xl font-black text-center mb-2"
          style={{ color: 'var(--maroon)', fontFamily: 'Merriweather, serif' }}
        >
          Welcome!
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter your name to complete your profile setup.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--maroon)' }}>
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors"
              style={{ borderColor: 'rgba(201,168,76,0.4)', color: 'var(--maroon)' }}
              onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--gold)'; }}
              onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={saveProfile.isPending || !name.trim()}
            className="w-full btn-maroon py-3 rounded-xl text-sm font-bold disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
