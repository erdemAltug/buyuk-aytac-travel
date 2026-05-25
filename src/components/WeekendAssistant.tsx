'use client';

import { useState, useCallback } from 'react';
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
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Hafta sonu ne yapsam asistanı"
      >
        <SparklesIcon className="w-7 h-7" aria-hidden />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-end p-4 sm:items-end sm:justify-end pointer-events-none"
          aria-modal
          role="dialog"
          aria-labelledby="weekend-assistant-title"
        >
          <div
            className="pointer-events-auto w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[min(85vh,640px)] animate-in fade-in slide-in-from-bottom-4 duration-200 sm:mb-20 sm:mr-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                {step !== 'companion' && step !== 'loading' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 'results') reset();
                      else if (step === 'stay') setStep('concept');
                      else if (step === 'concept') setStep('companion');
                    }}
                    className="p-1 rounded-lg hover:bg-white/20 shrink-0"
                    aria-label="Geri"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                  </button>
                )}
                <div className="min-w-0">
                  <h2 id="weekend-assistant-title" className="font-semibold text-sm truncate">
                    Hafta Sonu Ne Yapsam?
                  </h2>
                  <p className="text-xs text-violet-100 truncate">{stepTitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                className="p-1.5 rounded-lg hover:bg-white/20 shrink-0"
                aria-label="Kapat"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {step === 'companion' && (
                <div className="grid grid-cols-2 gap-3">
                  {COMPANION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectCompanion(opt.value)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-100 hover:border-violet-400 hover:bg-violet-50 transition-colors"
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
                      className="flex items-center gap-3 p-3 rounded-xl border-2 border-slate-100 hover:border-violet-400 hover:bg-violet-50 transition-colors text-left"
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
                        className="p-4 rounded-xl border-2 border-slate-100 hover:border-violet-400 hover:bg-violet-50 transition-colors text-left"
                      >
                        <span className="font-semibold text-slate-800 block">{opt.label}</span>
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
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <ArrowPathIcon className="w-10 h-10 text-violet-600 animate-spin" />
                  <p className="text-sm text-slate-600 text-center">
                    Veritabanındaki turlar arasından en uygun 2 seçeneği buluyorum…
                  </p>
                </div>
              )}

              {step === 'results' && (
                <div className="space-y-4">
                  {tours.length === 0 ? (
                    <p className="text-sm text-slate-600 text-center py-6">
                      Bu kriterlere uygun aktif tur bulunamadı.{' '}
                      <Link href="/tours" className="text-violet-600 font-medium hover:underline">
                        Tüm turlara göz atın
                      </Link>
                    </p>
                  ) : (
                    tours.map((tour) => (
                      <article
                        key={tour.slug}
                        className="rounded-xl border border-slate-200 overflow-hidden"
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
                          <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">
                            {tour.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">{tour.destination}</p>
                          <p className="text-base font-bold text-violet-700 mt-2">
                            {formatPrice(tour.price, tour.discountRate)}
                            <span className="text-xs font-normal text-slate-400 ml-1">
                              kişi başı
                            </span>
                          </p>
                          <div className="flex gap-2 mt-3">
                            <button
                              type="button"
                              onClick={() => setReservationTour(tour)}
                              className="flex-1 py-2 text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
                            >
                              Rezervasyon
                            </button>
                            <Link
                              href={`/tours/${tour.slug}`}
                              className="flex-1 py-2 text-xs font-semibold text-center border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700"
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
                    className="w-full py-2 text-sm text-violet-600 font-medium hover:bg-violet-50 rounded-lg"
                  >
                    Baştan başla
                  </button>
                </div>
              )}
            </div>

            {step === 'companion' && (
              <p className="px-4 pb-3 text-[10px] text-slate-400 text-center shrink-0">
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
