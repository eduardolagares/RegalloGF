$(document).ready(function(){
    $("#produto_valor_custo").maskMoney({thousands: '.', decimal: ','});
    $("#produto_valor_venda").maskMoney({thousands: '.', decimal: ','});
});