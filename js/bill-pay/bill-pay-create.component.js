window.billPayCreateComponent = Vue.extend({
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
      Vencimento: <br>
      <input type="text" name="vencimento" v-model="bill.date_due">
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
        date_due: '',
        name: '',
        value: 0,
        done: false
      },
      formType: 'insert',
      names: [
        'Conta de luz',
        'Conta de água',
        'Conta de telefone',
        'Supermercado',
        'Cartão de crédito',
        'Empréstimo',
        'Gasolina'
      ]
    };
  },
  created () {
    if (this.$route.name === 'bill-pay.update') {
      this.formType = 'update';
      this.getBill(this.$route.params.index);
    }
  },
  methods: {
    submit: function () {
      if (this.formType === 'insert') {
        this.$root.$children[0].billsToPay.push(this.bill);
      }

      this.bill = {
        date_due: '',
        name: '',
        value: 0,
        done: false
      };

      this.$router.go({name: 'bill-pay.list'});
    },
    getBill: function (index) {
      this.bill = this.$root.$children[0].billsToPay[index];
    }
  }
});
