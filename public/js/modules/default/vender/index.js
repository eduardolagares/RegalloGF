$(document).ready(function(){
    $("a.modal").fancybox({
        'hideOnContentClick': true
    });

    $("#produtos li button.adicionar_quantidade").click(function(){
        span = $(this).parent().find("span.quantidade");
        input = $(this).parent().find("input.quantidade");
        estoque = input.attr("estoque");
        quantidade = input.val();
            
        quantidade++;
            
        if(quantidade > estoque) {
            quantidade = estoque;
        }
            
        span.html(quantidade);
        input.val(quantidade);
            
        checar_compra_item(quantidade, $(this).parents("li")); 
        update_values();
    });
        
    $("#produtos li button.remover_quantidade").click(function(){
        span = $(this).parent().find("span.quantidade");
        input = $(this).parent().find("input.quantidade");
        estoque = input.attr("estoque");
        quantidade = input.val();
            
        quantidade--;
            
        if(quantidade < 0) {
            quantidade = 0;
        }
            
        span.html(quantidade);
        input.val(quantidade);
            
        checar_compra_item(quantidade, $(this).parents("li"));
        update_values();
    });
        
    $(".moeda").maskMoney({
        thousands: '.', 
        decimal: ','
    });
    
    
    $("#btn_adicionar_parcela").click(function(){
        
        var n = $("#pagamento .parcela").length;
        
        $.ajax({
            url: $("#url_add_parcela").val(),
            data: {
                parcela: n
            },
            success: function(data) {
                var el = $(data);
                $("#pagamento").append(el);
                el.find(".date").uniform().jdPicker();
                el.find("input[type='text']").uniform();
                el.find("input[type='radio']").uniform();
                el.find("input[type='checkbox']").uniform();
                el.find("input.moeda").maskMoney({
                    thousands: '.', 
                    decimal: ','
                });
                setEventListenerDeletarParcela();
            }
        });
        
    });
    
    $("#btn_adicionar_parcela").click();
    $("#valor_desconto").blur(function() {
        update_values();
    });
    
    
    $("#btn_vender").click(function(){
        var valor_total = new Number($("#valor_total_com_desconto").html())
        
        
        // checar quantidade de produtos
        var q = new Number(0);
        $("#produtos li input.quantidade").each(function(index,item){
            q+= $(item).val();
        });
       
        if(q < 1) {
            alert("Selecione no minimo um produto para compra.");
            return false;
        }
       
        // checar valor das parcelas
        var v = new Number(0);
        $("#pagamento .parcela input.moeda").each(function(index,item){
            v+= moneyToNumber($(item).val());
        });
       
       if(valor_total.toFixed(2) != v) {
           alert("Suas parcelas não estão batendo com o valor final da compra");
           return false;
       }
       
        var nao_enviar = false;
        $("#pagamento .parcela input.date").each(function(index,item){
            if($(item).val() == "") {
                nao_enviar = true;
            }
        });
       
        $("#pagamento .parcela input.moeda").each(function(index,item){
            if($(item).val() == "") {
                nao_enviar = true;
            }
        });
        
        $("#pagamento .parcela").each(function(index,item){
            if($(item).find("input[type='radio']:checked").length == 0) {
                nao_enviar = true;
            }
        });
       
        if(nao_enviar) {
            alert("Preecha todos as informações para cada parcela.");
            return false;
        }
        
        return false;
    });
    
    
});
    
function update_values() {
    var valor_total = 0.00;
    
    $("#produtos li").each(function(index,item){
        valor = $(this).find("div.valor").attr("valor");
        quantidade = $(item).find("input.quantidade").val();
        if(quantidade > 0) {
            valor_total+= (quantidade * valor);
        }
    });
    
    valor_total = new Number(valor_total).toFixed(2);
    
    $("#valor_total").html(valor_total);
    
    var valor_desconto = new Number(moneyToNumber( $("#valor_desconto").val())).toFixed(2);
    
    var valor_final = new Number(valor_total - valor_desconto).toFixed(2);
    
    $("#valor_total_com_desconto").html(valor_final);
    checar_valor_parcelas();
}
    
function checar_compra_item(quantidade, item) {
    if(quantidade > 0) {
        item.addClass("comprando");
    }
    else {
        item.removeClass("comprando");
    }
}

function setEventListenerDeletarParcela() {
    $("#pagamento .parcela input.deletar_parcela").unbind("click").bind("click",function(){
        $(this).parents(".parcela").remove();
    });
}

function moneyToNumber(money) {
    
    money = new String(money).replace(/\./g,"");
    money = money.replace(/\,/g, "."); 
    
    return new Number(money);
}

function numberToMoney(number) {
    return number.toLocaleString();
}

function checar_valor_parcelas() {
    var total = new Number(0);
    $("#pagamento .parcela input.moeda").each(function(index,item){
        n = new Number(moneyToNumber($(item).val()));
        console.log(n);
        total+= n;
    });
    
    console.log(total);
}