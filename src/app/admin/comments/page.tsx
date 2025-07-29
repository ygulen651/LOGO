'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Comment {
  _id: string;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  logo: {
    _id: string;
    title: string;
  };
}

export default function CommentManagement() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/admin/comments');
      const data = await response.json();
      
      console.log('API Response:', data);
      
      // Veriyi güvenli hale getir
      if (data.success && Array.isArray(data.comments)) {
        setComments(data.comments);
        console.log('Yorumlar yüklendi:', data.comments.length);
      } else {
        console.error('API\'den beklenen format gelmedi:', data);
        setComments([]);
      }
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Yorum listesinden kaldır
        setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
        alert('Yorum başarıyla silindi');
      } else {
        alert('Yorum silinirken hata oluştu');
      }
    } catch (error) {
      console.error('Yorum silinirken hata:', error);
      alert('Yorum silinirken hata oluştu');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yorumlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Yorum Yönetimi</h1>
              <p className="text-gray-600">Kullanıcı yorumlarını yönetin</p>
            </div>
            <Link href="/admin?key=kartap2025" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Admin Paneline Dön
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Toplam Yorum</dt>
                <dd className="text-lg font-medium text-gray-900">{comments.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Tüm Yorumlar</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <div key={comment._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                                         <div className="flex items-center space-x-3 mb-2">
                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                         <span className="text-white text-sm font-medium">
                           {comment.firstName.charAt(0).toUpperCase()}
                         </span>
                       </div>
                       <div>
                         <p className="text-sm font-medium text-gray-900">{comment.firstName} {comment.lastName}</p>
                         <p className="text-xs text-gray-500">
                           {new Date(comment.createdAt).toLocaleDateString('tr-TR')} - {new Date(comment.createdAt).toLocaleTimeString('tr-TR')}
                         </p>
                       </div>
                     </div>
                     <p className="text-gray-700 mb-2">{comment.comment}</p>
                     <div className="flex items-center space-x-2 text-sm text-gray-500">
                       <span>Logo:</span>
                       <Link 
                         href={`/logo/${comment.logo._id}`} 
                         className="text-blue-600 hover:text-blue-800 font-medium"
                       >
                         {comment.logo.title}
                       </Link>
                     </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Yorumu sil"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz Yorum Yok</h3>
              <p className="text-gray-500">Kullanıcılar henüz yorum yapmamış.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 