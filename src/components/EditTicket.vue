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
          <label for="status">Status</label> {{  form.status }}
          <select v-model="form.status" id="status" required>
           <option v-for="s in all_status" :key="s" :value="s" :selected="s == form.category">
             {{ s }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="status">Body</label>
          <textarea v-model="form.body" id="body" rows="5"></textarea>
        </div>

        <div class="form-group">
          <label for="category">Category  {{  form.category }}</label>
          <select v-model="form.category" id="category">
           <option v-for="c in categories" :key="c" :value="c" :selected="c == form.category">
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
          <input type="range" v-model="form.confidance" min="0" max="1" step="0.1" disabled />
            <p>Current Value: {{ form.confidance }}</p>
        </div>
        
        <div class="form-group">
          <label for="note">Explanation</label>
          <textarea v-model="form.explanation" id="explanation" rows="2" readonly></textarea>
        </div>

        <div class="actions">
          <button type="button" class="classification" @click="runClassification">Run Classification</button>
          <button type="button" @click="this.$router.push('/tickets') ">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>

      <h2 v-else>Invalid Ticket Id</h2>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "EditTicket",
  data() {

    const categories = ['Bug','Feature','Improvment','Task','Epic','Support'];

    const all_status = ['open', 'closed'];

    const id = this.$route.params.id

    let form = {};
    
        if (this.$route.params.id) {
           axios.get(`http://localhost:8000/api/tickets/${id}`).then(response => {
            const ticket = response.data;
            this.form = ticket;
            this.loading = false;
          }).catch(error => {
              console.error('Error fetching tickets:', error)
          });
        } 

    return {
      form, categories, all_status
    };
  },
  methods: {
    submitForm() {
      axios.patch(`http://localhost:8000/api/tickets/${this.form.id}`, this.form).then(() => {
          alert("Ticket updated!");
        });

      this.$router.push({ name: "Tickets" });
    },
    runClassification() {
      axios.post(`http://localhost:8000/api/tickets/${this.form.id}/classify`).then(() => {
        console.log("Ticket Classified",this.form);
      });
    }
  },

};
</script>

<style scoped>
.classification {
  background-color: #08ea5f;
  color: #fff;
  font-weight: bold;
}
</style>