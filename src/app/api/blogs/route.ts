import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

// GET /api/blogs - Tüm blogları getir
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const limit = searchParams.get('limit');

    // Filtre oluşturma
    const filter: Record<string, unknown> = {};
    
    // Kategori filtreleme
    if (category) {
      filter.categories = { $in: [category] };
    }
    
    // Yayın durumu filtreleme
    if (published === 'true') {
      filter.isPublished = true;
    } else if (published === 'false') {
      filter.isPublished = false;
    }

    // Blog sorgusunu oluştur
    let query = Blog.find(filter).sort({ publishDate: -1 });
    
    // Eğer limit parametresi varsa, sadece belirli sayıda blog getir
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        query = query.limit(limitNum);
      }
    }

    // Blogları getir
    const blogs = await query.lean();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Blog verileri alınırken hata:', error);
    return NextResponse.json(
      { success: false, message: 'Bloglar alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Yeni blog ekle
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Eğer slug verilmemişse, başlıktan otomatik oluştur
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    const blog = await Blog.create(body);
    
    return NextResponse.json(
      { success: true, data: blog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Blog oluşturulurken hata:', error);
    return NextResponse.json(
      { success: false, message: 'Blog oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 