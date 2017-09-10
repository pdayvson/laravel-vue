Vue.filter('doneLabelPay', function (value) {
  if (!value) {
    return 'Não paga';
  } else {
    return 'Paga';
  }
});

Vue.filter('doneLabelReceive', function (value) {
  if (!value) {
    return 'Não recebida';
  } else {
    return 'Recebida';
  }
});

Vue.filter('statusColorPay', function (value) {
  if (value === false) {
    return '<h3 class="cinza">Nenhuma conta cadastrada</h3>';
  } else if (value === 0) {
    return '<h3 class="verde">Nenhuma conta a pagar</h3>';
  } else if (value >= 1) {
    return `<h3 class="vermelho">Existem ${value} contas a serem pagas</h3>`;
  }
});

Vue.filter('statusColorReceive', function (value) {
  if (value === false) {
    return '<h3 class="cinza">Nenhuma conta cadastrada</h3>';
  } else if (value === 0) {
    return '<h3 class="verde">Nenhuma conta a receber</h3>';
  } else if (value >= 1) {
    return `<h3 class="vermelho">Existem ${value} contas a receber</h3>`;
  }
});
