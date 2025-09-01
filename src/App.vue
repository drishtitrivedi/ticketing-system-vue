<script setup>
import TicketList from './components/TicketList.vue';
</script>

<template>

  <header class="app-header">
    <!-- Menu / navigation -->
    <nav class="menu">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/tickets">Tickets</router-link>
    </nav>

    <h1 class="header-title">{{ pageTitle }}</h1>
  </header>

  <router-view />
</template>

<script>


export default {
  name: 'App',  
  data() {
    return {
      pageTitle: ''
    }
  },
  watch: {
    // Watch route changes
    $route: {
      immediate: true,
      handler(to) {
        switch (to.path) {
          case '/tickets':
            this.pageTitle = 'Tickets List'
            break
          case '/tickets/:id':
            this.pageTitle = 'Edit Ticket'
            break
          default:
            this.pageTitle = 'Dashboard'
        }
      }
    }
  }
}
</script>


<style scoped>
.header {
  background-color: #35495e;
  padding: 0.5em;
  color: white;
  display: flex;
  justify-content: center;
}
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: relative; /* needed for absolute centering of title */
  background-color: #35495e;
  color: white;
  border-bottom: 1px solid #ddd;
}

.menu {
  display: flex;
  gap: 1rem;
}

.header-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.menu a {
  text-decoration: none;
  color: rgb(226, 229, 235);
  font-weight: 500;
}

.menu a:hover {
  color: #007bff;
}
</style>
