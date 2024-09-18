import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';
import React from 'react';

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
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
