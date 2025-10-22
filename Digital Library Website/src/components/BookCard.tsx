import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookOpen, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  pages: number;
  description: string;
  coverUrl: string;
  available: boolean;
}

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export function BookCard({ book, onSelect }: BookCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div onClick={() => onSelect(book)}>
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="line-clamp-2 flex-1">{book.title}</h3>
            <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-600 mb-2">{book.author}</p>
          <div className="flex items-center justify-between">
            <Badge variant={book.available ? "default" : "secondary"}>
              {book.available ? "Tersedia" : "Dipinjam"}
            </Badge>
            <span className="text-sm text-gray-500">{book.year}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
