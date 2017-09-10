var router = new VueRouter();

var mainComponent = Vue.extend({
  components: {
    'bill-component': window.billComponent
  },
  template: '<bill-component></bill-component>',
  data: function () {
    return {
      billsToPay: [
        {date_due: '02/03/2017', name: 'Conta de água', value: 21.9, done: true},
        {date_due: '02/03/2017', name: 'Conta de luz', value: 98.99, done: false},
        {date_due: '02/03/2017', name: 'Gasolina', value: 80, done: false},
        {date_due: '02/03/2017', name: 'Cartão de crédito', value: 221.25, done: false},
        {date_due: '02/03/2017', name: 'Empréstimo', value: 1000, done: false},
        {date_due: '02/03/2017', name: 'Supermercado', value: 130.85, done: false},
        {date_due: '02/03/2017', name: 'Conta de telefone', value: 50.2, done: false}
      ],
      billsToReceive: [
        {date_receive: '10/10/2017', name: 'Salário', value: 900, done: true},
        {date_receive: '02/03/2017', name: 'Trabalhos freelancer', value: 500, done: false}
      ]
    };
  }
});

router.map({
  '/bill-pays': {
    name: 'bill-pays',
    component: window.billPayComponent,
    subRoutes: {
      '/': {
        name: 'bill-pay.list',
        component: window.billPayListComponent
      },
      '/create': {
        name: 'bill-pay.create',
        component: window.billPayCreateComponent
      },
      '/:index/update': {
        name: 'bill-pay.update',
        component: window.billPayCreateComponent
      },
    },
  },
  '/bill-receives': {
    name: 'bill-receives',
    component: window.billReceiveComponent,
    subRoutes: {
      '/': {
        name: 'bill-receive.list',
        component: window.billReceiveListComponent
      },
      '/create': {
        name: 'bill-receive.create',
        component: window.billReceiveCreateComponent
      },
      '/:index/update': {
        name: 'bill-receive.update',
        component: window.billReceiveCreateComponent
      },
    },
  },
  '/dashboard': {
    name: 'dashboard',
    component: window.dashboardComponent
  },
  '*': {
    component: window.dashboardComponent
  }
});

router.start({
  components: {
    'main-component': mainComponent
  }
}, '#app');

router.redirect({
  '*': '/dashboard'
});
