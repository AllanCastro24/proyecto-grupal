import { Menu } from './menu.model'; 

export const menuItems = [ 
    new Menu (10, 'ADMIN_NAV.DASHBOARD', '/admin', null, 'dashboard', null, false, 0),
    new Menu (18, 'TIENDAS-SUCURSALES', null, null, 'store', null, true, 0), //====================================TIENDASSUCURSAKES
    new Menu (19, 'ALMACEN', null, null, 'storage', null, true, 0), //====================================PRODUCTOS
    //new Menu (19, 'New', null, null, 'storage', null, true, 0), //====================================PRODUCTOS
    new Menu (20, 'ADMIN_NAV.MENU_ITEMS', null, null, 'grid_on', null, true, 0),  
    new Menu (21, 'ADMIN_NAV.CATEGORIES', '/admin/menu-items/categories', null, 'category', null, false, 20), 
    new Menu (22, 'ADMIN_NAV.MENU_ITEMS_LIST', '/admin/menu-items/list', null, 'list', null, false, 20), 
    /* new Menu (23, 'ADMIN_NAV.CATEGORIES', '/admin/menu-items/detail', null, 'add_circle_outline', null, false, 20), */  
    new Menu (24, 'ADMIN_NAV.ADD_MENU_ITEM', '/admin/menu-items/add', null, 'add_circle_outline', null, false, 20), 
    new Menu (30, 'ADMIN_NAV.SALES', null, null, 'monetization_on', null, true, 0),  
    new Menu (31, 'ADMIN_NAV.ORDERS', '/admin/sales/orders', null, 'list_alt', null, false, 30), 
    new Menu (32, 'ADMIN_NAV.TRANSACTIONS', '/admin/sales/transactions', null, 'local_atm', null, false, 30),  
    new Menu (40, 'ADMIN_NAV.USERS', '/admin/users', null, 'group_add', null, false, 0), 
    new Menu (45, 'ADMIN_NAV.RESERVATIONS', '/admin/reservations', null, 'event', null, false, 0),  
    new Menu (50, 'ADMIN_NAV.CUSTOMERS', '/admin/customers', null, 'supervisor_account', null, false, 0),  
    new Menu (60, 'ADMIN_NAV.COUPONS', '/admin/coupons', null, 'card_giftcard', null, false, 0),  
    new Menu (70, 'ADMIN_NAV.WITHDRAWAL', '/admin/withdrawal', null, 'credit_card', null, false, 0), 
    new Menu (80, 'ADMIN_NAV.ANALYTICS', '/admin/analytics', null, 'multiline_chart', null, false, 0), 
    new Menu (90, 'ADMIN_NAV.REFUND', '/admin/refund', null, 'restore', null, false, 0),  
    new Menu (100, 'ADMIN_NAV.FOLLOWERS', '/admin/followers', null, 'follow_the_signs', null, false, 0), 
    new Menu (110, 'ADMIN_NAV.SUPPORT', '/admin/support', null, 'support', null, false, 0), 
    new Menu (120, 'ADMIN_NAV.REVIEWS', '/admin/reviews', null, 'insert_comment', null, false, 0), 
    new Menu (119, 'Gastos fijos', null, null, 'monetization_on', null, true, 0),
    new Menu (121, 'Gastos fijos', '/admin/fixed-costs', null, 'monetization_on', null, false, 119),    
    new Menu (123, 'Programacion de gastos fijos', '/admin/scheduled-fixed-expenses', null, 'monetization_on', null, false, 119),
    new Menu (122, 'Tipos de gastos fijos', '/admin/types-fixed-costs', null, 'monetization_on', null, false, 119),
    new Menu (130, 'Reportes', null, null, 'multiline_chart', null, true, 0),  
    new Menu (131, 'Reportes ventas', '/admin/reports/reports-sales', null, 'list_alt', null, false, 130), 
    new Menu (132, 'Reportes de almacen', '/admin/reports/reports-stock', null, 'list_alt', null, false, 130),  
    new Menu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    new Menu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    new Menu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    new Menu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    new Menu (144, 'Level 5', null, '/', 'link', null, false, 143),
    new Menu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0),


    new Menu (701, 'TIENDAS', '/admin/tiendas-sucursales/tiendas', null, 'assignment', null, false, 18),
    new Menu (702, 'Sucursales', '/admin/tiendas-sucursales/sucursales', null, 'assignment', null, false, 18),
    //================================================PRODUCTOS====================================================================
    new Menu (301, 'Almacen', '/admin/products-items/list-storage', null, 'assignment', null, false, 19),
    new Menu (302, 'Agregar Insumos', '/admin/products-items/add', null, 'add_circle_outline', null, false, 19), 
    new Menu (303, 'Listar Insumos', '/admin/products-items/list', null, 'format_list_bulleted', null, false, 19),
    new Menu (304, 'Categorias Insumos', '/admin/products-items/categorias-productos', null, 'category', null, false, 19),
    new Menu (305, 'Unidad de Medida', '/admin/products-items/unidad-medida', null, 'straighten', null, false, 19),
    new Menu (306, 'Tipo de Pago', '/admin/products-items/Tipo-Pago', null, 'payment', null, false, 19),
    new Menu (307, 'Mermas', '/admin/products-items/Mermas', null, 'exit_to_app', null, false, 19),
    new Menu (308, 'Agregar Proveedor', '/admin/products-items/Add-Proveedor', null, 'people', null, false, 19),
    new Menu (309, 'Listar Proveedores', '/admin/products-items/Listar-Proveedores', null, 'list_alt', null, false, 19),
    new Menu (310, 'Stock Minimo', '/admin/products-items/Stock-Min', null, 'info', null, false, 19),
    
]