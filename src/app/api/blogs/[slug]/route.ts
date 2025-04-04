import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

interface Params {
  params: {
    slug: string;
  };
}

// GET /api/blogs/[slug] - Belirli bir blogu getir
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    
    const { slug } = params;
    const blog = await Blog.findOne({ slug }).lean();
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Blog detayı alınırken hata:', error);
    return NextResponse.json(
      { success: false, message: 'Blog detayı alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[slug] - Blogu güncelle
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    
    const { slug } = params;
    const body = await req.json();
    
    // Slug değiştirilmek isteniyorsa, format kontrolü yap
    if (body.slug && body.slug !== slug) {
      body.slug = body.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Güncellenecek blog bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Blog güncellenirken hata:', error);
    return NextResponse.json(
      { success: false, message: 'Blog güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[slug] - Blogu sil
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    
    const { slug } = params;
    const blog = await Blog.findOneAndDelete({ slug });
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Silinecek blog bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Blog başarıyla silindi' }
    );
  } catch (error) {
    console.error('Blog silinirken hata:', error);
    return NextResponse.json(
      { success: false, message: 'Blog silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 