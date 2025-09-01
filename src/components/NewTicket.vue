<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>{{ isEdit ? "Edit Ticket" : "New Ticket" }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Subject</label>
          <input v-model="form.subject" id="subject" type="text" required />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="form.status" id="status" required>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div class="form-group">
          <label for="status">Body</label>
          <textarea v-model="form.body" id="body" rows="5"></textarea>
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select v-model="form.category" id="category">
            <option value="general">General</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
          </select>
        </div>

        <div class="form-group">
          <label for="note">Note</label>
          <textarea v-model="form.note" id="note" rows="2"></textarea>
        </div>

        <div class="form-group">
          <label for="note">Confidance</label>
          <input type="range" v-model="form.confidance" min="0" max="1" step="0.1" />
            <p>Current Value: {{ form.confidance }}</p>
        </div>
        
        <div class="form-group">
          <label for="note">Explanation</label>
          <textarea v-model="form.explanation" id="explanation" rows="2"></textarea>
        </div>

        

        <div class="actions">
          <button type="button" @click="$emit('close')">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewTicket",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {

    let form = {
        subject: "",
        status: "open",
        note: "",
        category: "general",
        confidance: 0.5,
        explanation: "",
    };
   
    return {
      form,
    };
  },
  methods: {
    open(ticket) {
        console.log("Opening ticket:", ticket);
    },
    submitForm() {
      this.$emit("save", { ...this.form });
      // reset

    //   if (this.isEdit) {
    //     axios.put(`/api/tickets/${this.ticketId}`, this.form).then(() => {
    //       alert("Ticket updated!");
    //     });
    //   } else {
    //     axios.post("/api/tickets", this.form).then(() => {
    //       alert("Ticket created!");
    //     });
    //   }
        this.form = {
            subject: "",
            status: "open",
            note: "",
            category: "general",
            confidance: 0.5,
            explanation: "",
        };
      this.$emit("close");
    },
  },
  computed: {
    isEdit() {
      return this.ticket && this.ticket.id;
    },
    // form() {
    //     console(this.isEdit, this.props.ticket);
    //     if (this.isEdit) {
    //         this.form = { ...this.props.ticket };
    //     }
    //     return { ...this.form };
    // }
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
