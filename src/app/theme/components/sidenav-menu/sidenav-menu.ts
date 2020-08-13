import { SidenavMenu } from './sidenav-menu.model';

export const sidenavMenuItems = [ 
    new SidenavMenu (1, 'Products', '/products', null, null, null, false, 0),
    new SidenavMenu (2, 'Services',null, null, null, null, true, 0), 
    new SidenavMenu (10, 'Business Services', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Communication', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Construction & Engineering', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Distribution', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Education', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Environmentals', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Finance', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Tourism', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Health', '/products', {services:true}, null, null, false, 2),   
    new SidenavMenu (10, 'Recreation', '/products', {services:true}, null, null, false, 2),  
    new SidenavMenu (10, 'Transportation', '/products', {services:true}, null, null, false, 2),  
    new SidenavMenu (3, 'Partners', '/partners', null, null, null, false, 0), 
    new SidenavMenu (4, 'About', '/about-us', null, null, null, false, 0),
    new SidenavMenu (5, 'Manufactures', '/learn/manufactures', null,  null, null, false, 0), 
    new SidenavMenu (6, 'Wholesalers', '/learn/wholesalers', null,  null, null, false, 0),
    new SidenavMenu (7, 'Retailers & Stores', '/learn/retailers-and-stores', null, null, null, false, 0), 
    new SidenavMenu (8, 'Services Providers', '/learn/services-providers', null, null, null, false, 0),
    new SidenavMenu (9, 'Concierge Managers', '/learn/concierge-managers', null, null, null, false, 0), 
    new SidenavMenu (11, 'Regional Managers', '/learn/regional-managers', null, null, null, false, 0),

]