const MY_ACCOUNT_PATH = '/gbuk/s/my-account.html';
const LOG_OUT_PATH = '/gbuk/logout/index.html';

export const menuLinks = {
  homePage: {
    titleTag: 'my_account_summary',
    path: `${MY_ACCOUNT_PATH}#/`,
    icon: 'MyOrders',
    isActive: true
  },
  wishlist: {
    titleTag: 'wishlists_section_title',
    path: `${MY_ACCOUNT_PATH}#/:wishlist`,
    icon: 'Heart',
    isActive: true
  },
  userDetails: {
    titleTag: 'manage_my_details_title',
    path: `${MY_ACCOUNT_PATH}#/manage-your-details/personal-details`,
    icon: 'MyDetails',
    isActive: true
  },
  preferences: {
    titleTag: 'lets_update_you',
    path: `${MY_ACCOUNT_PATH}#/:preferences`,
    icon: 'Cog',
    isActive: true
  },
  questions: {
    titleTag: 'have_any_questions',
    path: `${MY_ACCOUNT_PATH}#/:questions`,
    icon: 'Help',
    isActive: true
  },
  signOut: {
    titleTag: 'sign_out',
    path: LOG_OUT_PATH,
    icon: 'SignOut',
    isActive: true,
    isExternal: true
  }
};
