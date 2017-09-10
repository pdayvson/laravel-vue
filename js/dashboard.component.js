window.dashboardComponent = Vue.extend({
  template: `
  <style type="text/css">
    .verde {
      color: green;
    }
    .vermelho {
      color: red;
    }
    .cinza {
      color: gray;
    }
  </style>
  <h1>{{ title }}</h1>
  <table border="1" cellpadding="10">
    <thead>
      <tr>
        <th>Tipo</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Contas a pagar</td>
        <td>R$ {{ billsToPay }}</td>
      </tr>
      <tr>
        <td>Contas a receber</td>
        <td>R$ {{ billsToReceive }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td><b>Total</b></td>
        <td>R$ {{ billsTotal }}</td>
      </tr>
    </tfoot>
  </table>
  `,
  data: function () {
    return {
      title: 'Painel principal'
    };
  },
  computed: {
    billsToReceive: function () {
      const bills = this.$root.$children[0].billsToReceive;
      let total = 0;

      for (let i = 0; i < bills.length; i++) {
        total += parseFloat(bills[i].value);
      }

      return total.toFixed(2);
    },
    billsToPay: function () {
      const bills = this.$root.$children[0].billsToPay;

      let total = 0;

      for (let i = 0; i < bills.length; i++) {
        total += parseFloat(bills[i].value);
      }

      return total.toFixed(2);
    },
    billsTotal: function () {
      let total = parseFloat(this.billsToReceive) - parseFloat(this.billsToPay);
      return total.toFixed(2);
    }
  }
});
