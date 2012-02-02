<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

    protected function _initDocType() {
        $this->bootstrap('view');
        $view = $this->getResource('view');
        $view->doctype('XHTML1_STRICT');
    }

    public function _initAutoLoad() {
        
        require 'Regallo/AutoLoader/Default.php';
        require 'Regallo/Auth/Plugin.php';
        
        $autoLoader = new Regallo_AutoLoader_Default(array(
            'namespace' => '',
            'basePath' => APPLICATION_PATH
        ));
    }

}

