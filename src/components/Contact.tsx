import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Copy, Check, Loader2, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = React.memo(() => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'telegram' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopy = (text: string, field: 'email' | 'telegram') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2">// Direct Communication</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Let's Build Something <span className="gradient-text-animated">Together</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Have an engineering opportunity, high-impact project, or architectural inquiry? I am actively available for full-time roles and contract deliveries.
            </p>

            <div className="pt-2 space-y-4">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-[#0b101c] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 flex items-center justify-between gap-3">
                <a
                  href="mailto:steve.code.dev@gmail.com"
                  className="flex items-center gap-3.5 min-w-0 group"
                  aria-label="Send email to steve.code.dev@gmail.com"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/50 transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-xs min-w-0">
                    <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Email</span>
                    <span className="text-slate-200 group-hover:text-cyan-300 transition-colors truncate block">
                      steve.code.dev@gmail.com
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy('steve.code.dev@gmail.com', 'email')}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Telegram Card */}
              <div className="p-4 rounded-xl bg-[#0b101c] border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 flex items-center justify-between gap-3">
                <a
                  href="https://t.me/stevejkj"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 min-w-0 group"
                  aria-label="Open Telegram chat @stevejkj"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/50 transition-colors shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-xs min-w-0">
                    <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Telegram</span>
                    <span className="text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                      <span>@stevejkj</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy('@stevejkj', 'telegram')}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors shrink-0"
                  title="Copy Telegram username"
                  aria-label="Copy Telegram username"
                >
                  {copiedField === 'telegram' ? (
                    <Check className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick response badge */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Typical response time: within 24 hours</span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[#0b101c] border border-slate-800/80 p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="py-12 sm:py-16 text-center space-y-4">
                  <div className="relative inline-flex">
                    <CheckCircle2 className="w-12 sm:w-14 h-12 sm:h-14 text-cyan-400 relative z-10" />
                    <div className="absolute inset-0 w-12 sm:w-14 h-12 sm:h-14 bg-cyan-400/20 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">Message Sent Successfully!</h3>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. I have received your message and will get back to you shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 text-xs font-mono hover:text-cyan-300 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left font-mono text-xs">
                  <div>
                    <label htmlFor="contact-name" className="block text-slate-400 mb-1.5 text-[11px] uppercase tracking-wider">
                      Name or Organization
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins or TechCorp Inc."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm placeholder-slate-600 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-slate-400 mb-1.5 text-[11px] uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm placeholder-slate-600 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-slate-400 mb-1.5 text-[11px] uppercase tracking-wider">
                      Project Details or Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your requirements, scope, or timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm placeholder-slate-600 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});