<template>
 
<div class="ticket_list">

    <div class="controls">
      <input type="text" v-model="q" placeholder="Search tickets…" /> <!-- @input="debouncedFetch" -->
      <select v-model="status" @change="fetchTickets">
        <option value="">All statuses</option>
        <option v-for="s in all_status" :key="s" :value="s">
         {{ s }}
        </option>
      </select>
      <select v-model="category" @change="fetchTickets">
        <option value="">All Categories</option>
        <option v-for="c in categories" :key="c" :value="c">
         {{ c }}
        </option>
      </select>
      <button @click="refreshTickets">Refresh</button>

      <button @click="showModal = true">+ New Ticket</button>

      <NewTicket
        :show="showModal"
        ref="newTicketComponent"
        :categories="categories"
        :all_status="all_status"
        @close="showModal = false"
        @save="addTicket"
        />
    </div>

     <div v-if="loading" class="spinner-wrapper">
      <div class="spinner"></div>
    </div>

    <p v-if="filteredTickets.length === 0 && !loading">No tickets available.</p>
    
    <table v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th>Category</th>
          <th colspan="3">confidance</th>      
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in paginatedTickets" :key="t.id">
          <td>{{ t.id }}</td>
          <td class="title">{{ t.subject }}</td>
          <td><span :class="'badge ' + t.status">{{ t.status }}</span></td>
          <td><span class="">{{ t.category }}</span></td>
          <td><span class="">{{ t.confidance }}</span></td>
          <td><span class="tooltip" :title="t.explanation">ℹ️</span></td>
          <td><span v-if="t.notes" class="note-badge" :title="t.notes">📝</span></td>
          <td>{{ formatDate(t.created_at) }}</td>
          <td class="actions">
            <router-link :to="`/tickets/${t.id}`"><button class="view">Edit</button></router-link>
            <button class="delete" @click="deleteTicket(t.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>    
    </div>

    <div v-if="totalPages > 1" class="pagination">
      
      <button :disabled="currentPage===1" @click="currentPage--">Prev</button>
      <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="currentPage=page"
    >
      {{ page }}
    </button>
      <!-- <span>Page {{ currentPage }} of {{ totalPages }}</span> -->
      <button :disabled="currentPage===totalPages" @click="currentPage++">Next</button>
    </div>
  
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import NewTicket from './NewTicket.vue';

export default {
    name: 'TicketList',
    components: { NewTicket },
    props: ['id'],
    data() {

      const categories = ['Bug','Feature','Improvment','Task','Epic','Support'];

      const all_status = ['open', 'closed'];       

      return {
          tickets: this.tickets || [],
          q: "",
          status: "",
          category: "",
          page: 1,
          perPage:10,
          currentPage: 1,
          showModal: false,
          loading:true,
          categories:categories,
          all_status:all_status
      };
    },
    mounted() {
      this.refreshTickets();
    },
    methods: {
        getTickets() {
            axios.get('http://localhost:8000/api/tickets').then(response => {
              const tickets = response.data;
              this.tickets = tickets;
              this.loading = false;
            }).catch(error => {
              console.error('Error fetching tickets:', error)
            });
        },
        formatDate(dateString) {
              const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
        ,refreshTickets() {
            this.page = 1;
            this.status = "";
            this.category = "";
            this.q = "";
            
        },
        addTicket(ticket) {
            this.showModal = false;
            const lastTicket = this.tickets.slice(-1)[0]; // get last item
            const lastId = lastTicket ? lastTicket.id : 0;
            this.tickets.push({
                id: lastId + 1,
                ...ticket,
            });
        },
        openEditModal(ticket) {
            this.editingTicket = { ...ticket };
            this.showEditModal = true;
        },
        deleteTicket(id) {
            // delete ticket logic here
            axios.delete(`http://localhost:8000/api/tickets/${id}`);
            alert(`Ticket ${id} deleted!`);
             this.tickets = this.tickets.filter(t => t.id !== id);
        },
        goto() {

        }
    },
     mounted() {
      this.getTickets();
    },
    computed: {
        filteredTickets() {
            return this.tickets.filter(ticket => {
                return ticket.subject.toLowerCase().includes(this.q.toLowerCase()) 
                && (this.status ? ticket.status.toLowerCase() === this.status.toLowerCase() : true)
                && (this.category ? ticket.category.toLowerCase() === this.category.toLowerCase() : true);
            });
        },
        paginatedTickets() {
          const start = (this.currentPage - 1) * this.perPage;
          const end = start + this.perPage;
          return this.filteredTickets.slice(start, end);
        },
        totalPages() {
          console.log(this.paginatedTickets);
          return Math.ceil(this.filteredTickets.length / this.perPage);
        }
    }
};
</script>

<style scoped>
h2 {
    margin-bottom: 10px;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    padding: 5px 0;
}


</style>