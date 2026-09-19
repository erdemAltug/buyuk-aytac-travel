import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { requireAdmin } from '@/lib/requireAdmin';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();

    const { slug } = await params;
    const blogRaw = await Blog.findOne({ slug });

    if (!blogRaw) {
      return NextResponse.json(
        { success: false, message: 'Blog bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(blogRaw.toObject());
  } catch (error) {
    console.error('Blog detayı alınırken hata:', error);
    return NextResponse.json(
      { success: false, message: 'Blog detayı alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    await dbConnect();

    const { slug } = await params;
    const body = await req.json();

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

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    await dbConnect();

    const { slug } = await params;
    const blog = await Blog.findOneAndDelete({ slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Silinecek blog bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog başarıyla silindi',
    });
  } catch (error) {
    console.error('Blog silinirken hata:', error);
    return NextResponse.json(
      { success: false, message: 'Blog silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
