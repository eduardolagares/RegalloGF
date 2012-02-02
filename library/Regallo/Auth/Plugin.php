<?php

class Regallo_Auth_Plugin extends Zend_Controller_Plugin_Abstract {

    public function preDispatch(Zend_Controller_Request_Abstract $request) {
        parent::preDispatch($request);


        if (
                ($this->getRequest()->getModuleName() == "default" &&
                $this->getRequest()->getActionName() == "index" &&
                $this->getRequest()->getControllerName() == "login") ||
                
                ($this->getRequest()->getModuleName() == "default" &&
                $this->getRequest()->getActionName() == "logar" &&
                $this->getRequest()->getControllerName() == "login")
        ) {
            
        } else if (!Zend_Auth::getInstance()->hasIdentity()) {
            $request->setModuleName("default");
            $request->setControllerName("login");
            $request->setActionName("index");
            $request->setDispatched();
        } else {
            $this->_view = Zend_Layout::getMvcInstance()->getView();
            $this->_view->assign("usuario", Zend_Auth::getInstance()->getIdentity());
        }
    }

}

?>
