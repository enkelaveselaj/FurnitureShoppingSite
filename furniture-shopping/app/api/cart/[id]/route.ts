import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import CartItem from "@/models/CartItem";

// PUT - Update item quantity
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user || !("id" in session.user)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const { id } = await params;
    const { quantity } = await req.json();

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { message: "Invalid quantity" },
        { status: 400 }
      );
    }

    await connectDB();

    const cartItem = await CartItem.findOne({
      _id: id,
      userId,
    });

    if (!cartItem) {
      return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return NextResponse.json({ message: "Quantity updated" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { message: "Failed to update quantity" },
      { status: 500 }
    );
  }
}

// DELETE - Remove item from cart
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user || !("id" in session.user)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { id } = await params;

    await connectDB();

    const result = await CartItem.deleteOne({
      _id: id,
      userId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return NextResponse.json(
      { message: "Failed to remove item" },
      { status: 500 }
    );
  }
}
