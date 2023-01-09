import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { survey } from './global'

export const dbZodType = {
  firstname: z.string(),
  surname: z.string(),
  email: z.string(),
  tel: z.string(),
  gender: z.string(),
  birthday: z.string(),
  comment: z.string(),
}

export async function list() {
  const data = await survey.findAll()
  return JSON.stringify(data.map((survey) => survey.dataValues))
}

export async function create(entry: {
  input: { 
    firstname: string; 
    surname: string; 
    email: string;
    tel: string;
    gender: string;
    birthday: string;
    comment: string }
}) {
  const { firstname, surname, email, tel, gender, birthday, comment } = entry.input
  try {
    await survey.create({
      firstname,
      surname,
      email,
      tel,
      gender,
      birthday,
      comment,
    })
  } catch (e) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred, please try again later.',
      // optional: pass the original error to retain stack trace
      cause: e,
    })
  }
  return 'success'
}
