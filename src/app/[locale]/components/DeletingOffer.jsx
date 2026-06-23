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
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeletingOffer({ offer }) {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/offers/${offer.id}`, { method: "DELETE" });
            if (res.ok) {
                toast("Offer deleted successfully");
                setOpen(false);
                window.location.reload();
            } else {
                toast("Failed to delete offer");
            }
        } catch {
            toast("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Delete offer">
                    <RiDeleteBin6Line className="w-5 h-5" />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Offer</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong>{offer.title}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
