<template>
    <div class="">
      <h2>Edit Ticket</h2>
      <form @submit.prevent="submitForm" v-if="form">
        <input type="hidden" v-model="form.id" />
        <div class="form-group">
          <label for="title">Subject</label>
          <input v-model="form.subject" id="subject" type="text" required />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="form.status" id="status" required>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div class="form-group">
          <label for="status">Body</label>
          <textarea v-model="form.body" id="body" rows="5"></textarea>
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select v-model="form.category" id="category">
            <option value="General">General</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
          </select>
        </div>

        <div class="form-group">
          <label for="note">Note</label>
          <textarea v-model="form.note" id="note" rows="2"></textarea>
        </div>

        <div class="form-group">
          <label for="note">Confidance</label>
          <input type="range" v-model="form.confidance" min="0" max="1" step="0.1" disabled />
            <p>Current Value: {{ form.confidance }}</p>
        </div>
        
        <div class="form-group">
          <label for="note">Explanation</label>
          <textarea v-model="form.explanation" id="explanation" rows="2" readonly></textarea>
        </div>

        <div class="actions">
          <button type="button" @click="this.$router.push('/tickets') ">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>

      <h2 v-else>Invalid Ticket Id</h2>
    </div>

</template>

<script>
export default {
  name: "EditTicket",
  props: {
    // id: {
    //   type: Integer,
    //   default: null,
    // },
  },
  data() {

    let form = {};
    
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
        if (this.$route.params.id) {
            form = sampleTickets.find(t => t.id === parseInt(this.$route.params.id));
        } 

    return {
      form,
    };
  },
  methods: {
    open(ticket) {
        console.log("Opening ticket:", ticket);
    },
    submitForm() {
      // axios.patch(`/api/tickets/${this.ticketId}`, this.form).then(() => {
      //     alert("Ticket updated!");
      //   });
       this.$router.push('/tickets') 
    },
  },

};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 6px;
  width: 800px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.actions button {
  padding: 6px 12px;
}
</style>
