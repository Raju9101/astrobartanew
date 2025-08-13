
// This is a new file created by App Prototyper.
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({
  children,
  open,
  onOpenChange,
}: CartDrawerProps) {
    const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
    
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold">
            Shopping cart
          </SheetTitle>
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm truncate pr-4">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Regular</p>
                       <div className="flex items-baseline gap-2 mt-1">
                            <p className="text-sm font-semibold text-red-600">Rs. {item.price.toFixed(2)}</p>
                       </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                           <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>Remove</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
               <div className="p-4 border-t">
                    <h3 className="font-semibold mb-2">Customers also bought</h3>
                    <div className="flex items-center gap-2">
                        <Image src="https://placehold.co/200x200.png" alt="Recommended product" width={60} height={60} className="rounded-md" data-ai-hint="jewelry box" />
                    </div>
               </div>
            </ScrollArea>
            <div className="p-4 border-t space-y-4 bg-gray-50">
                <p className="text-xs text-muted-foreground">Tax included. <Link href="#" className="underline">Shipping</Link> calculated at checkout.</p>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-xs">I agree with the <Link href="#" className="underline">terms and conditions</Link></Label>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="lg">View cart</Button>
                    <Button size="lg" className="bg-black text-white hover:bg-black/90">
                        <span>BUY NOW</span>
                        {/* Placeholder for payment icons */}
                    </Button>
                </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <p className="font-semibold text-lg">Your cart is empty</p>
            <p className="text-muted-foreground mt-2">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="mt-6"
              asChild
            >
                <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
