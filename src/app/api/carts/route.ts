import {
  addItem,
  Cart,
  deleteItem,
  getCollection,
  getItem,
  updateItem,
} from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (id) {
      const cart = await getItem<Cart>('carts', id);

      if (!cart) {
        return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
      }

      return NextResponse.json(cart);
    }

    // Get cart by user ID
    if (userId) {
      const carts = await getCollection<Cart>('carts');
      const userCart = carts.find((cart) => cart.userId === userId);

      if (!userCart) {
        return NextResponse.json(
          { error: 'Cart not found for this user' },
          { status: 404 }
        );
      }

      return NextResponse.json(userCart);
    }

    // Get all carts
    const carts = await getCollection<Cart>('carts');
    return NextResponse.json(carts);
  } catch (error) {
    console.error('Error retrieving carts:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve carts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if cart already exists for user
    if (body.userId) {
      const carts = await getCollection<Cart>('carts');
      const existingCart = carts.find((cart) => cart.userId === body.userId);

      if (existingCart) {
        return NextResponse.json(
          { error: 'User already has a cart', cartId: existingCart.id },
          { status: 400 }
        );
      }
    }

    // Generate ID if not provided
    if (!body.id) {
      const carts = await getCollection<Cart>('carts');
      body.id = `cart${carts.length + 1}`;
    }

    // Initialize empty cart if items not provided
    if (!body.items) {
      body.items = [];
    }

    // Calculate totals
    body.subtotal = body.items.reduce(
      (sum: number, item: { discountPrice: number; quantity: number }) =>
        sum + item.discountPrice * item.quantity,
      0
    );
    body.deliveryFee = body.subtotal > 100000 ? 0 : 100;
    body.platformFee = Math.ceil(body.subtotal * 0.01);
    body.total = body.subtotal + body.deliveryFee + body.platformFee;

    const newCart = await addItem<Cart>('carts', body);
    return NextResponse.json(newCart, { status: 201 });
  } catch (error) {
    console.error('Error creating cart:', error);
    return NextResponse.json(
      { error: 'Failed to create cart' },
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
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // If updating items, recalculate totals
    if (body.items) {
      body.subtotal = body.items.reduce(
        (sum: number, item: { discountPrice: number; quantity: number }) =>
          sum + item.discountPrice * item.quantity,
        0
      );
      body.deliveryFee = body.subtotal > 100000 ? 0 : 100;
      body.platformFee = Math.ceil(body.subtotal * 0.01);
      body.total = body.subtotal + body.deliveryFee + body.platformFee;
    }

    const updatedCart = await updateItem<Cart>('carts', id, body);

    if (!updatedCart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
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
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteItem('carts', id);

    if (!success) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting cart:', error);
    return NextResponse.json(
      { error: 'Failed to delete cart' },
      { status: 500 }
    );
  }
}
