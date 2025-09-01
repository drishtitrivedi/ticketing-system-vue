<template>
  <div class="dashboard">
    <h2>Tickets by Status</h2>
    <div class="cards">
      <div v-for="(count, status) in ticketsByStatus" :key="status" class="card">
        <h3>{{ status }}</h3>
        <p>{{ count }}</p>
      </div>
    </div>

    <h2>Tickets by Category</h2>
    <div class="cards">
      <div v-for="(count, category) in ticketsByCategory" :key="category" class="card">
        <h3>{{ category }}</h3>
        <p>{{ count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketDashboard',
  data() {
    return {
      tickets: [
        { id: 1, title: 'Login issue', status: 'Open', category: 'Bug' },
        { id: 2, title: 'Payment failed', status: 'In Progress', category: 'Bug' },
        { id: 3, title: 'Add dark mode', status: 'Closed', category: 'Feature' },
        { id: 4, title: 'Profile update error', status: 'Open', category: 'Bug' },
        { id: 5, title: 'UI improvement', status: 'Open', category: 'Feature' }
      ]
    }
  },
  computed: {
    ticketsByStatus() {
      return this.tickets.reduce((acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1
        return acc
      }, {})
    },
    ticketsByCategory() {
      return this.tickets.reduce((acc, ticket) => {
        acc[ticket.category] = (acc[ticket.category] || 0) + 1
        return acc
      }, {})
    }
  }
}
</script>

<style>
.dashboard {
  padding: 1rem;
}
.cards {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.card {
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  background: #f4f4f4;
  text-align: center;
}
</style>
