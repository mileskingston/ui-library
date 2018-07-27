import paths from './paths';

export default {
  homePage: {
    titleTag: 'my_account_summary',
    path: `${paths.MY_ACCOUNT_PATH}#/`,
    icon: 'MyOrders',
    isActive: true,
    qa: 'your-orders-option',
    dataInteraction: 'Main Header: Account: Orders'
  },
  wishlist: {
    titleTag: 'wishlists_section_title',
    path: `${paths.MY_ACCOUNT_PATH}#/:wishlist`,
    icon: 'Heart',
    isActive: true,
    classes: ['ab-test-hidden'],
    qa: 'wishlist-option',
    dataInteraction: 'Main Header: Account: Save for Later List'
  },
  userDetails: {
    titleTag: 'manage_my_details_title',
    path: `${paths.MY_ACCOUNT_PATH}#/manage-your-details/personal-details`,
    icon: 'MyDetails',
    isActive: true,
    qa: 'manage-your-details-option',
    dataInteraction: 'Main Header: Account: Manage Details'
  },
  preferences: {
    titleTag: 'lets_update_you',
    path: `${paths.MY_ACCOUNT_PATH}#/:preferences`,
    icon: 'Cog',
    isActive: true,
    qa: 'keep-up-to-date-option',
    dataInteraction: 'Main Header: Account: Manage Communications'
  },
  questions: {
    titleTag: 'have_any_questions',
    path: `${paths.MY_ACCOUNT_PATH}#/:questions`,
    icon: 'Help',
    isActive: true,
    qa: 'questions-option',
    dataInteraction: 'Main Header: Account: Find Information'
  },
  signOut: {
    titleTag: 'sign_out',
    path: paths.LOG_OUT_PATH,
    icon: 'SignOut',
    isActive: true,
    isExternal: true,
    qa: 'sign-out-option',
    dataInteraction: 'Main Header: Account: Sign Out'
  }
};
