import prisma from "../../../shared/prisma"

const subscribeToNewsletter = async (email: string) => {
  const subscriber = await prisma.newsLetter.create({
    data: {
      email,
    },
  })
  return subscriber
}

const unSubscribeFromNewsletter = async (email: string) => {
  const subscriber = await prisma.newsLetter.delete({
    where: {
      email,
    },
  })
  return subscriber
}

const getAllSubscribers = async (query: any) => {
  const { page = 1, limit = 10 } = query
  const skip = (page - 1) * limit
  const take = limit

  const whereConditions: any = {}

  const totalSubscribers = await prisma.newsLetter.count({
    where: whereConditions,
  })

  const subscribers = await prisma.newsLetter.findMany({
    skip,
    take,
    where: whereConditions,
  })

  return subscribers
}

const getSubscriberById = async (id: string) => {
  const subscriber = await prisma.newsLetter.findUnique({
    where: {
      id,
    },
  })
  return subscriber
}

const updateSubscriber = async (id: string, email: string) => {
  const subscriber = await prisma.newsLetter.update({
    where: {
      id,
    },
    data: {
      email,
    },
  })
  return subscriber
}

const deleteSubscriber = async (id: string) => {
  const subscriber = await prisma.newsLetter.delete({
    where: {
      id,
    },
  })
  return subscriber
}

export const NewsletterServices = {
  subscribeToNewsletter,
  unSubscribeFromNewsletter,
  getAllSubscribers,
  getSubscriberById,
  updateSubscriber,
  deleteSubscriber,
}
