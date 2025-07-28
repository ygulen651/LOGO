'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Logo {
  _id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  totalVotes: number;
  totalLikes: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface Comment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  comment: string;
  createdAt: string;
}

export default function LogoDetailPage() {
  const params = useParams();
  const logoId = params.id as string;
  
  const [logo, setLogo] = useState<Logo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLiked, setUserLiked] = useState<boolean | null>(null);
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  
  // Yorum sistemi state'leri
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentForm, setCommentForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comment: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  // Session ID oluştur veya mevcut olanı al
  const getSessionId = () => {
    if (typeof window !== 'undefined') {
      let sessionId = localStorage.getItem('voteSessionId');
      if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('voteSessionId', sessionId);
      }
      return sessionId;
    }
    return 'unknown';
  };

  // Kullanıcının bu logoya oy verip vermediğini kontrol et
  const checkVoteStatus = () => {
    if (typeof window !== 'undefined') {
      const votedLogos = JSON.parse(localStorage.getItem('votedLogos') || '[]');
      const hasVotedForThisLogo = votedLogos.includes(logoId);
      setHasVoted(hasVotedForThisLogo);
      return hasVotedForThisLogo;
    }
    return false;
  };

  // Oy verilen logoyu localStorage'a kaydet
  const markAsVoted = () => {
    if (typeof window !== 'undefined') {
      const votedLogos = JSON.parse(localStorage.getItem('votedLogos') || '[]');
      if (!votedLogos.includes(logoId)) {
        votedLogos.push(logoId);
        localStorage.setItem('votedLogos', JSON.stringify(votedLogos));
      }
      setHasVoted(true);
    }
  };

  const fetchLogo = useCallback(async () => {
    try {
      const response = await fetch(`/api/logos/${logoId}`);
      const data = await response.json();
      
      if (response.ok) {
        setLogo(data);
      } else {
        setError(data.error || 'Logo bulunamadı');
      }
    } catch {
      setError('Logo yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  }, [logoId]);

  // Yorumları getir
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/logos/${logoId}/comments`);
      const data = await response.json();
      
      if (response.ok) {
        setComments(data.comments);
      } else {
        console.error('Yorumlar yüklenirken hata:', data.error);
      }
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error);
    }
  }, [logoId]);

  // Yorum gönder
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingComment(true);
    setCommentError(null);

    try {
      const response = await fetch(`/api/logos/${logoId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentForm),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Yorum başarıyla eklendi
        setCommentForm({
          firstName: '',
          lastName: '',
          email: '',
          comment: ''
        });
        // Yorumları yeniden yükle
        fetchComments();
        alert('Yorumunuz başarıyla eklendi!');
      } else {
        setCommentError(data.error || 'Yorum eklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Yorum gönderme hatası:', error);
      setCommentError('Yorum gönderilirken hata oluştu');
    } finally {
      setSubmittingComment(false);
    }
  };

  useEffect(() => {
    fetchLogo();
    fetchComments();
    checkVoteStatus(); // Sayfa yüklendiğinde oy durumunu kontrol et
  }, [fetchLogo, fetchComments, checkVoteStatus]);

  const handleLike = async () => {
    setVoting(true);
    try {
      const sessionId = getSessionId();
      const response = await fetch(`/api/logos/${logoId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: true, sessionId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUserLiked(true);
        if (logo) {
          setLogo({
            ...logo,
            totalLikes: data.totalLikes,
            totalVotes: data.totalVotes,
          });
        }
        // Başarılı beğeni mesajı
        alert('Logoyu beğendiniz!');
        markAsVoted(); // Oy verildikten sonra butonu devre dışı bırak
      } else {
        // Hata mesajını göster
        alert(data.error || 'Beğeni işlemi sırasında hata oluştu');
      }
    } catch (error) {
      console.error('Beğeni hatası:', error);
      alert('Beğeni işlemi sırasında hata oluştu');
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !logo) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Hata</h1>
        <p className="text-gray-600">{error || 'Logo bulunamadı'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Logo Image */}
        <div className="relative h-80 bg-gray-100">
          <Image
            src={logo.imageUrl}
            alt={logo.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Logo Info */}
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{logo.title}</h1>
                <p className="text-lg text-gray-600 mt-2">
                  Tasarımcı: <span className="font-semibold text-blue-600">{logo.firstName} {logo.lastName}</span>
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-500">
                  {new Date(logo.createdAt).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Boyutlar</p>
                  <p className="font-semibold">{logo.width} × {logo.height}px</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Toplam Oy</p>
                  <p className="font-semibold">{logo.totalVotes}</p>
                </div>
              </div>
            </div>

            {/* Like Section */}
            <div className="lg:w-80">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Beğeni Sayısı</h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-8 h-8 text-green-500 fill-current" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-900">
                    {logo.totalLikes}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  {logo.totalVotes} kişi oy verdi
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sizin Oyunuz</h4>
                  {hasVoted ? (
                    <div className="mb-4">
                      <p className="text-sm text-red-600 font-medium mb-2">
                        ⚠️ Bu logoya zaten oy verdiniz!
                      </p>
                      <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-green-500 fill-current" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span className="text-sm text-green-600">
                          Logoyu beğendiniz
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <button
                        onClick={handleLike}
                        disabled={voting || hasVoted}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                          voting || hasVoted
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span>{voting ? 'İşleniyor...' : 'Oy Ver'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yorumlar Bölümü */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Yorumlar ({comments.length})</h2>
            
            {/* Yorum Formu */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yorum Yapın</h3>
              
              {commentError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {commentError}
                </div>
              )}
              
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Ad *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={commentForm.firstName}
                      onChange={(e) => setCommentForm({...commentForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Adınız"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Soyad *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={commentForm.lastName}
                      onChange={(e) => setCommentForm({...commentForm, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Soyadınız"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Yorumunuz *
                  </label>
                  <textarea
                    id="comment"
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({...commentForm, comment: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Logonuz hakkında düşüncelerinizi paylaşın..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={submittingComment}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    submittingComment
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                  }`}
                >
                  {submittingComment ? 'Gönderiliyor...' : 'Yorum Gönder'}
                </button>
              </form>
            </div>

            {/* Yorumlar Listesi */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {comment.firstName} {comment.lastName}
                        </h4>
                        <p className="text-sm text-gray-500">{comment.email}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 