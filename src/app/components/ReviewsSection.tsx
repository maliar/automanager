import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  profilePhoto?: string;
}

interface ReviewsData {
  rating: number;
  totalReviews: number;
  name: string;
  reviews: Review[];
}

const fallbackReviews: Review[] = [
  {
    id: 1,
    author: "Marián K.",
    rating: 5,
    date: "Pred 2 mesiacmi",
    text: "Konečne som našiel niekoho, kto sa o moje poistky stará komplexne. Už žiadne hľadanie kontaktov a vysvetľovanie problému odznova. Odporúčam!",
    avatar: "MK"
  },
  {
    id: 2,
    author: "Jana S.",
    rating: 5,
    date: "Pred 3 mesiacmi",
    text: "Skvelá služba! Mám prehľad o všetkých zmluvách na jednom mieste a vždy viem, na koho sa obrátiť. Profesionálny prístup a rýchla reakcia.",
    avatar: "JS"
  },
  {
    id: 3,
    author: "Peter M.",
    rating: 5,
    date: "Pred 4 mesiacmi",
    text: "AUTOMANAGER mi ušetril kopec času a starostí. Vďaka osobnému backoffice mám všetky zmluvy pod kontrolou a vybaviť čokoľvek je otázka jedného telefonátu.",
    avatar: "PM"
  }
];

export function ReviewsSection() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-235ea927/reviews`;
        console.log('Fetching reviews from:', url);
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          console.error('Error fetching reviews:', errorData);
          throw new Error(errorData.message || 'Failed to fetch reviews');
        }

        const data = await response.json();
        console.log('Reviews data received:', data);
        setReviewsData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load Google reviews:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Use fallback reviews on error
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Use fallback reviews if loading or error
  const displayReviews = reviewsData?.reviews || fallbackReviews;
  const displayRating = reviewsData?.rating || 4.9;
  const displayTotalReviews = reviewsData?.totalReviews || 47;

  return (
    <section className="py-16 md:py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="92" height="30" viewBox="0 0 92 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#4285F4">G</text>
              <text x="15" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#EA4335">o</text>
              <text x="29" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#FBBC04">o</text>
              <text x="43" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#4285F4">g</text>
              <text x="56" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#34A853">l</text>
              <text x="64" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="#EA4335">e</text>
            </svg>
            <span className="text-gray-600">Recenzie</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-semibold text-gray-900">{displayRating.toFixed(1)}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-gray-600">Na základe {displayTotalReviews} recenzií</p>
          {error && (
            <p className="text-sm text-amber-600 mt-2">
              Zobrazujú sa ukážkové recenzie (Google API nedostupné)
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayReviews.slice(0, 3).map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Avatar and Author */}
              <div className="flex items-center gap-3 mb-4">
                {review.profilePhoto ? (
                  <img 
                    src={review.profilePhoto}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {review.avatar}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-8">
          <a 
            href="https://www.google.com/search?q=automanager+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
          >
            Zobraziť všetky recenzie na Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}