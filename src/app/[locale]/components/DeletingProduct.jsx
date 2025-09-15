"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function DeletingProduct({ product }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/updatingProducts/${product.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast("Product deleted successfully");
        setOpen(false);
      } else {
        const errData = await res.json();
        toast(`Delete failed ${errData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 p-5">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action will permanently delete the product.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 " onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
