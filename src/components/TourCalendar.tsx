'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour } from '@/models/Tour';

interface CalendarDay {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  tours: ITour[];
}

export default function TourCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ay isimleri
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  // Haftanın günleri
  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // Seçili tarih için ay ve yıl bilgisi
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  // Turları getir
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours({ isActive: true });
        setTours(data);
        setLoading(false);
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Tur bilgileri yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Takvim günlerini oluştur
  useEffect(() => {
    const generateCalendarDays = () => {
      // Ayın ilk günü
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      // Ayın son günü
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
      
      // Ayın ilk gününün haftanın hangi günü olduğunu bulalım (0: Pazar, 1: Pazartesi, ...)
      let firstDayOfWeek = firstDayOfMonth.getDay();
      // Pazarı 6, Pazartesiyi 0 olarak ayarlıyoruz (Türkiye formatı)
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
      
      const days: CalendarDay[] = [];
      
      // Önceki ayın günlerini ekle
      const daysFromPrevMonth = firstDayOfWeek;
      const prevMonth = new Date(currentYear, currentMonth, 0); // Önceki ayın son günü
      const prevMonthLastDay = prevMonth.getDate();
      
      for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
        const day = new Date(currentYear, currentMonth - 1, i);
        const toursOnDay = findToursOnDay(day);
        days.push({
          day: i,
          month: currentMonth - 1 < 0 ? 11 : currentMonth - 1,
          year: currentMonth - 1 < 0 ? currentYear - 1 : currentYear,
          isCurrentMonth: false,
          tours: toursOnDay
        });
      }
      
      // Mevcut ayın günlerini ekle
      const daysInMonth = lastDayOfMonth.getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(currentYear, currentMonth, i);
        const toursOnDay = findToursOnDay(day);
        days.push({
          day: i,
          month: currentMonth,
          year: currentYear,
          isCurrentMonth: true,
          tours: toursOnDay
        });
      }
      
      // Sonraki ayın günlerini ekle
      const totalCalendarDaysNeeded = 42; // 6 hafta (6x7)
      const daysFromNextMonth = totalCalendarDaysNeeded - days.length;
      
      for (let i = 1; i <= daysFromNextMonth; i++) {
        const day = new Date(currentYear, currentMonth + 1, i);
        const toursOnDay = findToursOnDay(day);
        days.push({
          day: i,
          month: currentMonth + 1 > 11 ? 0 : currentMonth + 1,
          year: currentMonth + 1 > 11 ? currentYear + 1 : currentYear,
          isCurrentMonth: false,
          tours: toursOnDay
        });
      }
      
      setCalendarDays(days);
    };
    
    generateCalendarDays();
  }, [currentMonth, currentYear, tours]);
  
  // Belirli bir günde gerçekleşen turları bul
  const findToursOnDay = (date: Date): ITour[] => {
    return tours.filter(tour => {
      if (!tour.startDate) return false;
      
      const startDate = new Date(tour.startDate);
      // Tarih formatları aynı olmalı (yıl, ay, gün)
      return (
        startDate.getDate() === date.getDate() &&
        startDate.getMonth() === date.getMonth() &&
        startDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Önceki aya git
  const goToPrevMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Sonraki aya git
  const goToNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Bugüne git
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Tur Takvimi: {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={goToPrevMonth}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={goToToday}
            className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            Bugün
          </button>
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Haftanın günleri */}
        {weekDays.map((day) => (
          <div key={day} className="text-center py-2 font-medium text-gray-600">
            {day}
          </div>
        ))}

        {/* Takvim günleri */}
        {calendarDays.map((day, index) => {
          const isToday = 
            day.day === new Date().getDate() && 
            day.month === new Date().getMonth() && 
            day.year === new Date().getFullYear();
          
          const hasTours = day.tours.length > 0;
          
          return (
            <div
              key={index}
              className={`relative min-h-[80px] p-1 border ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'} ${isToday ? 'border-blue-500' : 'border-gray-200'}`}
            >
              <div className={`text-right ${day.isCurrentMonth ? (isToday ? 'text-blue-500 font-bold' : 'text-gray-800') : 'text-gray-400'}`}>
                {day.day}
              </div>
              
              {hasTours && (
                <div className="mt-1">
                  {day.tours.slice(0, 2).map((tour, tourIndex) => (
                    <Link
                      key={tourIndex}
                      href={`/tours/${tour.slug}`}
                      className="block truncate text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1 hover:bg-blue-200"
                    >
                      {tour.name}
                    </Link>
                  ))}
                  
                  {day.tours.length > 2 && (
                    <div className="text-xs text-center text-blue-500">
                      +{day.tours.length - 2} daha
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span>Yaklaşan turlar ({tours.filter(tour => tour.startDate && new Date(tour.startDate) > new Date()).length})</span>
        </div>
        <Link href="/tours" className="text-blue-500 hover:underline">Tüm turları görüntüle</Link>
      </div>
    </div>
  );
} 