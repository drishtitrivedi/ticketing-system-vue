<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2> New Ticket </h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Subject</label>
          <input v-model="form.subject" id="subject" type="text" required />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="form.status" id="status" required>
            <option v-for="s in all_status" :key="s" :value="s">
             {{ s }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="status">Body</label>
          <textarea v-model="form.body" id="body" rows="5"></textarea>
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select v-model="form.category" id="category">
            <option v-for="c in categories" :key="c" :value="c">
             {{ c }}
            </option>
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
import axios from 'axios';

export default {
  name: "NewTicket",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
      default: "Task"
    },
    all_status: {
      type: Array,
      default: "open"
    }
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
      axios.post("http://localhost:8000/api/tickets", this.form).then(() => {
        console.log("Ticket Created",this.form);
      });
      this.$emit("save", { ...this.form });
      this.$emit("close");
    }
  },
  computed: {
   
  },
};
</script>
