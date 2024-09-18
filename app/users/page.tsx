import UserForm from '@/components/UserForm';
import React from 'react';
import DataTableSimple from './data-table-simple';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';

const Users = async () => {
  // Get the user's session
  const session = await getServerSession(options);

  // Check if the user is an admin
  if (session?.user.role !== 'ADMIN') {
    // If they are not, return an error message
    return (
      <p className="text-destructive">
        You must have admin access to view this page.
      </p>
    );
  }

  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;
