Vue.filter('doneLabel', function (value) {
  if (value === 0) {
    return 'Não paga';
  } else {
    return 'Paga';
  }
});

Vue.filter('statusColor', function (value) {
  if (value === null) {
    return '<h3 class="cinza">Nenhuma conta cadastrada</h3>';
  } else if (value === 0) {
    return '<h3 class="verde">Nenhuma conta a pagar</h3>';
  } else if (value >= 1) {
    return `<h3 class="vermelho">Existem ${value} contas a serem pagas</h3>`;
  }
});

var menuComponent = Vue.extend({
  template: `
  <nav>
    <ul>
      <li v-for="m in menus">
        <a href="javascript:void(0);" @click="showView(m.id)">{{ m.name }}</a>
      </li>
    </ul>
  </nav>
  `,
  data: function () {
    return {
      menus: [
        {id: 0, name: 'Listar contas'},
        {id: 1, name: 'Criar conta'}
      ],
    };
  },
  methods: {
    showView: function (id) {
      this.$dispatch('change-activeView', id);
      if (id === 1) {
        this.$dispatch('change-formType', 'insert');
      }
    }
  }
});
// Vue.component('menu-component', menuComponent);

var billListComponent = Vue.extend({
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
          {{ b.done | doneLabel }}
        </td>
        <td>
          <a href="javascript:void(0);" @click.prevent="loadBill(b)">Editar</a> |
          <a href="javascript:void(0);" @click.prevent="removeBill(b)">Apagar</a> |
          <button type="button" @click="alternateStatus(b)">
            <span v-if="b.done === 0">Marcar como paga</span>
            <span v-else>Marcar como não paga</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  data: function () {
    return {
      bills: [
        {date_due: '02/03/2017', name: 'Conta de água', value: 21.9, done: 1},
        {date_due: '02/03/2017', name: 'Conta de luz', value: 98.99, done: 0},
        {date_due: '02/03/2017', name: 'Gasolina', value: 80, done: 0},
        {date_due: '02/03/2017', name: 'Cartão de crédito', value: 221.25, done: 0},
        {date_due: '02/03/2017', name: 'Empréstimo', value: 1000, done: 0},
        {date_due: '02/03/2017', name: 'Supermercado', value: 130.85, done: 0},
        {date_due: '02/03/2017', name: 'Conta de telefone', value: 50.2, done: 0}
      ],
    };
  },
  methods: {
    loadBill: function (bill) {
      this.$dispatch('change-bill', bill);
      this.$dispatch('change-activeView', 1);
      this.$dispatch('change-formType', 'update');
    },
    removeBill: function (bill) {
      if (confirm('Você deseja apagar esta conta?')) {
        this.bills.$remove(bill);
        alert('Removido com sucesso!');
      }
    },
    alternateStatus: function (bill) {
      return bill.done = !bill.done;
    }
  },
  events: {
    'new-bill': function (bill) {
      this.bills.push(bill);
    }
  }
});
// Vue.component('bill-list-component', billListComponent);

var billCreateComponent = Vue.extend({
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
    <button type="submit">Enviar</button>
  </form>
  `,
  data: function () {
    return {
      bill: {},
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
  methods: {
    submit: function () {
      if (this.formType === 'insert') {
        this.$dispatch('new-bill', this.bill);
      }

      this.bill = {date_due: '', name: '', value: 0, done: 0};
      this.$dispatch('change-activeView', 0);
    },
  },
  events: {
    'change-formType': function (formType) {
      this.formType = formType;
    },
    'change-bill': function (bill) {
      this.bill = bill;
    }
  }
});
// Vue.component('bill-create-component', billCreateComponent);

var appComponent = Vue.extend({
  components: {
    'menu-component': menuComponent,
    'bill-list-component': billListComponent,
    'bill-create-component': billCreateComponent
  },
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
    .minha-classe {
      background-color: lightgray;
    }
  </style>
  <h1>{{ title }}</h1>
  <div v-html="status | statusColor"></div>

  <menu-component></menu-component>

  <div v-show="activeView === 0">
    <bill-list-component v-ref:bill-list-component></bill-list-component>
  </div>
  <div v-show="activeView === 1">
    <bill-create-component></bill-create-component>
  </div>
  `,
  data: function () {
    return {
      title: 'Sistema financeiro com VueJS!',
      activeView: 0,
      bill: {date_due: '', name: '', value: 0, done: 0},
    };
  },
  computed: {
    status: function () {
      let billListComponent = this.$refs.billListComponent;
      if (billListComponent.bills.length === 0) {
        return false;
      }

      let count = 0;
      for (let i in billListComponent.bills) {
        if (!billListComponent.bills[i].done) {
          count++;
        }
      }
      return count;
    }
  },
  methods: {},
  events: {
    'change-activeView': function (activeView) {
      this.activeView = activeView;
    },
    'change-formType': function (formType) {
      this.$broadcast('change-formType', formType);
    },
    'change-bill': function (bill) {
      this.$broadcast('change-bill', bill);
    },
    'new-bill': function (bill) {
      this.$broadcast('new-bill', bill);
    }
  }
});
Vue.component('app-component', appComponent);

var app = new Vue({
  el: '#app',
});
