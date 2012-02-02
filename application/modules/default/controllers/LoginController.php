<?php

class Default_LoginController extends Zend_Controller_Action {

    public function init() {
        
    }
    
    public function indexAction() {
        Zend_Layout::getMvcInstance()->setLayout("layout_login");
    }

    public function logarAction() {
        if ($this->getRequest()->isPost()) {

            $adapter = Zend_Db_Table::getDefaultAdapter();

            $authAdapter = new Zend_Auth_Adapter_DbTable($adapter);
            $authAdapter->setTableName("usuario")
                    ->setIdentityColumn("login")
                    ->setCredentialColumn("senha")
                    ->setCredentialTreatment("MD5(?)");

            $authAdapter->setIdentity($this->getRequest()->getParam("login"));
            $authAdapter->setCredential($this->getRequest()->getParam("senha"));

            $auth = Zend_Auth::getInstance();
            $result = $auth->authenticate($authAdapter);

            if ($result->isValid()) {
                $info = $authAdapter->getResultRowObject(null, 'senha');
                $storage = $auth->getStorage();
                $storage->write($info);
                $this->_redirect(array("module" => "default", "action" => "index", "controller" => "index"));
            } else {
                $this->_redirect(array("module" => "default", "action" => "index", "controller" => "login"));
            }
        }

        $this->_helper->viewRenderer->setNoRender();
        Zend_Layout::getMvcInstance()->disableLayout();
    }

    public function sairAction() {
        $auth = Zend_Auth::getInstance();
        $auth->clearIdentity();
        return $this->_redirect("/default");
    }

}

?>
