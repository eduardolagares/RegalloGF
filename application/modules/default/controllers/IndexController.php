<?php

class Default_IndexController extends Zend_Controller_Action
{
    public function init()
    {
        parent::init();
    }

    public function indexAction()
    {
        $this->_forward("pedidos","vender");
    }
    
    
    
}

