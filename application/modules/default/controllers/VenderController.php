<?php

class Default_VenderController extends Zend_Controller_Action {

    public function init() {
        parent::init();
    }

    public function buscarAction() {
        $busca = $this->getRequest()->getParam("busca");
        $this->_redirect("/vender/pedidos/busca/" . $busca);
    }

    public function indexAction() {
        $dbC = new DbTable_Cliente();
        $this->view->clientes = $dbC->fetchAll();

        $dbP = new DbTable_Produto();
        $this->view->produtos = $dbP->fetchAll("estoque > 0");
    }

    public function addParcelaAction() {
        $this->view->parcela = $this->getRequest()->getParam("parcela");

        $this->render("parcela");
        Zend_Layout::getMvcInstance()->disableLayout();
    }

    public function salvarPedidoAction() {
        $registro = $this->getRequest()->getParam("registro");
        $parcelas = $this->getRequest()->getParam("parcelas");

        $itens = $registro["itens"];

        $date = new Zend_Date();
        $valorItens = 0;
        foreach ($itens as $i) {
            if ($i["quantidade"] > 0) {
                $valorItens+=$i["valor"];
            }
        }

        $desconto = str_replace(".", "", $registro["desconto"]);
        $desconto = str_replace(",", ".", $desconto);

        $dadosPedido = array(
            "cliente_id" => $registro["cliente_id"],
            "data" => $date->get("WWW"),
            "status" => "aguardando_pagamento",
            "valor_final" => $valorItens - $desconto,
            "valor_desconto" => $desconto
        );


        $dbPedido = new DbTable_Pedido();
        $pedidoId = $dbPedido->insert($dadosPedido);

        $dbItem = new DbTable_PedidoItem();
        $dbProduto = new DbTable_Produto();

        $dbParcela = new DbTable_PedidoParcela();



        foreach ($itens as $i) {
            if ($i["quantidade"] > 0) {
                $dadosPedidoItem = array(
                    "pedido_id" => $pedidoId,
                    "produto_id" => $i["id"],
                    "quantidade" => $i["quantidade"],
                    "valor" => $i["valor"]
                );
                $dbItem->insert($dadosPedidoItem);

                $q = "UPDATE produto as p SET p.estoque = p.estoque - " . $i["quantidade"];
                $dbProduto->getAdapter()->query($q);
            }
        }


        $numeroParcelasPagas = 0;
        foreach ($parcelas as $parcela) {
            $d = new Zend_Date($parcela["data"]);
            $valor = str_replace(".", "", $parcela["valor"]);
            $valor = str_replace(",", ".", $valor);
            $dadosParcela = array(
                "pedido_id" => $pedidoId,
                "data" => $d->get("WWW"),
                "tipo_pagamento" => $parcela["tipo_pagamento"],
                "valor" => $valor,
                "paga" => isset($parcela["paga"]) ? 1 : 0
            );

            if ($dadosParcela["paga"] == 1) {
                $numeroParcelasPagas++;
            }

            $dbParcela->insert($dadosParcela);
        }


        if (count($parcelas) == $numeroParcelasPagas) {
            $dbPedido->update(array("status" => "pago"), "id = " . $pedidoId);
        }


        $this->_helper->FlashMessenger(
                array('success' => "Venda efetuada com sucesso!")
        );


        $this->_redirect("/vender/pedidos");



        $this->_helper->viewRenderer->setNoRender();
        Zend_Layout::getMvcInstance()->disableLayout();
    }

    public function pedidosAction() {
        $dbP = new DbTable_Pedido();
        $page = $this->getRequest()->getParam("page", 1);
        $this->view->busca = $this->getRequest()->getParam("busca", "");

        $sub1 = new Zend_Db_Expr("(SELECT SUM(pi.quantidade) FROM pedido_item as pi WHERE pi.pedido_id = p.id )");

        $q = $dbP->select()
                ->setIntegrityCheck(false)
                ->from(array("p" => "pedido"), array("p.*", "quantidade" => $sub1))
                ->joinInner(array("c" => "cliente"), "c.id = p.cliente_id", array("cliente_nome" => "c.nome"))
        ;

        if (!empty($this->view->busca)) {
            $q->where("p.id = ?",$this->view->busca);
//            $q->where("p.id LIKE(?)", "%" . $this->view->busca . "%");
        }


        $pager = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($q));
        $pager->setCurrentPageNumber($page);
        $pager->setItemCountPerPage(10);

        $this->view->registros = $pager;
    }

}