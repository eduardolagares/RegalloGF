<?php

class Default_VenderController extends Zend_Controller_Action {

    public function init() {
        parent::init();
    }
    
    public function indexAction() {
        $dbC = new DbTable_Cliente();
        $this->view->clientes = $dbC->fetchAll();
    }
}