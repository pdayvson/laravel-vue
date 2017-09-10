window.billPayListComponent = Vue.extend({
  template: `
  <style type="text/css">
    .pago {
      color: green;
    }
    .nao-pago {
      color: red;
    }
  </style>
  <table border="1" cellpadding="10">
    <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Vencimento</th>
        <th>Valor</th>
        <th>Paga?</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(index, b) in bills">
        <td>{{ index + 1 }}</td>
        <td>{{ b.name }}</td>
        <td>{{ b.date_due }}</td>
        <td>{{ b.value | currency 'R$ ' 2 }}</td>
        <td class="minha-classe" :class="{'pago': b.done, 'nao-pago': !b.done}">
          {{ b.done | doneLabelPay }}
        </td>
        <td>
          <a v-link="{name: 'bill-pay.update', params: {index: index}}">Editar</a> |
          <a href="javascript:void(0);" @click.prevent="removeBill(b)">Apagar</a> |
          <button type="button" @click="alternateStatus(b)">
            <span v-if="!b.done">Marcar como paga</span>
            <span v-else>Marcar como não paga</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  data: function () {
    return {
      bills: this.$root.$children[0].billsToPay
    };
  },
  methods: {
    removeBill: function (bill) {
      if (confirm('Você deseja apagar esta conta?')) {
        this.$root.$children[0].billsToPay.$remove(bill);
        alert('Removido com sucesso!');
      }
    },
    alternateStatus: function (bill) {
      return bill.done = !bill.done;
    }
  }
});
