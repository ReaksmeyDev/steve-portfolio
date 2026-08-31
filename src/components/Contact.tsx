import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-10 sm:py-16 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Info */}
          <div className="lg:col-span-5 text-left space-y-5">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">// Connection Gateway</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2">
                Let's Build Something{' '}
                <span className="gradient-text-animated">Together</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Have an idea, project, or opportunity? I'd love to hear about it. Send a message or connect through social links.
            </p>

            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 group-hover:border-cyan-400/40 group-hover:shadow-glow-cyan transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="font-mono text-sm min-w-0">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Email</span>
                  <span className="text-slate-200 break-all">steve.code.dev@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/20 group-hover:border-violet-400/40 group-hover:shadow-glow-purple transition-all duration-300 shrink-0">
                  <MessageSquare className="w-4 h-4 text-violet-400" />
                </div>
                <div className="font-mono text-sm min-w-0">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Telegram</span>
                  <span className="text-slate-200">@Stevejkj</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[rgba(13,20,40,0.5)] backdrop-blur-xl border border-cyan-500/[0.08] p-5 sm:p-8">
              {submitted ? (
                <div className="py-10 sm:py-14 text-center space-y-4">
                  <div className="relative inline-flex">
                    <CheckCircle2 className="w-12 sm:w-14 h-12 sm:h-14 text-emerald-400 relative z-10" />
                    <div className="absolute inset-0 w-12 sm:w-14 h-12 sm:h-14 bg-emerald-400/20 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono">Transmission Received</h3>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto">
                    Thank you for reaching out. I will respond to your message shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                  <div>
                    <label className="block text-slate-400 mb-2 text-[10px] uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name or organization"
                      className="liquid-input w-full px-4 py-3 sm:py-3.5 rounded-xl bg-slate-950/60 text-slate-200 text-sm placeholder-slate-600 outline-none relative z-10"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-2 text-[10px] uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@domain.com"
                      className="liquid-input w-full px-4 py-3 sm:py-3.5 rounded-xl bg-slate-950/60 text-slate-200 text-sm placeholder-slate-600 outline-none relative z-10"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-2 text-[10px] uppercase tracking-wider">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project, timeline, or requirements..."
                      className="liquid-input w-full px-4 py-3 sm:py-3.5 rounded-xl bg-slate-950/60 text-slate-200 text-sm placeholder-slate-600 outline-none resize-none relative z-10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="liquid-btn w-full py-3 sm:py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 relative z-10"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};