import prisma from "../../../shared/prisma"

const addToWishlist = async (userId: string, productId: string) => {
  let wishlist = await prisma.wishlist.findUnique({
    where: {
      userId,
    },
  })

  if (!wishlist) {
    wishlist = await prisma.wishlist.create({
      data: {
        userId,
      },
    })
  }

  const existingWishlistItem = await prisma.wishlistItem.findFirst({
    where: {
      wishlistId: wishlist.id,
      productId,
    },
  })

  if (existingWishlistItem) {
    return existingWishlistItem
  }

  const wishlistItem = await prisma.wishlistItem.create({
    data: {
      wishlistId: wishlist.id,
      productId,
    },
  })

  return wishlistItem
}

const getWishlistItems = async (userId: string) => {
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      userId,
    },
  })

  if (!wishlist) {
    return []
  }

  const wishlistItems = await prisma.wishlistItem.findMany({
    where: {
      wishlistId: wishlist.id,
    },
    include: {
      product: true,
    },
  })

  return wishlistItems
}

const removeWishlistItem = async (id: string) => {
  const wishlistItem = await prisma.wishlistItem.findUnique({
    where: {
      id,
    },
  })

  if (!wishlistItem) {
    return null
  }

  await prisma.wishlistItem.delete({
    where: {
      id,
    },
  })

  return wishlistItem
}

export const WishlistServices = {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
}
