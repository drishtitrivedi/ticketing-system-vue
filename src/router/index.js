import { createRouter, createWebHistory } from 'vue-router';

import TicketList from '../components/TicketList.vue';
import EditTicket from '../components/EditTicket.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
    {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: TicketList,
    props: true
  },
  {
    path: '/tickets/:id',
    name: 'EditTicket',
    component: EditTicket,
    props: true,
    meta: { title: 'Edit Ticket' } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;