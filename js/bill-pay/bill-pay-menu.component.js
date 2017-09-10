window.billPayMenuComponent = Vue.extend({
  template: `
  <nav>
    <ul>
      <li v-for="m in menus">
        <a v-link="{name: m.routeName}">{{ m.name }}</a>
      </li>
    </ul>
  </nav>
  `,
  data: function () {
    return {
      menus: [
        {id: 0, name: 'Listar contas a pagar', routeName: 'bill-pay.list'},
        {id: 1, name: 'Criar conta a pagar', routeName: 'bill-pay.create'}
      ],
    };
  },
});
