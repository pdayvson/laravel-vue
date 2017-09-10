window.billReceiveCreateComponent = Vue.extend({
  template: `
  <form action="?" name="form" @submit.prevent="submit">
    <label>
      Nome: <br>
      <select v-model="bill.name">
        <option v-for="n in names" :value="n">{{ n }}</option>
      </select>
    </label>
    <br><br>
    <label>
      Data para receber: <br>
      <input type="text" name="vencimento" v-model="bill.date_receive">
    </label>
    <br><br>
    <label>
      Valor: <br>
      <input type="text" v-model="bill.value">
    </label>
    <br><br>
    <label>
      Pago?
      <input type="checkbox" v-model="bill.done">
    </label>
    <br><br>
    <button type="submit">Enviar</button>
  </form>
  `,
  data: function () {
    return {
      bill: {
        date_receive: '',
        name: '',
        value: 0,
        done: false
      },
      formType: 'insert',
      names: [
        'Salário',
        'Trabalhos freelancer'
      ]
    };
  },
  created () {
    if (this.$route.name === 'bill-receive.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.index);
    }
  },
  methods: {
    submit: function () {
      if (this.formType === 'insert') {
        this.$root.$children[0].billsToReceive.push(this.bill);
      }

      this.bill = {
        date_receive: '',
        name: '',
        value: 0,
        done: false
      };

      this.$router.go({name: 'bill-receive.list'});
    },
    getBill: function (index) {
      this.bill = this.$root.$children[0].billsToReceive[index];
    }
  }
});
