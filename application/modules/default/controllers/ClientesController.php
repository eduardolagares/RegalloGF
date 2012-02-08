<?php

class Default_ClientesController extends Zend_Controller_Action {

    public function init() {
        parent::init();
    }

    public function buscarAction() {
        $busca = $this->getRequest()->getParam("busca");
        $this->_redirect("/clientes/index/busca/" . $busca);
    }

    public function editarAction() {
        $id = $this->getRequest()->getParam("id", "");

        $dbP = new DbTable_Cliente();
        $this->view->registro = $dbP->fetchRow($dbP->select()->where("id = ?", $id));

        $this->render("form");
    }

    public function indexAction() {
        $dbP = new DbTable_Cliente();
        $page = $this->getRequest()->getParam("page", 1);
        $this->view->busca = $this->getRequest()->getParam("busca", "");

        $q = $dbP->select()
                ->setIntegrityCheck(false)
                ->from(array("c" => "cliente"), array("c.*", new Zend_Db_Expr(("'sim' as devedor"))))
                ->order("c.nome ASC")
                ->where("c.deletado = 0");

        if (!empty($this->view->busca)) {
            $q->where("c.nome LIKE(?)", "%" . $this->view->busca . "%");
        }


        $pager = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($q));
        $pager->setCurrentPageNumber($page);
        $pager->setItemCountPerPage(10);

        $this->view->registros = $pager;
    }

    public function cadastrarAction() {
        $this->view->registro = new Zend_Db_Table_Row();
        $this->render("form");
    }

    public function salvarAction() {

        if ($this->getRequest()->isPost()) {
            $registro = $this->getRequest()->getParam("registro");
            $files = $_FILES;

            $db = new DbTable_Cliente();


            $d = new Zend_Date();
            $registro["data_atualizacao"] = $d->get("WWW");
            $registro["usuario_atualizacao_id"] = $this->view->usuario->id;



            if (isset($registro["id"]) && !empty($registro["id"])) {
                $id = $registro["id"];
                unset($registro["id"]);

                $db->update($registro, "id = " . $id);

                $this->_helper->FlashMessenger(
                        array('success' => "Cliente alterado com sucesso!")
                );

                $this->_redirect("/clientes/editar/id/" . $id);
            } else {

                unset($registro["id"]);
                $registro["data_cadastro"] = $d->get("WWW");
                $registro["usuario_cadastro_id"] = $this->view->usuario->id;

                $pId = $db->insert($registro);


                $this->_helper->FlashMessenger(
                        array('success' => "Cliente cadastrado com sucesso!")
                );

                $this->_redirect("/clientes/editar/id/" . $pId);
            }
        }


        $this->_helper->viewRenderer->setNoRender();
        Zend_Layout::getMvcInstance()->disableLayout();
    }

    public function deletarAction() {

        $id = $this->getRequest()->getParam("id");

        $db = new DbTable_Produto();
        $db->update(array("deletado" => 1), "id = " . $id);



        $this->_helper->FlashMessenger(
                array('success' => "Produto removido com sucesso!")
        );

        $this->_redirect("/produtos");




        $this->_helper->viewRenderer->setNoRender();
        Zend_Layout::getMvcInstance()->disableLayout();
    }

}

?>
