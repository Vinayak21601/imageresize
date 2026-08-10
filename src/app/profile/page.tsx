import { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ProfileStudio } from '@/components/profile/ProfileStudio';

export const metadata: Metadata = {
  title: 'My Profile & Account Dashboard | ImageStudio PRO',
  description: 'Manage your ImageStudio PRO subscription, saved cropper presets, QR code history, shortened URL analytics, and PRO API keys.',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      
      {/* TOP HEADER SECTION WITH SIGNATURE SKY CLOUD BACKDROP */}
      <div className="bg-sky-cloud-hero border-b border-zinc-200/60 pb-12 pt-2 space-y-8">
        <Navbar />

        {/* PAGE HERO TITLE - CLEAN MONOCHROME TYPOGRAPHY */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3 pt-4">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            My Profile &amp; Suite Hub
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Manage your ImageStudio PRO membership, view saved cropper presets, inspect QR codes, track shortened URL analytics, and copy your PRO API key.
          </p>
        </div>
      </div>

      {/* LOWER DASHBOARD CONTENT */}
      <main className="flex-1 py-8">
        <ProfileStudio />
      </main>

      <Footer />
    </div>
  );
}
