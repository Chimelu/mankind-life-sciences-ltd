export type Dealer = {
  id: number
  name: string
  city: string
  state: string
  address: string
  phone: string
  email: string
  focus: string
  supportHours: string
}

export const dealers: Dealer[] = [
  {
    id: 1,
    name: 'Mankind Dealer Hub - Onitsha',
    city: 'Onitsha',
    state: 'Anambra',
    address: '2, Aggrey Road, Fegge, Onitsha, Anambra State',
    phone: '+234 803 727 4597',
    email: 'manpharma1@gmail.com',
    focus: 'Retail pharmacy supply and prescription products',
    supportHours: 'Mon - Sat, 8:00 AM - 6:00 PM',
  },
  {
    id: 2,
    name: 'Mankind Dealer Point - Asaba',
    city: 'Asaba',
    state: 'Delta',
    address: 'Nnebisi Road, Asaba, Delta State',
    phone: '+234 815 393 3500',
    email: 'johnpolng@gmail.com',
    focus: 'Wholesale and hospital stock fulfillment',
    supportHours: 'Mon - Sat, 8:30 AM - 5:30 PM',
  },
  {
    id: 3,
    name: 'Mankind Regional Dealer Desk',
    city: 'Enugu',
    state: 'Enugu',
    address: 'Independence Layout, Enugu State',
    phone: '+234 803 727 4597',
    email: 'manpharma1@gmail.com',
    focus: 'Laboratory products and specialty care distribution',
    supportHours: 'Mon - Fri, 9:00 AM - 5:00 PM',
  },
]
