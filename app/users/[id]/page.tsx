import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';
import React from 'react';
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  // Get the user's session
  const session = await getServerSession(options);

  // Ensure the user is an admin before allowing them to edit another user.
  if (session?.user.role !== 'ADMIN') {
    // If the user is not an admin, display an error message.
    return (
      <p className="text-destructive">
        You must be an administrator to edit other users.
      </p>
    );
  }

  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return <p className="text-destructive">Invalid user ID!</p>;
  }

  const user = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return <p className="text-destructive">User not found!</p>;
  }

  user.password = '';
  return <UserForm user={user} />;
};

export default EditUser;
