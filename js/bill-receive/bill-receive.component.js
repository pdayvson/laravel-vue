window.billReceiveComponent = Vue.extend({
  components: {
    'bill-receive-menu-component': window.billReceiveMenuComponent
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
  <div v-html="status | statusColorReceive"></div>

  <bill-receive-menu-component></bill-receive-menu-component>

  <router-view></router-view>
  `,
  data: function () {
    return {
      title: 'Contas a receber'
    };
  },
  computed: {
    status: function () {
      let bills = this.$root.$children[0].billsToReceive;
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
