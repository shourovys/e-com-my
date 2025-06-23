import {
  addItem,
  deleteItem,
  getCollection,
  getItem,
  ProductCategory,
  updateItem,
} from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const productCategory = await getItem<ProductCategory>(
        'product-categories',
        id
      );

      if (!productCategory) {
        return NextResponse.json(
          { error: 'Product category not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(productCategory);
    }

    const productCategories = await getCollection<ProductCategory>(
      'product-categories'
    );
    return NextResponse.json(productCategories);
  } catch (error) {
    console.error('Error retrieving product categories:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve product categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProductCategory = await addItem<ProductCategory>(
      'product-categories',
      body
    );
    return NextResponse.json(newProductCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating product category:', error);
    return NextResponse.json(
      { error: 'Failed to create product category' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product category ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updatedProductCategory = await updateItem<ProductCategory>(
      'product-categories',
      id,
      body
    );

    if (!updatedProductCategory) {
      return NextResponse.json(
        { error: 'Product category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProductCategory);
  } catch (error) {
    console.error('Error updating product category:', error);
    return NextResponse.json(
      { error: 'Failed to update product category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product category ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteItem('product-categories', id);

    if (!success) {
      return NextResponse.json(
        { error: 'Product category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product category:', error);
    return NextResponse.json(
      { error: 'Failed to delete product category' },
      { status: 500 }
    );
  }
}
