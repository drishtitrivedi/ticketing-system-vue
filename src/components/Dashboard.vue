<template>
  <div class="dashboard">
    <h2>Dashboard</h2>

    <!-- Card Counters -->
    <section class="cards">
      <div class="card" v-for="(count, status) in ticketsByStatus" :key="status">
        <h3>{{ status }}</h3>
        <p>{{ count }}</p>
      </div>

      <div class="card" v-for="(count, category) in ticketsByCategory" :key="category">
        <h3>{{ category }}</h3>
        <p>{{ count }}</p>
      </div>
    </section>

    <!-- Chart -->
    <section class="chart-section">
      <canvas id="ticketChart"></canvas>
    </section>
  </div>
</template>

<script>
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(PieController, ArcElement, Tooltip, Legend)

export default {
  name: 'Dashboard',
  data() {
    return {
      tickets: [
        { id: 1, title: 'Login issue', status: 'Open', category: 'Bug' },
        { id: 2, title: 'Payment failed', status: 'In Progress', category: 'Bug' },
        { id: 3, title: 'Add dark mode', status: 'Closed', category: 'Feature' },
        { id: 4, title: 'Profile update error', status: 'Open', category: 'Bug' },
        { id: 5, title: 'UI improvement', status: 'Open', category: 'Feature' }
      ],
      chart: null
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
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('ticketChart').getContext('2d')
      const labels = Object.keys(this.ticketsByStatus)
      const data = Object.values(this.ticketsByStatus)

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      })
    }
  }
}
</script>

<style>
.dashboard {
  padding: 2rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  flex: 1 1 150px;
  padding: 1rem;
  border-radius: 8px;
  background: #f4f4f4;
  text-align: center;
}

.chart-section {
  max-width: 400px;
  margin: auto;
}
</style>
