'use client';

import { useState, useRef } from 'react';
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
} from 'lucide-react';

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null, fileId?: string | null) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Project Thumbnail',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      onChange(data.url, data.fileId);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = () => {
    onChange(null, null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-[#d1d5db]'>{label}</label>

      {value ? (
        // ── Preview ──────────────────────────────────────────────
        <div className='relative group rounded-xl overflow-hidden border border-[#1a1a2e] bg-[#0d0d16]'>
          <img src={value} alt='Preview' className='w-full h-48 object-cover' />

          <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3'>
            <button
              type='button'
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className='px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50'
            >
              {uploading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <Upload className='w-4 h-4' />
              )}
              Replace
            </button>
            <button
              type='button'
              onClick={handleRemove}
              className='px-3 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium transition-colors flex items-center gap-2'
            >
              <X className='w-4 h-4' />
              Remove
            </button>
          </div>

          {success && (
            <div className='absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-500/90 text-white text-xs font-medium'>
              <CheckCircle className='w-3 h-3' />
              Uploaded
            </div>
          )}
        </div>
      ) : (
        // ── Drop Zone ─────────────────────────────────────────────
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative h-48 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3
            ${
              dragOver
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-[#1a1a2e] hover:border-violet-500/50 hover:bg-[#0d0d16] bg-[#0a0a0f]'
            } ${uploading ? 'pointer-events-none' : ''}`}
        >
          {uploading ? (
            <>
              <Loader2 className='w-8 h-8 text-violet-400 animate-spin' />
              <p className='text-sm text-[#6b7280]'>Uploading to ImageKit...</p>
            </>
          ) : dragOver ? (
            <>
              <div className='w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center'>
                <Upload className='w-6 h-6 text-violet-400' />
              </div>
              <p className='text-sm font-medium text-violet-400'>
                Drop to upload
              </p>
            </>
          ) : (
            <>
              <div className='w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center'>
                <ImageIcon className='w-6 h-6 text-violet-400' />
              </div>
              <div className='text-center'>
                <p className='text-sm font-medium text-[#d1d5db]'>
                  Drop image here or{' '}
                  <span className='text-violet-400'>browse</span>
                </p>
                <p className='text-xs text-[#6b7280] mt-1'>
                  PNG, JPG, WebP up to 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className='text-xs text-red-400 flex items-center gap-1.5'>
          <X className='w-3 h-3 shrink-0' />
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/jpeg,image/png,image/webp,image/gif'
        onChange={handleFileChange}
        className='hidden'
      />

      {/* Manual URL paste */}
      <div className='flex items-center gap-2 pt-1'>
        <div className='flex-1 h-px bg-[#1a1a2e]' />
        <span className='text-xs text-[#6b7280]'>or paste URL</span>
        <div className='flex-1 h-px bg-[#1a1a2e]' />
      </div>
      <input
        type='text'
        placeholder='https://ik.imagekit.io/...'
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className='w-full px-3 py-2 rounded-lg bg-[#0d0d16] border border-[#1a1a2e] text-sm text-[#d1d5db] placeholder:text-[#4b5563] focus:outline-none focus:border-violet-500/50 transition-colors'
      />
    </div>
  );
}
