window.billComponent = Vue.extend({
  template: `
  <nav>
    <ul>
      <li v-for="m in menus">
        <a v-link="{name: m.routeName}">{{ m.name }}</a>
      </li>
    </ul>
  </nav>
  <router-view></router-view>
  `,
  data: function () {
    return {
      menus: [
        {name: 'Painel principal', routeName: 'dashboard'},
        {name: 'Contas a pagar', routeName: 'bill-pays'},
        {name: 'Contas a receber', routeName: 'bill-receives'}
      ],
    };
  },
});
