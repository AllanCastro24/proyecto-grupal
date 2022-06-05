import { Menu } from './menu.model';

export const horizontalMenuItems = [
  // new Menu(1, 'NAV.HOME', '/', null, null, false, 0),
  // new Menu(2, 'MENU', '/menu', null, null, false, 0),
  // new Menu(10, 'NAV.PAGES', null, null, null, true, 0),
  // new Menu(11, 'RESERVATION', '/reservation', null, null, false, 10),
  // new Menu(12, 'NAV.CHEFS', '/chefs', null, null, false, 10),
  // new Menu(13, 'NAV.CHEF', '/chefs/1', null, null, false, 10),
  // new Menu(20, 'ACCOUNT', null, null, null, true, 10),
  // new Menu(21, 'LOGIN', '/login', null, null, false, 20),
  // new Menu(22, 'REGISTER', '/register', null, null, false, 20),
  // new Menu(40, 'NAV.SHOP', null, null, null, true, 10),
  // new Menu(41, 'NAV.SINGLE_MENU', '/menu/17', null, null, false, 40),
  // new Menu(42, 'NAV.CART', '/cart', null, null, false, 40),
  // new Menu(43, 'NAV.CHECKOUT', '/checkout', null, null, false, 40),
  // new Menu(60, 'FAQs', '/faq', null, null, false, 10),
  // new Menu(62, 'NAV.TERMS_CONDITIONS', '/terms-conditions', null, null, false, 10),
  // new Menu(63, 'Landing', '/landing', null, null, false, 10),
  // new Menu(64, '404 Page', '/404', null, null, false, 10),
  // new Menu(70, 'NAV.CONTACT', '/contact', null, null, false, 0),
  // new Menu(80, 'NAV.ABOUT_US', '/about', null, null, false, 0),
  // new Menu(90, 'NAV.ADMIN', '/admin', null, null, false, 0),
  // new Menu(140, 'NAV.OTHERS', null, null, null, true, 10),
  // new Menu(141, 'NAV.EXTERNAL_LINK', null, 'http://themeseason.com', '_blank', false, 140),
  // new Menu(142, 'NAV.MENU_ITEM', null, '/', '_blank', false, 140),
  // new Menu(143, 'NAV.MENU_ITEM', null, '/', '_blank', false, 140),
  // new Menu(144, 'NAV.MENU_ITEM', null, '/', '_blank', false, 140),
];

export const verticalMenuItems = [
  new Menu(2, 'NAV.HOME', 'table_restaurant', '/tables', null, null, false, 0),
  // new Menu(3, 'SEARCH', 'manage_search', '/categories', null, null, false, 0),
  // new Menu(4, 'CARTS', 'shopping_cart', '/cart', null, null, false, 0),
  new Menu(5, 'ACCOUNT', 'person', '/account', null, null, false, 0),
  //   new Menu(5, 'ACCOUNT', '/menu', null, null, false, 0),
];
