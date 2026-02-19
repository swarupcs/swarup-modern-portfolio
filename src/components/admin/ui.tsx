// Shared UI components for admin editors

export function AdminCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#111118] border border-[#1a1a2e] rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function AdminCardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className='flex items-start justify-between mb-6 pb-5 border-b border-[#1a1a2e]'>
      <div>
        <h3 className='text-base font-semibold text-white'>{title}</h3>
        {description && (
          <p className='text-sm text-[#6b7280] mt-0.5'>{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className='space-y-1.5'>
      <label className='text-xs font-semibold text-[#9ca3af] uppercase tracking-widest'>
        {label}
      </label>
      {children}
      {hint && <p className='text-xs text-[#4b5563]'>{hint}</p>}
    </div>
  );
}

export function Input({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full bg-[#0d0d14] border border-[#1f1f2e] rounded-xl px-4 py-2.5 text-white placeholder-[#374151] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  className = '',
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full bg-[#0d0d14] border border-[#1f1f2e] rounded-xl px-4 py-2.5 text-white placeholder-[#374151] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm resize-none ${className}`}
      {...props}
    />
  );
}

export function Select({
  className = '',
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
}) {
  return (
    <select
      className={`w-full bg-[#0d0d14] border border-[#1f1f2e] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm appearance-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function PrimaryButton({
  children,
  className = '',
  loading = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      className={`inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm shadow-lg shadow-violet-500/10 ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
      ) : null}
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#1f1f3a] border border-[#2a2a3e] text-[#d1d5db] font-medium px-4 py-2.5 rounded-xl transition-all text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-xl transition-all text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
}) {
  const variants = {
    default: 'bg-[#1a1a2e] text-[#9ca3af] border-[#2a2a3e]',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    info: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

export function Toast({
  message,
  type = 'success',
  onClose,
}: {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-sm font-medium ${
        type === 'success'
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          : 'bg-red-500/10 border-red-500/20 text-red-400'
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`}
      />
      {message}
      <button
        onClick={onClose}
        className='ml-2 opacity-60 hover:opacity-100 transition-opacity'
      >
        ✕
      </button>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className='text-center py-16 px-4'>
      <div className='w-16 h-16 rounded-2xl bg-[#1a1a2e] border border-[#2a2a3e] flex items-center justify-center mx-auto mb-4'>
        <div className='w-6 h-6 rounded-full border-2 border-[#374151]' />
      </div>
      <p className='text-white font-medium'>{title}</p>
      <p className='text-[#6b7280] text-sm mt-1 mb-4'>{description}</p>
      {action}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center py-16'>
      <div className='w-8 h-8 border-2 border-[#2a2a3e] border-t-violet-500 rounded-full animate-spin' />
    </div>
  );
}
