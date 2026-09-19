import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { requireAdmin } from '@/lib/requireAdmin';

type RouteSegmentProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteSegmentProps
) {
  try {
    await dbConnect();

    const { slug } = await params;

    const destination = await Destination.findOne({ slug });

    if (!destination) {
      return NextResponse.json(
        { error: 'Destinasyon bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Destination GET Error:', error);
    return NextResponse.json(
      { error: 'Destinasyonu getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteSegmentProps
) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    await dbConnect();

    const { slug } = await params;
    const body = await request.json();

    if (!body.name || !body.description || !body.image) {
      return NextResponse.json(
        { error: 'İsim, açıklama ve görsel zorunludur' },
        { status: 400 }
      );
    }

    const destination = await Destination.findOne({ slug });

    if (!destination) {
      return NextResponse.json(
        { error: 'Destinasyon bulunamadı' },
        { status: 404 }
      );
    }

    if (body.name !== destination.name) {
      const newSlug = body.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

      const existingDestination = await Destination.findOne({ slug: newSlug });

      if (
        existingDestination &&
        String(existingDestination._id) !== String(destination._id)
      ) {
        return NextResponse.json(
          { error: 'Bu isimle bir destinasyon zaten mevcut' },
          { status: 400 }
        );
      }
    }

    destination.name = body.name;
    destination.description = body.description;
    destination.image = body.image;
    destination.isActive =
      body.isActive !== undefined ? body.isActive : destination.isActive;

    await destination.save();

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Destination PUT Error:', error);
    return NextResponse.json(
      { error: 'Destinasyonu güncellerken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteSegmentProps
) {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    await dbConnect();

    const { slug } = await params;

    const destination = await Destination.findOneAndDelete({ slug });

    if (!destination) {
      return NextResponse.json(
        { error: 'Destinasyon bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Destinasyon başarıyla silindi',
    });
  } catch (error) {
    console.error('Destination DELETE Error:', error);
    return NextResponse.json(
      { error: 'Destinasyonu silirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
