import { prisma } from '@/app/lib/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { account, email, signedToken } = await req.json();

    const user = await prisma.user.upsert({
      //업데이트,크리에이트를 같이 사용할수있음
      where: { account },
      update: { signedToken },
      create: {
        account,
        email,
        signedToken,
      },
      select: {
        account: true,
        email: true,
        nickname: true,
        signedToken: true,
      },
    });

    // console.log('Work!!!');
    return NextResponse.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
};
