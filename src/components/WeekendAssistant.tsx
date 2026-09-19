'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  SparklesIcon,
  XMarkIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import type { ITour } from '@/types/tour';
import type {
  CompanionChoice,
  ConceptChoice,
  StayChoice,
  WeekendPreferences,
} from '@/lib/tourMatcher';
import ReservationModal from './ReservationModal';

type Step = 'companion' | 'concept' | 'stay' | 'loading' | 'results';

const COMPANION_OPTIONS: { value: CompanionChoice; label: string; emoji: string }[] = [
  { value: 'family', label: 'Aile', emoji: '👨‍👩‍👧‍👦' },
  { value: 'friends', label: 'Arkadaş', emoji: '🎉' },
];

const CONCEPT_OPTIONS: { value: ConceptChoice; label: string; emoji: string }[] = [
  { value: 'nature', label: 'Doğa', emoji: '🌲' },
  { value: 'history', label: 'Tarih', emoji: '🏛️' },
  { value: 'entertainment', label: 'Eğlence', emoji: '🎊' },
];

const STAY_OPTIONS: { value: StayChoice; label: string; desc: string }[] = [
  { value: 'daily', label: 'Günübirlik', desc: 'Sabah çık, akşam dön' },
  { value: 'overnight', label: 'Konaklamalı', desc: '1 gece veya daha uzun' },
];

function formatPrice(price: number, discountRate?: number) {
  const final =
    discountRate && discountRate > 0 ? price * (1 - discountRate / 100) : price;
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(final);
}

export default function WeekendAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('companion');
  const [prefs, setPrefs] = useState<Partial<WeekendPreferences>>({});
  const [tours, setTours] = useState<ITour[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reservationTour, setReservationTour] = useState<ITour | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  const reset = useCallback(() => {
    setStep('companion');
    setPrefs({});
    setTours([]);
    setError(null);
  }, []);

  const close = () => {
    setOpen(false);
    reset();
  };

  const openAssistant = () => {
    scrollYRef.current = window.scrollY;
    setOpen(true);
  };

  // Panel açılınca sayfa scroll'unu kilitle — focus scrollIntoView'ı engeller
  useEffect(() => {
    if (!open) return;

    const y = scrollYRef.current;
    const { style } = document.body;
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    };

    style.overflow = 'hidden';
    style.position = 'fixed';
    style.top = `-${y}px`;
    style.left = '0';
    style.right = '0';
    style.width = '100%';

    const id = window.requestAnimationFrame(() => {
      panelRef.current?.focus({ preventScroll: true });
      window.scrollTo(0, y);
    });

    return () => {
      window.cancelAnimationFrame(id);
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.left = prev.left;
      style.right = prev.right;
      style.width = prev.width;
      window.scrollTo(0, y);
    };
  }, [open]);

  const fetchRecommendations = async (fullPrefs: WeekendPreferences) => {
    setStep('loading');
    setError(null);
    try {
      const res = await fetch('/api/assistant/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPrefs),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Öneri alınamadı');
      setTours(data.tours ?? []);
      setStep('results');
    } catch {
      setError('Şu an öneri oluşturulamadı. Lütfen tekrar deneyin.');
      setStep('stay');
    }
  };

  const selectCompanion = (companion: CompanionChoice) => {
    setPrefs((p) => ({ ...p, companion }));
    setStep('concept');
  };

  const selectConcept = (concept: ConceptChoice) => {
    setPrefs((p) => ({ ...p, concept }));
    setStep('stay');
  };

  const selectStay = (stay: StayChoice) => {
    const full = { ...prefs, stay } as WeekendPreferences;
    setPrefs(full);
    void fetchRecommendations(full);
  };

  const stepTitle =
    step === 'companion'
      ? 'Kiminle gidiyorsun?'
      : step === 'concept'
        ? 'Nasıl bir konsept?'
        : step === 'stay'
          ? 'Günübirlik mi, konaklamalı mı?'
          : step === 'loading'
            ? 'Sana en uygun turları seçiyorum…'
            : 'Hafta sonu önerilerin';

  return (
    <>
      <button
        type="button"
        onClick={openAssistant}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl"
        aria-label="Hafta sonu ne yapsam asistanı"
      >
        <SparklesIcon className="h-6 w-6" aria-hidden />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-end p-4 pointer-events-none sm:items-end sm:justify-end"
          aria-modal
          role="dialog"
          aria-labelledby="weekend-assistant-title"
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            className="pointer-events-auto flex w-full max-w-sm max-h-[min(85vh,640px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl outline-none animate-in fade-in slide-in-from-bottom-4 duration-200 sm:mb-20 sm:mr-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-white">
              <div className="flex min-w-0 items-center gap-2">
                {step !== 'companion' && step !== 'loading' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 'results') reset();
                      else if (step === 'stay') setStep('concept');
                      else if (step === 'concept') setStep('companion');
                    }}
                    className="shrink-0 rounded-lg p-1 hover:bg-white/20"
                    aria-label="Geri"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                )}
                <div className="min-w-0">
                  <h2
                    id="weekend-assistant-title"
                    className="truncate text-sm font-semibold"
                  >
                    Hafta Sonu Ne Yapsam?
                  </h2>
                  <p className="truncate text-xs text-violet-100">{stepTitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-lg p-1.5 hover:bg-white/20"
                aria-label="Kapat"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4">
              {step === 'companion' && (
                <div className="grid grid-cols-2 gap-3">
                  {COMPANION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectCompanion(opt.value)}
                      className="flex flex-col items-center gap-2 rounded-xl border-2 border-slate-100 p-4 transition-colors hover:border-violet-400 hover:bg-violet-50"
                    >
                      <span className="text-3xl">{opt.emoji}</span>
                      <span className="font-semibold text-slate-800">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 'concept' && (
                <div className="grid grid-cols-1 gap-2">
                  {CONCEPT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectConcept(opt.value)}
                      className="flex items-center gap-3 rounded-xl border-2 border-slate-100 p-3 text-left transition-colors hover:border-violet-400 hover:bg-violet-50"
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="font-semibold text-slate-800">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 'stay' && (
                <>
                  <div className="grid grid-cols-1 gap-2">
                    {STAY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => selectStay(opt.value)}
                        className="rounded-xl border-2 border-slate-100 p-4 text-left transition-colors hover:border-violet-400 hover:bg-violet-50"
                      >
                        <span className="block font-semibold text-slate-800">
                          {opt.label}
                        </span>
                        <span className="text-sm text-slate-500">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                  {error && (
                    <p className="mt-3 text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}
                </>
              )}

              {step === 'loading' && (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                  <ArrowPathIcon className="h-10 w-10 animate-spin text-violet-600" />
                  <p className="text-center text-sm text-slate-600">
                    Veritabanındaki turlar arasından en uygun 2 seçeneği buluyorum…
                  </p>
                </div>
              )}

              {step === 'results' && (
                <div className="space-y-4">
                  {tours.length === 0 ? (
                    <p className="py-6 text-center text-sm text-slate-600">
                      Bu kriterlere uygun aktif tur bulunamadı.{' '}
                      <Link
                        href="/tours"
                        className="font-medium text-violet-600 hover:underline"
                      >
                        Tüm turlara göz atın
                      </Link>
                    </p>
                  ) : (
                    tours.map((tour) => (
                      <article
                        key={tour.slug}
                        className="overflow-hidden rounded-xl border border-slate-200"
                      >
                        <div className="relative h-28 bg-slate-100">
                          <Image
                            src={tour.image}
                            alt={tour.name}
                            fill
                            className="object-cover"
                            sizes="320px"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                            {tour.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {tour.destination}
                          </p>
                          <p className="mt-2 text-base font-bold text-violet-700">
                            {formatPrice(tour.price, tour.discountRate)}
                            <span className="ml-1 text-xs font-normal text-slate-400">
                              kişi başı
                            </span>
                          </p>
                          <div className="mt-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setReservationTour(tour)}
                              className="flex-1 rounded-lg bg-violet-600 py-2 text-xs font-semibold text-white hover:bg-violet-700"
                            >
                              Rezervasyon
                            </button>
                            <Link
                              href={`/tours/${tour.slug}`}
                              className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Detay
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                  <button
                    type="button"
                    onClick={reset}
                    className="w-full rounded-lg py-2 text-sm font-medium text-violet-600 hover:bg-violet-50"
                  >
                    Baştan başla
                  </button>
                </div>
              )}
            </div>

            {step === 'companion' && (
              <p className="shrink-0 px-4 pb-3 text-center text-[10px] text-slate-400">
                3 kısa soru · size özel 2 tur önerisi
              </p>
            )}
          </div>
        </div>
      )}

      {reservationTour && (
        <ReservationModal
          isOpen={Boolean(reservationTour)}
          onClose={() => setReservationTour(null)}
          tourName={reservationTour.name}
          tourSlug={reservationTour.slug}
        />
      )}
    </>
  );
}
