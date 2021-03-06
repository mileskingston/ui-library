export const loadBitmasks = {
  CONFIGURATION: 1,
  USER_DETAILS: 2,
  ORDERS: 4,
  ORDER_DETAILS: 8,
  WISHLISTS: 16,
  ARCHIVED_ORDERS: 32
};

export const saveBitmasks = {
  PERSONAL_DETAILS: 1,
  EMAIL: 2,
  PASSWORD: 4,
  DELIVERY_ADDRESS: 8,
  BILLING_ADDRESS: 16,
  PREFERENCES: 32,
  WISHLIST_ITEM_ADD: 128,
  WISHLIST_ITEM_REMOVE: 256,
  EMAIL_ME_WHEN_BACK: 512,
  EMAIL_RECOGNITION: 1024,
  REGISTRATION: 2048,
  SIGN_IN: 4096,
  RESET_PASSWORD: 8192,
  PRICE_DROP_TOGGLE: 16384,
  ITEM_AVAILABILITY: 32768
};
