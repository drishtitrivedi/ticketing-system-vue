<template>
 
<div class="ticket_list">

    <div class="controls">
      <input type="text" v-model="q" placeholder="Search tickets…" /> <!-- @input="debouncedFetch" -->
      <select v-model="status" @change="fetchTickets">
        <option value="">All statuses</option>
        <option value="open">Open</option>
        <option value="pending">Pending</option>
        <option value="closed">Closed</option>
      </select>
      <select v-model="category" @change="fetchTickets">
        <option value="">All Categories</option>
        <option value="Billing">Billing</option>
        <option value="general">General</option>
        <option value="technical">Technical</option>
      </select>
      <button @click="refreshTickets">Refresh</button>

      <button @click="showModal = true">+ New Ticket</button>

      <NewTicket
        :show="showModal"
        ref="newTicketComponent"
        :ticket="form"
        @close="showModal = false"
        @save="addTicket"
        />
    </div>

    <p v-if="filteredTickets.length === 0">No tickets available.</p>
    
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
        <tr v-for="t in filteredTickets" :key="t.id">
          <td>{{ t.id }}</td>
          <td class="title">{{ t.subject }}</td>
          <td><span :class="'badge ' + t.status">{{ t.status }}</span></td>
          <td><span class="">{{ t.category }}</span></td>
          <td><span class="">{{ t.confidance }}</span></td>
          <td><span class="tooltip" :title="t.explanation">ℹ️</span></td>
          <td><span v-if="t.note" class="note-badge" :title="t.note">📝</span></td>
          <td>{{ formatDate(t.created_at) }}</td>
          <td class="actions">
            <router-link :to="`/tickets/${t.id}`"><button class="view">Edit</button></router-link>
            <button class="delete" @click="deleteTicket(t.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>    
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import NewTicket from './NewTicket.vue';

export default {
    name: 'TicketList',
    components: { NewTicket },
    data() {

        const sampleTickets = [
            {
                id: 1,
                subject: 'Sample Ticket',
                status: 'Open',
                category: 'General',
                confidance: 0.95,
                explanation:" This is a sample ticket for demonstration purposes.",
                note: "This is a sample note.",
                created_at: '2024-01-01 10:00:00'
            },
            {
                id: 2,
                subject: 'Another Ticket',
                status: 'Closed',
                category: 'Technical',
                confidance: 0.85,
                explanation:" This ticket has been closed.",
                note:"",
                created_at: '2024-01-02 11:00:00'
    },
            {
                id: 3,
                subject: 'Third Ticket',
                status: 'In Progress',
                category: 'Billing',
                confidance: 0.90,
                explanation:" This ticket is currently being worked on.",
                note: "Follow up next week.",
                created_at: '2024-01-03 12:00:00'
            }
        ];
        

        // axios.get('http://localhost:8000/api/tickets').then(response => { console.log(response.data);
        //     const tickets = response.data;
        //     this.tickets = tickets;
        // }).catch(error => {
        //     console.error('Error fetching tickets:', error)
        // });
       

        return {
            tickets: this.tickets || sampleTickets,
            q: "",
            status: "",
            category: "",
            page: 1,
            totalPages: 1,
            showModal: false,
            form: {
                subject: "",
                status: "open",
                note: "",
                category: "general",
                confidance: 0.5,
                explanation: "",
            },
        };
    },
    methods: {
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
            console.log("Adding ticket:", ticket);
            this.showModal = false;
            this.tickets.push({
                id: this.tickets.length + 1,
                ...ticket,
            });
        },
        openEditModal(ticket) {
            this.editingTicket = { ...ticket };
            this.showEditModal = true;
        },
        deleteTicket(ticket) {
            // delete ticket logic here
            this.tickets = this.tickets.filter(t => t.id !== ticket);
            alert(`Ticket ${ticket} deleted!`);
        },
    },
    computed: {
        filteredTickets() {
            return this.tickets.filter(ticket => {
                return ticket.subject.toLowerCase().includes(this.q.toLowerCase()) 
                && (this.status ? ticket.status.toLowerCase() === this.status.toLowerCase() : true)
                && (this.category ? ticket.category.toLowerCase() === this.category.toLowerCase() : true);
            });
        },
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

.ticket_list {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.controls input,
.controls select {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.controls button {
  padding: 6px 12px;
  background: #4a6cf7;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}
.controls button:hover {
  background: #3652c9;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}
thead {
  background: #f5f5f5;
}
th, td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.title {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions button {
  margin-right: 5px;
  padding: 4px 10px;
  font-size: 13px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.actions .view { background: #3b82f6; color: white; }
.actions .edit { background: #facc15; color: black; }
.actions .delete { background: #ef4444; color: white; }

.actions .view:hover { background: #2563eb; }
.actions .edit:hover { background: #eab308; }
.actions .delete:hover { background: #dc2626; }

</style>