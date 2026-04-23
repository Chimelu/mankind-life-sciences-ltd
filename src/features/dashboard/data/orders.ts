export type DashboardOrder = {
  id: string
  date: string
  status: 'Processing' | 'Delivered' | 'Awaiting Dispatch'
  items: number
  total: number
  destination: string
}

export const dashboardOrders: DashboardOrder[] = [
  {
    id: 'ORD-20931',
    date: '2026-04-21',
    status: 'Processing',
    items: 4,
    total: 124000,
    destination: 'Onitsha Dealer Hub',
  },
  {
    id: 'ORD-20910',
    date: '2026-04-17',
    status: 'Delivered',
    items: 7,
    total: 356500,
    destination: 'Asaba Partner Outlet',
  },
  {
    id: 'ORD-20874',
    date: '2026-04-11',
    status: 'Awaiting Dispatch',
    items: 3,
    total: 89300,
    destination: 'Enugu Regional Desk',
  },
]
