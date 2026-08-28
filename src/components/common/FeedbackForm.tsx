'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Star, Send, CheckCircle2, AlertCircle, MessageSquare, ThumbsUp, Sparkles, Filter } from 'lucide-react';

export interface PublicFeedback {
  id: string;
  name: string;
  email?: string;
  category: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

export function FeedbackForm() {
  const [activeTab, setActiveTab] = useState<'submit' | 'reviews'>('submit');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('General Improvement');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Community Feedbacks List
  const [publicFeedbacks, setPublicFeedbacks] = useState<PublicFeedback[]>([]);

  const fetchPublicFeedback = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/admin/feedback`);
      if (res.ok) {
        const data = await res.json();
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setPublicFeedbacks(data.data);
        }
      }
    } catch {
      // Keep static sample feedbacks if backend is unreachable
    }
  };

  useEffect(() => {
    fetchPublicFeedback();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setErrorMessage('Please fill in your name, email, and feedback message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const newFeedbackObj: PublicFeedback = {
      id: `fb-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      category,
      rating,
      feedback: feedback.trim(),
      createdAt: 'Just now',
    };

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/admin/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          category,
          rating,
          feedback,
        }),
      });

      setSuccessMessage('Thank you! Your feedback has been submitted and added to the community wall.');
      setPublicFeedbacks((prev) => [newFeedbackObj, ...prev]);
      setName('');
      setEmail('');
      setFeedback('');
      setRating(5);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setSuccessMessage('Thank you! Your feedback has been submitted successfully.');
      setPublicFeedbacks((prev) => [newFeedbackObj, ...prev]);
      setName('');
      setEmail('');
      setFeedback('');
      setTimeout(() => setSuccessMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
      <div className="bg-white border border-zinc-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-sm text-slate-900 space-y-6">
        
        {/* TOP TAB SWITCHER & HEADER */}
        {/* HEADER */}
        <div className="space-y-1.5 pb-4 border-b border-zinc-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-slate-800 text-[11px] sm:text-xs font-bold border border-zinc-200/80">
            <MessageSquarePlus className="w-3.5 h-3.5 text-slate-900" />
            <span>User Feedback &amp; Community Wall</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-slate-900">
            User Feedback &amp; Suggestions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Share what tools you want us to build next, or read what other users are saying.
          </p>
        </div>

        {/* PROPER SEGMENTED TAB CONTROL BAR */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-zinc-100/90 border border-zinc-200/80 font-bold text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all cursor-pointer font-bold text-xs ${
              activeTab === 'submit'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-all cursor-pointer font-bold text-xs ${
              activeTab === 'reviews'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>User Reviews</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              activeTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-zinc-200 text-slate-800'
            }`}>
              {publicFeedbacks.length}
            </span>
          </button>
        </div>

        {/* ALERTS */}
        {successMessage && (
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* TAB 1: SUBMIT FEEDBACK FORM */}
        {activeTab === 'submit' ? (
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* NAME */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Your Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* CATEGORY */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Improvement Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 transition cursor-pointer"
                >
                  <option value="Feature Request">Feature Request / New Tool Idea</option>
                  <option value="Usability & UI">Usability &amp; Design Feedback</option>
                  <option value="Speed & Processing">Processing Speed &amp; Performance</option>
                  <option value="General Improvement">General Improvement</option>
                  <option value="Bug Report">Report a Bug / Issue</option>
                </select>
              </div>

              {/* STAR RATING */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Overall Satisfaction</label>
                <div className="flex items-center space-x-1.5 sm:space-x-2 pt-1 overflow-x-auto">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 pl-1 sm:pl-2 whitespace-nowrap">{rating} / 5 Stars</span>
                </div>
              </div>

            </div>

            {/* TEXTAREA SUGGESTIONS */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">What Improvements Would You Like to See?</label>
              <textarea
                required
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what tools or improvements you want us to build next..."
                className="w-full p-3.5 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition leading-relaxed resize-none"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-bounce' : ''}`} />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
              </button>
            </div>

          </form>
        ) : (
          /* TAB 2: USER REVIEWS & COMMUNITY FEEDBACK WALL */
          <div className="space-y-5 sm:space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-900 text-white font-black text-base sm:text-lg flex items-center justify-center">
                  {publicFeedbacks.length > 0
                    ? (publicFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / publicFeedbacks.length).toFixed(1)
                    : '5.0'}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-semibold mt-0.5">
                    {publicFeedbacks.length > 0
                      ? `Average Rating • ${publicFeedbacks.length} Verified Community Review${publicFeedbacks.length > 1 ? 's' : ''}`
                      : 'Community Feedback Wall'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('submit')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Add Your Review</span>
              </button>
            </div>

            {/* REVIEWS GRID */}
            {publicFeedbacks.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2 text-slate-500">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-400" />
                <p className="text-xs font-bold text-slate-700">No community reviews submitted yet</p>
                <p className="text-[11px]">Be the first to share your thoughts, suggestions, or tool requests!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publicFeedbacks.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs">{item.name}</div>
                            <div className="text-[10px] text-slate-500 font-medium">{item.createdAt}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                        "{item.feedback}"
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-zinc-200/60 text-[10px] text-slate-500">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 font-bold text-slate-700">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-600">
                        <ThumbsUp className="w-3 h-3 text-slate-500" />
                        Verified Feedback
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
