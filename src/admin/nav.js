import {
  LayoutDashboard, Package, ShoppingBag, CalendarDays, Users, Boxes, BarChart3, UserCog
} from 'lucide-react';

export const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Staff'] },
  { id: 'products', label: 'Products', icon: Package, roles: ['Admin'] },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, roles: ['Admin'] },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays, roles: ['Admin', 'Staff'] },
  { id: 'customers', label: 'Customers & CRM', icon: Users, roles: ['Admin', 'Staff'] },
  { id: 'inventory', label: 'Inventory', icon: Boxes, roles: ['Admin'] },
  { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['Admin'] },
  { id: 'staff', label: 'Staff Management', icon: UserCog, roles: ['Admin'] }
];

export const canAccess = (role, id) => !!NAV.find((n) => n.id === id && n.roles.includes(role));
