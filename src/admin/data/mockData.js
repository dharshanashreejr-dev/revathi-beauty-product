// All figures are sample / demo data. No real customers, payments or accounting.

export const USERS = [
  { email: 'admin@maisonbloom.demo', password: 'Bloom@123', role: 'Admin', name: 'Ananya Iyer', title: 'Operations Head' },
  { email: 'staff@maisonbloom.demo', password: 'Staff@123', role: 'Staff', name: 'Meera Nair', title: 'Front Desk Associate' }
];

export const CATEGORIES = ['Serum', 'Moisturiser', 'Hair Care', 'Perfume', 'Skincare Kit', 'Body Care'];
export const PRODUCT_STATUSES = ['Active', 'Draft', 'Out of Stock'];
export const LOW_STOCK = 10;

const palette = [
  ['#e8c9c1', '#c98f84'], ['#d9e2d4', '#7f9a7b'], ['#efe2cf', '#c9a24a'],
  ['#e2d6e0', '#9a7a95'], ['#d6e4e3', '#6f9694'], ['#f1d9cf', '#c27a63']
];
export const swatch = (i) => palette[i % palette.length];

export const INITIAL_PRODUCTS = [
  { id: 'MB-1001', name: 'Rose Petal Radiance Serum', category: 'Serum', price: 2450, stock: 42, capacity: 60, status: 'Active', description: 'Vitamin C and rose extract serum for an even, luminous tone.' },
  { id: 'MB-1002', name: 'Hyaluronic Dew Moisturiser', category: 'Moisturiser', price: 1890, stock: 36, capacity: 60, status: 'Active', description: 'Lightweight gel-cream with triple hyaluronic acid.' },
  { id: 'MB-1003', name: 'Botanical Repair Hair Mask', category: 'Hair Care', price: 1350, stock: 8, capacity: 50, status: 'Active', description: 'Deep conditioning mask with amla, hibiscus and argan oil.' },
  { id: 'MB-1004', name: 'Oud and Jasmine Eau de Parfum', category: 'Perfume', price: 4999, stock: 15, capacity: 30, status: 'Active', description: 'Warm woody floral fragrance, 50 ml.' },
  { id: 'MB-1005', name: 'Glow Ritual Skincare Kit', category: 'Skincare Kit', price: 5800, stock: 0, capacity: 25, status: 'Out of Stock', description: 'Cleanser, serum, moisturiser and mask gift set.' },
  { id: 'MB-1006', name: 'Saffron Night Repair Cream', category: 'Moisturiser', price: 3200, stock: 22, capacity: 40, status: 'Active', description: 'Overnight cream with kesar and bakuchiol.' },
  { id: 'MB-1007', name: 'Niacinamide Clarity Serum', category: 'Serum', price: 1650, stock: 5, capacity: 50, status: 'Active', description: 'Pore refining serum with 10 percent niacinamide.' },
  { id: 'MB-1008', name: 'Sandalwood Body Butter', category: 'Body Care', price: 1250, stock: 28, capacity: 40, status: 'Active', description: 'Rich body butter with Mysore sandalwood and shea.' },
  { id: 'MB-1009', name: 'Coconut Scalp Revival Oil', category: 'Hair Care', price: 990, stock: 60, capacity: 80, status: 'Draft', description: 'Cold pressed coconut and curry leaf scalp oil.' },
  { id: 'MB-1010', name: 'Pearl Brightening Eye Cream', category: 'Skincare Kit', price: 2150, stock: 9, capacity: 30, status: 'Active', description: 'Caffeine and pearl powder eye treatment.' }
];

export const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
export const PAYMENT_STATUSES = ['Paid', 'Pending', 'Failed'];

export const INITIAL_ORDERS = [
  { id: 'ORD-5001', customerId: 'C-001', customer: 'Priya Venkatesh', date: '2026-10-08', items: [{ productId: 'MB-1001', qty: 1 }, { productId: 'MB-1002', qty: 1 }], payment: 'Paid', status: 'Processing', address: 'Anna Nagar, Chennai 600040' },
  { id: 'ORD-5002', customerId: 'C-002', customer: 'Rahul Menon', date: '2026-10-08', items: [{ productId: 'MB-1004', qty: 1 }], payment: 'Paid', status: 'Shipped', address: 'Indiranagar, Bengaluru 560038' },
  { id: 'ORD-5003', customerId: 'C-003', customer: 'Sneha Kulkarni', date: '2026-10-07', items: [{ productId: 'MB-1006', qty: 1 }, { productId: 'MB-1008', qty: 2 }], payment: 'Pending', status: 'Pending', address: 'Koregaon Park, Pune 411001' },
  { id: 'ORD-5004', customerId: 'C-004', customer: 'Arjun Reddy', date: '2026-10-06', items: [{ productId: 'MB-1007', qty: 2 }], payment: 'Paid', status: 'Delivered', address: 'Jubilee Hills, Hyderabad 500033' },
  { id: 'ORD-5005', customerId: 'C-005', customer: 'Divya Subramanian', date: '2026-10-06', items: [{ productId: 'MB-1005', qty: 1 }], payment: 'Paid', status: 'Delivered', address: 'RS Puram, Coimbatore 641002' },
  { id: 'ORD-5006', customerId: 'C-006', customer: 'Karthik Raman', date: '2026-10-05', items: [{ productId: 'MB-1003', qty: 2 }, { productId: 'MB-1009', qty: 1 }], payment: 'Failed', status: 'Cancelled', address: 'Adyar, Chennai 600020' },
  { id: 'ORD-5007', customerId: 'C-007', customer: 'Lakshmi Narayanan', date: '2026-10-04', items: [{ productId: 'MB-1001', qty: 2 }, { productId: 'MB-1010', qty: 1 }], payment: 'Paid', status: 'Shipped', address: 'Salem Main Road, Salem 636007' },
  { id: 'ORD-5008', customerId: 'C-008', customer: 'Vikram Shah', date: '2026-10-03', items: [{ productId: 'MB-1004', qty: 2 }], payment: 'Paid', status: 'Delivered', address: 'Bandra West, Mumbai 400050' },
  { id: 'ORD-5009', customerId: 'C-009', customer: 'Nandini Rao', date: '2026-10-02', items: [{ productId: 'MB-1002', qty: 3 }], payment: 'Pending', status: 'Processing', address: 'Whitefield, Bengaluru 560066' },
  { id: 'ORD-5010', customerId: 'C-010', customer: 'Harish Gupta', date: '2026-10-01', items: [{ productId: 'MB-1008', qty: 1 }, { productId: 'MB-1006', qty: 1 }], payment: 'Paid', status: 'Delivered', address: 'Salt Lake, Kolkata 700091' }
];

export const SERVICES = [
  { name: 'Signature Glow Facial', duration: 60, price: 3500 },
  { name: 'Botanical Hair Spa', duration: 90, price: 2800 },
  { name: 'Bridal Skin Consultation', duration: 45, price: 1500 },
  { name: 'Relaxing Aromatherapy', duration: 75, price: 3200 },
  { name: 'Deep Cleansing Facial', duration: 60, price: 2400 }
];
export const APPOINTMENT_STATUSES = ['Pending', 'Confirmed', 'Checked In', 'Completed', 'Cancelled'];
export const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export const TODAY = '2026-10-09';

export const INITIAL_APPOINTMENTS = [
  { id: 'APT-3001', customerId: 'C-001', customer: 'Priya Venkatesh', service: 'Signature Glow Facial', date: '2026-10-09', time: '10:00', specialistId: 'S-002', status: 'Confirmed', notes: 'Sensitive skin, avoid strong acids.' },
  { id: 'APT-3002', customerId: 'C-005', customer: 'Divya Subramanian', service: 'Bridal Skin Consultation', date: '2026-10-09', time: '11:00', specialistId: 'S-002', status: 'Checked In', notes: 'Wedding in December.' },
  { id: 'APT-3003', customerId: 'C-003', customer: 'Sneha Kulkarni', service: 'Botanical Hair Spa', date: '2026-10-09', time: '13:00', specialistId: 'S-003', status: 'Pending', notes: '' },
  { id: 'APT-3004', customerId: 'C-007', customer: 'Lakshmi Narayanan', service: 'Relaxing Aromatherapy', date: '2026-10-09', time: '15:00', specialistId: 'S-005', status: 'Confirmed', notes: 'Prefers lavender oil.' },
  { id: 'APT-3005', customerId: 'C-009', customer: 'Nandini Rao', service: 'Deep Cleansing Facial', date: '2026-10-10', time: '10:00', specialistId: 'S-002', status: 'Confirmed', notes: '' },
  { id: 'APT-3006', customerId: 'C-002', customer: 'Rahul Menon', service: 'Deep Cleansing Facial', date: '2026-10-10', time: '12:00', specialistId: 'S-004', status: 'Pending', notes: 'First visit.' },
  { id: 'APT-3007', customerId: 'C-008', customer: 'Vikram Shah', service: 'Relaxing Aromatherapy', date: '2026-10-11', time: '16:00', specialistId: 'S-005', status: 'Confirmed', notes: '' },
  { id: 'APT-3008', customerId: 'C-004', customer: 'Arjun Reddy', service: 'Signature Glow Facial', date: '2026-10-08', time: '14:00', specialistId: 'S-004', status: 'Completed', notes: '' },
  { id: 'APT-3009', customerId: 'C-006', customer: 'Karthik Raman', service: 'Botanical Hair Spa', date: '2026-10-07', time: '11:00', specialistId: 'S-003', status: 'Cancelled', notes: 'Customer rescheduled.' },
  { id: 'APT-3010', customerId: 'C-010', customer: 'Harish Gupta', service: 'Bridal Skin Consultation', date: '2026-10-12', time: '09:00', specialistId: 'S-002', status: 'Pending', notes: '' }
];

export const STAFF_ROLES = ['Administrator', 'Skin Specialist', 'Hair Therapist', 'Beauty Specialist', 'Receptionist', 'Wellness Specialist'];
export const AVAILABILITY = ['Available', 'With Client', 'Off Duty'];

export const INITIAL_STAFF = [
  { id: 'S-001', name: 'Ananya Iyer', email: 'ananya@maisonbloom.demo', phone: '+91 98400 11201', role: 'Administrator', availability: 'Available', experience: '12 years', bio: 'Leads salon operations and client experience.' },
  { id: 'S-002', name: 'Dr. Kavya Menon', email: 'kavya@maisonbloom.demo', phone: '+91 98410 22302', role: 'Skin Specialist', availability: 'With Client', experience: '9 years', bio: 'Dermatology trained, bridal and clinical facials.' },
  { id: 'S-003', name: 'Ritu Sharma', email: 'ritu@maisonbloom.demo', phone: '+91 98420 33403', role: 'Hair Therapist', availability: 'Available', experience: '7 years', bio: 'Trichology and botanical hair spa expert.' },
  { id: 'S-004', name: 'Farah Khan', email: 'farah@maisonbloom.demo', phone: '+91 98430 44504', role: 'Beauty Specialist', availability: 'Available', experience: '6 years', bio: 'Skin prep, makeup and facials.' },
  { id: 'S-005', name: 'Suresh Kumar', email: 'suresh@maisonbloom.demo', phone: '+91 98440 55605', role: 'Wellness Specialist', availability: 'Off Duty', experience: '10 years', bio: 'Aromatherapy and relaxation therapies.' },
  { id: 'S-006', name: 'Meera Nair', email: 'staff@maisonbloom.demo', phone: '+91 98450 66706', role: 'Receptionist', availability: 'Available', experience: '3 years', bio: 'Front desk, scheduling and client care.' }
];

export const LOYALTY_TIERS = ['New', 'Regular', 'Silver', 'Gold', 'VIP'];

export const INITIAL_CUSTOMERS = [
  { id: 'C-001', name: 'Priya Venkatesh', email: 'priya.venkatesh@example.com', phone: '+91 98765 43210', registered: '2024-02-14', tier: 'Gold', lastActivity: '2026-10-08' },
  { id: 'C-002', name: 'Rahul Menon', email: 'rahul.menon@example.com', phone: '+91 98450 12345', registered: '2026-09-20', tier: 'New', lastActivity: '2026-10-08' },
  { id: 'C-003', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@example.com', phone: '+91 99220 55667', registered: '2025-05-11', tier: 'Regular', lastActivity: '2026-10-07' },
  { id: 'C-004', name: 'Arjun Reddy', email: 'arjun.reddy@example.com', phone: '+91 90300 77889', registered: '2025-01-09', tier: 'Silver', lastActivity: '2026-10-08' },
  { id: 'C-005', name: 'Divya Subramanian', email: 'divya.subramanian@example.com', phone: '+91 94430 99001', registered: '2023-11-03', tier: 'VIP', lastActivity: '2026-10-09' },
  { id: 'C-006', name: 'Karthik Raman', email: 'karthik.raman@example.com', phone: '+91 98840 22113', registered: '2025-08-27', tier: 'Regular', lastActivity: '2026-10-07' },
  { id: 'C-007', name: 'Lakshmi Narayanan', email: 'lakshmi.narayanan@example.com', phone: '+91 97890 44556', registered: '2024-06-18', tier: 'Gold', lastActivity: '2026-10-04' },
  { id: 'C-008', name: 'Vikram Shah', email: 'vikram.shah@example.com', phone: '+91 98200 66778', registered: '2024-10-02', tier: 'Silver', lastActivity: '2026-10-03' },
  { id: 'C-009', name: 'Nandini Rao', email: 'nandini.rao@example.com', phone: '+91 98860 88990', registered: '2026-08-15', tier: 'New', lastActivity: '2026-10-02' },
  { id: 'C-010', name: 'Harish Gupta', email: 'harish.gupta@example.com', phone: '+91 98310 13579', registered: '2025-03-30', tier: 'Regular', lastActivity: '2026-10-01' },
  { id: 'C-011', name: 'Meenakshi Sundaram', email: 'meenakshi.s@example.com', phone: '+91 94440 24680', registered: '2023-07-21', tier: 'VIP', lastActivity: '2026-09-28' }
];

export const MONTHLY_REVENUE = [
  { month: 'Apr', products: 182000, appointments: 126000 },
  { month: 'May', products: 205000, appointments: 141000 },
  { month: 'Jun', products: 196000, appointments: 152000 },
  { month: 'Jul', products: 238000, appointments: 168000 },
  { month: 'Aug', products: 264000, appointments: 181000 },
  { month: 'Sep', products: 291000, appointments: 199000 },
  { month: 'Oct', products: 148000, appointments: 102000 }
];

export const ACTIVITY = [
  { who: 'Divya Subramanian', what: 'checked in for {service}', vars: { service: 'Bridal Skin Consultation' }, when: '10 min ago' },
  { who: 'Priya Venkatesh', what: 'placed order {id}', vars: { id: 'ORD-5001' }, when: '1 hr ago' },
  { who: 'Rahul Menon', what: 'booked {service}', vars: { service: 'Deep Cleansing Facial' }, when: '3 hrs ago' },
  { who: 'Arjun Reddy', what: 'received order {id}', vars: { id: 'ORD-5004' }, when: 'Yesterday' },
  { who: 'Nandini Rao', what: 'placed order {id}', vars: { id: 'ORD-5009' }, when: '2 days ago' }
];

export const inr = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
export const initials = (name) => name.replace(/^Dr\.\s*/, '').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
const DATE_LOCALES = { en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN', ml: 'ml-IN', te: 'te-IN' };
export const fmtDate = (iso, lang = 'en') => new Date(iso + 'T00:00:00').toLocaleDateString(DATE_LOCALES[lang] || 'en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
