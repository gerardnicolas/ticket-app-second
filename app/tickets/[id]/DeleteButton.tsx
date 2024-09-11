'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const DeleteButton = ({ ticketId }: { ticketId: number }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const deleteTicket = async () => {
    try {
      setIsDeleting(true);
      await axios.delete('/api/tickets/' + ticketId);
      router.push('/tickets');
      router.refresh();
      toast({
        variant: 'destructive',
        description: 'Your ticket has been deleted.',
      });
    } catch (error) {
      setIsDeleting(false);
      setError('Unknown error occured.');
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          className={`${buttonVariants({ variant: 'destructive' })} w-full`}
          disabled={isDeleting}
        >
          Delete Ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`This action cannot be undone. This will permanently delete your
              ticket.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={`${buttonVariants({ variant: 'destructive' })}`}
              disabled={isDeleting}
              onClick={deleteTicket}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </div>
  );
};

export default DeleteButton;
