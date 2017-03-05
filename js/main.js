Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não paga";
    } else {
        return "Paga";
    }
});
Vue.filter('statusColor', function (value) {
    if (value == null) {
        return "<h3 class=\"cinza\">Nenhuma conta cadastrada</h3>";
    } else if (value == 0) {
        return "<h3 class=\"verde\">Nenhuma conta a pagar</h3>";
    } else if (value >= 1) {
        return "<h3 class=\"vermelho\">Existem " + value + " contas a serem pagas</h3>";
    }
});

var app = new Vue({
    el: '#app',
    data: {
        title: 'Sistema financeiro com VueJS!',
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        activeView: 0,
        formType: 'insert',
        bill: {date_due: '', name: '', value: 0, done: 0},
        bills: [
            {date_due: "02/03/2017", name: "Conta de água", value: 21.9, done: 1},
            {date_due: "02/03/2017", name: "Conta de energia", value: 98.99, done: 0},
            {date_due: "02/03/2017", name: "Gasolina", value: 80, done: 0},
            {date_due: "02/03/2017", name: "Cartão de crédito", value: 221.25, done: 0},
            {date_due: "02/03/2017", name: "Empréstimo", value: 1000, done: 0},
            {date_due: "02/03/2017", name: "Supermercado", value: 130.85, done: 0},
            {date_due: "02/03/2017", name: "Conta de telefone", value: 50.2, done: 0}
        ],
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina'
        ]
    },
    computed: {
        status: function () {
            if (this.bills.length == 0) {
                return null;
                // return "Nenhuma conta cadastrada";
            }

            var count = 0;
            for (i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }
            return count;
            // return !count ? "Nenhuma conta à pagar" : "Existem " + count + " contas à pagar";
        }
    },
    methods: {
        showView: function (id) {
            this.activeView = id;
            if (id == 1) {
                this.formType == 'insert';
            }
        },
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill = {date_due: '', name: '', value: 0, done: 0};
            this.activeView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activeView = 1;
            this.formType = 'update';
        },
        removeBill: function (index) {
            var confirmation = confirm('Você deseja apagar esta conta?');
            if (confirmation) {
                this.bills.splice(index, 1);
                console.log("Removido com sucesso!");
            }
        },
        alternateStatus: function (bill) {
            return bill.done = !bill.done;
        }
    }
});