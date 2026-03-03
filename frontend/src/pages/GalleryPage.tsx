import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Upload, X, Download, ZoomIn, Trash2, ImagePlus, Loader2 } from 'lucide-react';
import { useGetAllPhotos, useUploadPhoto, useDeletePhoto, useGetCallerUserRole } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { ExternalBlob } from '../backend';
import LeafMotif from '../components/LeafMotif';
import type { NewPhoto } from '../backend';

// Lightbox component
const Lightbox: React.FC<{
  photo: NewPhoto;
  onClose: () => void;
}> = ({ photo, onClose }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const bytes = await photo.blob.getBytes();
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hope-gallery-${photo.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full transition-all duration-200"
          style={{ color: 'rgba(255,255,255,0.7)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
        >
          <X size={28} />
        </button>

        {/* Image */}
        <img
          src={photo.blob.getDirectURL()}
          alt={photo.caption || 'Gallery photo'}
          className="max-h-[75vh] w-auto rounded-2xl object-contain"
          style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}
        />

        {/* Caption + Download */}
        <div className="mt-4 flex items-center gap-4 w-full justify-between px-2">
          <p className="text-sm text-white/70 flex-1">
            {photo.caption || ''}
          </p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 disabled:opacity-60"
            style={{ backgroundColor: 'var(--gold)', color: 'var(--maroon-dark)' }}
            onMouseEnter={e => { if (!downloading) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold-light)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'; }}
          >
            {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {downloading ? 'Downloading...' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Photo card component
const PhotoCard: React.FC<{
  photo: NewPhoto;
  isAdmin: boolean;
  onView: (photo: NewPhoto) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}> = ({ photo, isAdmin, onView, onDelete, isDeleting }) => {
  return (
    <div
      className="relative group rounded-2xl overflow-hidden cursor-pointer gallery-card"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(201,168,76,0.15)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      }}
      onClick={() => onView(photo)}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={photo.blob.getDirectURL()}
          alt={photo.caption || 'Gallery photo'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ background: 'rgba(58,10,10,0.75)' }}
      >
        <ZoomIn size={32} style={{ color: 'var(--gold)' }} className="mb-2" />
        {photo.caption && (
          <p className="text-xs text-white/90 text-center px-3 leading-tight">{photo.caption}</p>
        )}
      </div>

      {/* Admin delete button */}
      {isAdmin && (
        <button
          onClick={e => {
            e.stopPropagation();
            onDelete(photo.id);
          }}
          disabled={isDeleting}
          className="absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50 z-10"
          style={{ backgroundColor: 'rgba(180,30,30,0.9)', color: 'white' }}
          title="Delete photo"
        >
          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
      )}
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: photos = [], isLoading: photosLoading } = useGetAllPhotos();
  const { data: userRole } = useGetCallerUserRole();
  const uploadPhoto = useUploadPhoto();
  const deletePhoto = useDeletePhoto();

  const isAdmin = isAuthenticated && userRole === 'admin';

  const [lightboxPhoto, setLightboxPhoto] = useState<NewPhoto | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [caption, setCaption] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      setUploadProgress(0);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      await uploadPhoto.mutateAsync({ blob, caption: caption.trim() || null });
      setCaption('');
      setUploadProgress(null);
    } catch (err) {
      console.error('Upload failed', err);
      setUploadProgress(null);
    }
  }, [caption, uploadPhoto]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deletePhoto.mutateAsync(id);
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: 'var(--cream)', paddingTop: '80px' }}
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/leaf-motif-bg.dim_1920x400.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
            style={{ color: 'var(--maroon)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold-dark)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--maroon)'; }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ backgroundColor: 'rgba(107,26,26,0.1)', color: 'var(--maroon)', border: '1px solid rgba(107,26,26,0.2)' }}
          >
            CGCT • HOPE
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{ color: 'var(--maroon)', fontFamily: 'Merriweather, serif' }}
          >
            HOPE Moments –{' '}
            <span style={{ color: 'var(--gold-dark)' }}>Gallery</span>
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Capturing the journey of empowerment, one moment at a time.
          </p>
          <div className="section-divider mt-6 max-w-xs mx-auto rounded-full" />
        </div>

        {/* Admin Upload Panel */}
        {isAdmin && (
          <div
            className="mb-12 rounded-3xl p-6 sm:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(107,26,26,0.06) 0%, rgba(201,168,76,0.08) 100%)',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <ImagePlus size={20} style={{ color: 'var(--maroon)' }} />
              <h2 className="text-lg font-black" style={{ color: 'var(--maroon)', fontFamily: 'Merriweather, serif' }}>
                Upload Photos
              </h2>
              <span
                className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'rgba(107,26,26,0.1)', color: 'var(--maroon)' }}
              >
                Admin Only
              </span>
            </div>

            {/* Caption input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--maroon)' }}>
                Caption (optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Add a caption for this photo..."
                className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors"
                style={{
                  borderColor: 'rgba(201,168,76,0.4)',
                  backgroundColor: 'white',
                  color: 'var(--maroon)',
                }}
                onFocus={e => { (e.target as HTMLElement).style.borderColor = 'var(--gold)'; }}
                onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
              />
            </div>

            {/* Drag & Drop Zone */}
            <div
              className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer ${isDragging ? 'scale-[1.01]' : ''}`}
              style={{
                borderColor: isDragging ? 'var(--gold)' : 'rgba(201,168,76,0.4)',
                backgroundColor: isDragging ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.6)',
              }}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadPhoto.isPending ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={32} className="animate-spin" style={{ color: 'var(--gold)' }} />
                  <p className="text-sm font-semibold" style={{ color: 'var(--maroon)' }}>
                    Uploading...{uploadProgress !== null ? ` ${uploadProgress}%` : ''}
                  </p>
                  {uploadProgress !== null && (
                    <div className="w-full max-w-xs h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(201,168,76,0.2)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%`, backgroundColor: 'var(--gold)' }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Upload size={32} className="mx-auto mb-3" style={{ color: 'var(--gold)' }} />
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--maroon)' }}>
                    Drag & drop an image here, or click to browse
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(107,26,26,0.5)' }}>
                    Supports JPG, PNG, WebP, GIF
                  </p>
                </>
              )}
            </div>

            {uploadPhoto.isError && (
              <p className="mt-3 text-sm text-red-600 text-center">
                Upload failed. Please try again.
              </p>
            )}
          </div>
        )}

        {/* Gallery Grid */}
        {photosLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={40} className="animate-spin" style={{ color: 'var(--gold)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--maroon)' }}>Loading gallery...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(107,26,26,0.08)' }}
            >
              <ImagePlus size={36} style={{ color: 'var(--maroon)', opacity: 0.4 }} />
            </div>
            <p className="text-lg font-semibold" style={{ color: 'var(--maroon)' }}>No photos yet</p>
            <p className="text-sm text-gray-500">
              {isAdmin ? 'Upload the first photo to get started.' : 'Check back soon for HOPE moments!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map(photo => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isAdmin={isAdmin}
                onView={setLightboxPhoto}
                onDelete={handleDelete}
                isDeleting={deletingId === photo.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </div>
  );
};

export default GalleryPage;
