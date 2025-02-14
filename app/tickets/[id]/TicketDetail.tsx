import { Ticket, User } from '@prisma/client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import ReactMarkDown from 'react-markdown';
import DeleteButton from './DeleteButton';
import AssignTicket from '@/components/AssignTicket';

interface Props {
  ticket: Ticket;
  users: User[];
}

const TicketDetail = ({ ticket, users }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex gap-6 mb-4 justify-between">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>

          <CardTitle className="text-xl">{ticket.title}</CardTitle>
          <CardDescription>
            Created:{' '}
            {ticket.createdAt.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>

        <CardContent className="prose dark:prose-invert">
          <ReactMarkDown>{ticket.description}</ReactMarkDown>
        </CardContent>
        <CardFooter>
          Updated:{' '}
          {ticket.updatedAt.toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div>
        <div className="mx-4 flex justify-center lg:flex-col lg:mx-0 gap-2">
          <AssignTicket ticket={ticket} users={users}/>
          <Link
            href={`/tickets`}
            className={`${buttonVariants({
              variant: 'default',
            })}`}
          >
            Back
          </Link>
          <Link
            href={`/tickets/edit/${ticket.id}`}
            className={`${buttonVariants({
              variant: 'default',
            })}`}
          >
            Edit Ticket
          </Link>
          <DeleteButton ticketId={ticket.id}/>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
