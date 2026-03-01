'use client';

import Image from 'next/image';

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Mehmet Kaya",
      location: "Çerkezköy",
      rating: 5,
      date: "Kasım 2024",
      tour: "Kapadokya Turu",
      comment: "Büyük Aytaç Travel ile gittiğimiz Kapadokya turu harikaydı. Rehberimiz çok bilgiliydi, oteller temizdi. Çerkezköy'den kalkış çok rahat oldu. Kesinlikle tekrar tercih edeceğim.",
      image: "/images/reviews/mehmet-k.jpg"
    },
    {
      id: 2,
      name: "Ayşe Demir",
      location: "Tekirdağ",
      rating: 5,
      date: "Ekim 2024",
      tour: "Yunanistan Turu",
      comment: "İlk defa yurtdışı tur deneyimi yaşadım. Büyük Aytaç Travel ekibi çok ilgiliydi. Yunanistan turunda her şey mükemmeldi. Fiyatlar da çok uygundu.",
      image: "/images/reviews/ayse-d.jpg"
    },
    {
      id: 3,
      name: "Osman Yılmaz",
      location: "Çorlu",
      rating: 5,
      date: "Eylül 2024",
      tour: "Günübirlik İstanbul Turu",
      comment: "Ailecek katıldığımız İstanbul günübirlik turunda çok eğlendik. Çocuklar çok mutluydu. Rehber abimiz çok güzel anlatım yaptı. Büyük Aytaç Travel'a teşekkürler.",
      image: "/images/reviews/osman-y.jpg"
    },
    {
      id: 4,
      name: "Fatma Öz",
      location: "Çerkezköy",
      rating: 5,
      date: "Ağustos 2024",
      tour: "Pamukkale Turu",
      comment: "Pamukkale turumuz çok güzeldi. Otobüs konforu mükemmel, yemekler lezzetliydi. TÜRSAB üyesi olmaları güven veriyordu. Başka turlar için de kesinlikle tercih edeceğim.",
      image: "/images/reviews/fatma-o.jpg"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Müşteri Yorumları | Büyük Aytaç Travel Deneyimleri
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Çerkezköy, Tekirdağ ve Çorlu'dan tur deneyimi yaşayan müşterilerimizin görüşleri. 
            TÜRSAB üyesi tur operatörü olarak kaliteli hizmet sunma hedefimiz.
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="text-2xl font-bold text-gray-900">5.0</span>
            <span className="text-gray-600">• 500+ Müşteri Yorumu</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span>{review.location}</span>
                    <span className="mx-2">•</span>
                    <span>{review.date}</span>
                    <span className="mx-2">•</span>
                    <span className="text-blue-600 font-medium">{review.tour}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center">
          <div className="bg-white rounded-lg p-8 shadow-md inline-block">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Daha Fazla Müşteri Yorumu
            </h3>
            <p className="text-gray-600 mb-6">
              Google'da 500+ müşteri yorumumuzu okuyabilir, yeni yorumlar ekleyebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.google.com/search?q=büyük+aytaç+travel+yorumları"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Google Yorumlarını Gör
              </a>
              <a 
                href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                Yorum Yaz
              </a>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Neden Büyük Aytaç Travel?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <ul className="space-y-2">
                <li>✓ 15 yıllık tur operatörü deneyimi</li>
                <li>✓ TÜRSAB üyesi güvencesi</li>
                <li>✓ Çerkezköy merkezli hizmet</li>
                <li>✓ Profesyonel rehber kadrosu</li>
              </ul>
              <ul className="space-y-2">
                <li>✓ 500+ memnun müşteri</li>
                <li>✓ Tekirdağ ve Çorlu kalkış imkanı</li>
                <li>✓ Konforlu araç filosu</li>
                <li>✓ 7/24 müşteri desteği</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Büyük Aytaç Travel",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "500"
            },
            "review": reviews.map(review => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating
              },
              "author": {
                "@type": "Person",
                "name": review.name
              },
              "reviewBody": review.comment
            }))
          })
        }}
      />
    </section>
  );
} 