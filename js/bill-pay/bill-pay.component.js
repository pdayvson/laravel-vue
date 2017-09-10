window.billPayComponent = Vue.extend({
  components: {
    'bill-pay-menu-component': billPayMenuComponent
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
  <div v-html="status | statusColorPay"></div>

  <bill-pay-menu-component></bill-pay-menu-component>

  <router-view></router-view>
  `,
  data: function () {
    return {
      title: 'Contas a pagar'
    };
  },
  computed: {
    status: function () {
      let bills = this.$root.$children[0].billsToPay;
      if (bills.length === 0) {
        return false;
      }

      let count = 0;
      for (let i in bills) {
        if (!bills[i].done) {
          count++;
        }
      }
      return count;
    }
  }
});
