'use client';

import React from 'react';
import { ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../common/Logo';

interface AuthFullPageLayoutProps {
  formComponent: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function AuthFullPageLayout({
  formComponent,
  title = 'Welcome back',
  description = 'Login to continue your transcription certification journey.',
  className,
}: AuthFullPageLayoutProps) {
  return (
    <main className={cn('min-h-screen overflow-hidden bg-slate-950 text-white', className)}>
      <div className="relative min-h-screen">
        {/* background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.28),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />

        <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* Left Content */}
          <section className="hidden flex-col justify-between p-10 lg:flex xl:p-14">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Transcription Certification Institute
            </div>

            <div className="max-w-xl space-y-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>

              <h1 className="text-5xl font-semibold tracking-tight xl:text-6xl">
                Learn faster.
                <br />
                Certify smarter.
              </h1>

              <p className="max-w-md text-lg leading-8 text-white/65">
                Access your lessons, exams, certificates, course resources, and student dashboard from one secure place.
              </p>

              <div className="grid max-w-md grid-cols-3 gap-3 pt-4">
                {[
                  ['10+', 'Exams'],
                  ['24/7', 'Access'],
                  ['100%', 'Secure'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-xs text-white/50">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/45">
              <ShieldCheck className="h-4 w-4" />
              Secure login protected with encrypted authentication.
            </div>
          </section>

          {/* Right Form */}
          <section className="flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-md">
              <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/30 sm:p-8">
                <div className="mb-8 space-y-2 text-center">
                  {/* <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <ShieldCheck className="h-7 w-7" />
                  </div> */}
                  <Logo className="inline-block w-[150px] md:w-[180px] h-auto" />

                  <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>

                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                </div>

                {formComponent}

                <p className="mt-6 text-center text-xs text-muted-foreground">By continuing, you agree to our terms and privacy policy.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
