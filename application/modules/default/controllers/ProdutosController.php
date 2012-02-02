<?php

class Default_ProdutosController extends Zend_Controller_Action {

    public function init() {
        parent::init();
    }

    public function buscarAction() {
        $busca = $this->getRequest()->getParam("busca");
        $this->_redirect("/produtos/index/busca/".$busca);    
    }
    
    public function editarAction() {
        $id = $this->getRequest()->getParam("id","");
        
        $dbP = new DbTable_Produto();
        $this->view->produto = $dbP->fetchRow($dbP->select()->where("id = ?",$id));
        
        $this->render("form");
        
    }
    
    public function indexAction() {
        $dbP = new DbTable_Produto();
        $page = $this->getRequest()->getParam("page", 1);
        $this->view->busca = $this->getRequest()->getParam("busca", "");

        $q = $dbP->select()
                ->setIntegrityCheck(false)
                ->from(array("p" => "produto"), array("p.*"))
                ->joinInner(array("c" => "categoria"), "c.id = p.categoria_id", array("produto_categoria" => "c.nome"))
                ->order("p.nome ASC");

        if (!empty($this->view->busca)) {
            $q->where("p.nome LIKE(?)", "%".$this->view->busca."%");
        }


        $pager = new Zend_Paginator(new Zend_Paginator_Adapter_DbSelect($q));
        $pager->setCurrentPageNumber($page);
        $pager->setItemCountPerPage(10);

        $this->view->registros = $pager;
    }

    public function cadastrarAction() {
        $dbCategorias = new DbTable_Categoria();
        $this->view->categorias = $dbCategorias->fetchAll();
        $this->view->produto = new stdClass();
        $this->render("form");
    }

    public function salvarAction() {

        $dir = APPLICATION_PATH . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "img" . DIRECTORY_SEPARATOR . "foto_produto" . DIRECTORY_SEPARATOR;

        if ($this->getRequest()->isPost()) {
            $produto = $this->getRequest()->getParam("produto");
            $files = $_FILES;

            $dbP = new DbTable_Produto();


            if (isset($produto["id"]) && !empty($produto["id"])) {
                
            } else {
                $d = new Zend_Date();
                unset($produto["id"]);
                $produto["data_cadastro"] = $d->get("WWW");
                $produto["data_atualizacao"] = $d->get("WWW");
                $produto["usuario_id"] = $this->view->usuario->id;
                $produto["usuario_atualizacao_id"] = $this->view->usuario->id;
                $produto["ativo"] = (isset($produto["ativo"]) && !empty($produto["ativo"]) && $produto["ativo"] == "1") ? 1 : 0;

                if (isset($files["file"])) {
                    $fn = basename($files["file"]["name"]);
                    $fn = str_replace(" ", "", $fn);

                    if (move_uploaded_file($files["file"]["tmp_name"], $dir . $fn)) {
                        $produto["foto"] = $fn;
                    }
                }

                $pId = $dbP->insert($produto);


                $this->_helper->FlashMessenger(
                        array('success' => "Produto cadastrado com sucesso!")
                );

                $this->_redirect(array("module" => "default", "controller" => "produtos", "action" => "cadastrar"));
            }




            print_r($produto);
        }


        $this->_helper->viewRenderer->setNoRender();
        Zend_Layout::getMvcInstance()->disableLayout();
    }

}

?>
