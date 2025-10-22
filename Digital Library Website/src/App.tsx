import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { BookCard, Book } from './components/BookCard';
import { BookDetail } from './components/BookDetail';
import { CategoryFilter } from './components/CategoryFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Library, TrendingUp, Clock } from 'lucide-react';

// Mock data untuk buku-buku
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Adventure',
    author: 'Sarah Johnson',
    category: 'Fiksi',
    year: 2023,
    pages: 342,
    description: 'Sebuah petualangan epik yang mengisahkan perjalanan seorang penjelajah muda yang mencari harta karun legendaris. Perjalanan ini penuh dengan tantangan, persahabatan, dan penemuan diri yang mengubah hidupnya selamanya.',
    coverUrl: 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc2MTA3MDI4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '2',
    title: 'Modern Science Explained',
    author: 'Dr. Michael Chen',
    category: 'Sains',
    year: 2024,
    pages: 428,
    description: 'Panduan komprehensif tentang penemuan-penemuan ilmiah modern yang mengubah cara kita memahami dunia. Dari fisika kuantum hingga biologi molekuler, buku ini menjelaskan konsep-konsep kompleks dengan cara yang mudah dipahami.',
    coverUrl: 'https://images.unsplash.com/photo-1725869973689-425c74f79a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzY2llbmNlfGVufDF8fHx8MTc2MTExOTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '3',
    title: 'History of Civilizations',
    author: 'Prof. Amanda Williams',
    category: 'Sejarah',
    year: 2022,
    pages: 567,
    description: 'Eksplorasi mendalam tentang peradaban-peradaban besar di dunia, dari Mesir Kuno hingga Kekaisaran Romawi. Buku ini mengungkap rahasia kejayaan dan kejatuhan peradaban-peradaban yang membentuk dunia modern.',
    coverUrl: 'https://images.unsplash.com/photo-1611576673788-a954e01092d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBoaXN0b3J5fGVufDF8fHx8MTc2MTE0NzI3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: false,
  },
  {
    id: '4',
    title: 'Digital Revolution',
    author: 'Kevin Park',
    category: 'Teknologi',
    year: 2024,
    pages: 298,
    description: 'Analisis mendalam tentang bagaimana teknologi digital mengubah setiap aspek kehidupan kita. Dari AI hingga blockchain, buku ini membahas tren teknologi yang akan membentuk masa depan kita.',
    coverUrl: 'https://images.unsplash.com/photo-1668713447978-1e47fcfeff4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTAyNDE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '5',
    title: 'Classic Literature Collection',
    author: 'Various Authors',
    category: 'Sastra',
    year: 2023,
    pages: 892,
    description: 'Koleksi karya-karya sastra klasik dari berbagai penulis terkenal dunia. Termasuk novel, puisi, dan esai yang telah menginspirasi generasi pembaca selama berabad-abad.',
    coverUrl: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBsaXRlcmF0dXJlfGVufDF8fHx8MTc2MTA3NTYwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '6',
    title: 'The Art of Mindfulness',
    author: 'Emma Davis',
    category: 'Pengembangan Diri',
    year: 2023,
    pages: 245,
    description: 'Panduan praktis untuk mencapai ketenangan pikiran dan hidup yang lebih bermakna melalui praktik mindfulness. Dilengkapi dengan latihan-latihan yang mudah diikuti untuk kehidupan sehari-hari.',
    coverUrl: 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc2MTA3MDI4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '7',
    title: 'Economic Principles',
    author: 'Dr. Robert Martinez',
    category: 'Ekonomi',
    year: 2022,
    pages: 456,
    description: 'Penjelasan komprehensif tentang prinsip-prinsip ekonomi dasar dan penerapannya dalam dunia nyata. Buku ini cocok untuk pemula maupun yang ingin memperdalam pemahaman ekonomi.',
    coverUrl: 'https://images.unsplash.com/photo-1725869973689-425c74f79a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzY2llbmNlfGVufDF8fHx8MTc2MTExOTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    available: false,
  },
  {
    id: '8',
    title: 'Cosmic Mysteries',
    author: 'Dr. Lisa Anderson',
    category: 'Sains',
    year: 2024,
    pages: 387,
    description: 'Petualangan luar biasa menjelajahi misteri-misteri alam semesta. Dari lubang hitam hingga materi gelap, buku ini membawa pembaca dalam perjalanan menakjubkan melalui kosmos.',
    coverUrl: 'https://images.unsplash.com/photo-1611576673788-a954e01092d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBoaXN0b3J5fGVufDF8fHx8MTc2MTE0NzI3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(mockBooks.map(book => book.category)));
  }, []);

  // Filter books based on search and category
  const filteredBooks = useMemo(() => {
    let filtered = mockBooks;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // Filter by tab
    if (activeTab === 'available') {
      filtered = filtered.filter(book => book.available);
    } else if (activeTab === 'new') {
      filtered = filtered.filter(book => book.year >= 2024);
    }

    return filtered;
  }, [searchQuery, selectedCategory, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="mb-4">Selamat Datang di Perpustakaan Digital</h1>
            <p className="text-xl opacity-90">
              Jelajahi ribuan koleksi buku digital dari berbagai kategori. Baca kapan saja, di mana saja.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              Semua
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Tersedia
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Terbaru
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="mb-4">Kategori</h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Books Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2>{filteredBooks.length} Buku Ditemukan</h2>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onSelect={setSelectedBook}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Library className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="mb-2">Tidak ada buku ditemukan</h3>
              <p className="text-gray-600">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Book Detail Modal */}
      <BookDetail
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}
