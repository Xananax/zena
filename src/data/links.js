import { galleries } from './galleries' 

export const links = [
  { children:'Works', to:'/gallery', className:'main' },
  ...galleries.map(([children,to])=>({ children, to:`/gallery/${to}`, className:'small' })),
  { children:'Press', to:'/press', className:'main'},
  { children:'Exhibitions', to:'/events', className:'main'},
  { children:'Zena', to:'/articles/zena', className:'main'},
  { children:'Contact', to:'/articles/contact', className:'main'},
].map(item=>({...item,key:item.to}))