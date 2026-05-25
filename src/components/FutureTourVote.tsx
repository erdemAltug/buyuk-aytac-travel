'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { HandRaisedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { POLL_OPTION_IMAGES } from '@/lib/pollDefaults';

interface PollOption {
  optionId: string;
  label: string;
  description?: string;
  image?: string;
  votes: number;
}

interface PollData {
  _id: string;
  title: string;
  subtitle?: string;
  options: PollOption[];
  totalVotes: number;
}

const VOTER_STORAGE_KEY = 'bat_poll_voter_id';
const VOTED_POLLS_KEY = 'bat_poll_voted';

function getOrCreateVoterId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(VOTER_STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VOTER_STORAGE_KEY, id);
  }
  return id;
}

function hasVotedPoll(pollId: string): boolean {
  try {
    const raw = localStorage.getItem(VOTED_POLLS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(pollId);
  } catch {
    return false;
  }
}

function markVotedPoll(pollId: string) {
  try {
    const raw = localStorage.getItem(VOTED_POLLS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(pollId)) {
      list.push(pollId);
      localStorage.setItem(VOTED_POLLS_KEY, JSON.stringify(list));
    }
  } catch {
    /* ignore */
  }
}

export default function FutureTourVote() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState<string | null>(null);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPoll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/polls/active');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPoll(data);
      if (hasVotedPoll(data._id)) {
        const stored = localStorage.getItem(`bat_poll_choice_${data._id}`);
        if (stored) setVotedOptionId(stored);
      }
    } catch {
      setError('Oylama yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPoll();
  }, [loadPoll]);

  const vote = async (optionId: string) => {
    if (!poll || votedOptionId) return;
    setVotingId(optionId);
    setError(null);
    try {
      const res = await fetch('/api/polls/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pollId: poll._id,
          optionId,
          clientId: getOrCreateVoterId(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          markVotedPoll(poll._id);
          setVotedOptionId(optionId);
          return;
        }
        throw new Error(data.error);
      }
      setPoll((p) =>
        p
          ? {
              ...p,
              options: data.options,
              totalVotes: data.totalVotes,
            }
          : null
      );
      setVotedOptionId(optionId);
      markVotedPoll(poll._id);
      localStorage.setItem(`bat_poll_choice_${poll._id}`, optionId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Oy gönderilemedi');
    } finally {
      setVotingId(null);
    }
  };

  const percent = (votes: number, total: number) =>
    total > 0 ? Math.round((votes / total) * 100) : 0;

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
            <HandRaisedIcon className="w-4 h-4" />
            Kendi Turunu Kendin Yarat
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Gelecek Turlar Oylaması
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bu hafta sonu hangi tura talep gelir sorusunu bölge halkına bırakıyoruz.
            Oyunuzu verin, listeye eklenecek turu birlikte seçelim.
          </p>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Oylama yükleniyor…</p>
        )}

        {error && !poll && (
          <p className="text-center text-red-600">{error}</p>
        )}

        {poll && (
          <>
            <p className="text-center text-gray-800 font-medium mb-2">{poll.title}</p>
            {poll.subtitle && (
              <p className="text-center text-gray-600 mb-8">{poll.subtitle}</p>
            )}

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {poll.options.map((opt, index) => {
                const letter = String.fromCharCode(65 + index);
                const pct = percent(opt.votes, poll.totalVotes);
                const isSelected = votedOptionId === opt.optionId;
                const showResults = Boolean(votedOptionId);
                const imageSrc = opt.image || POLL_OPTION_IMAGES[opt.optionId];

                return (
                  <div
                    key={opt.optionId}
                    className={`relative bg-white rounded-2xl shadow-md overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-orange-500 ring-2 ring-orange-200'
                        : 'border-transparent hover:border-orange-200'
                    }`}
                  >
                    <div className="relative h-40 bg-slate-200">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={opt.label}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-200 to-rose-200 text-4xl">
                          {letter}
                        </div>
                      )}
                      <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center font-bold text-orange-700 text-sm shadow">
                        {letter}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-lg">{opt.label}</h3>
                      {opt.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {opt.description}
                        </p>
                      )}

                      {showResults && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{opt.votes} oy</span>
                            <span>%{pct}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {!votedOptionId ? (
                        <button
                          type="button"
                          disabled={votingId !== null}
                          onClick={() => void vote(opt.optionId)}
                          className="mt-4 w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
                        >
                          {votingId === opt.optionId ? 'Gönderiliyor…' : 'Oy Ver'}
                        </button>
                      ) : isSelected ? (
                        <p className="mt-4 flex items-center justify-center gap-1 text-sm text-orange-700 font-medium">
                          <CheckCircleIcon className="w-5 h-5" />
                          Oyunuz kaydedildi
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {poll.totalVotes > 0 && (
              <p className="text-center text-sm text-gray-500 mt-8">
                Toplam {poll.totalVotes} oy · Sonuçlar anlık güncellenir
              </p>
            )}

            {error && poll && (
              <p className="text-center text-red-600 text-sm mt-4">{error}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
