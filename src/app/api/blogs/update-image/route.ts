import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { requireAdmin } from '@/lib/requireAdmin';

export async function POST(req: NextRequest) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    await dbConnect();

    const body = await req.json();
    const { slug, imageUrl } = body;

    if (!slug || !imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Slug ve imageUrl zorunludur' },
        { status: 400 }
      );
    }

    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $set: { image: imageUrl } },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, message: `"${slug}" slug'ına sahip blog bulunamadı` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog görseli başarıyla güncellendi',
      data: blog,
    });
  } catch (error) {
    console.error('Blog görseli güncellenirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Blog görseli güncellenirken bir hata oluştu',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
