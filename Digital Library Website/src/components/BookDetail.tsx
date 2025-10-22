import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookOpen, Heart, Download, Share2 } from 'lucide-react';
import { Book } from './BookCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookDetailProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
}

export function BookDetail({ book, open, onClose }: BookDetailProps) {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Buku</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
            <ImageWithFallback
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-4">oleh {book.author}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={book.available ? "default" : "secondary"}>
                  {book.available ? "Tersedia" : "Dipinjam"}
                </Badge>
                <Badge variant="outline">{book.category}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y">
              <div>
                <p className="text-sm text-gray-500">Tahun Terbit</p>
                <p>{book.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jumlah Halaman</p>
                <p>{book.pages} halaman</p>
              </div>
            </div>

            <div>
              <h3 className="mb-2">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">{book.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <Button className="flex-1" disabled={!book.available}>
                <BookOpen className="mr-2 h-4 w-4" />
                {book.available ? "Pinjam Buku" : "Tidak Tersedia"}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
