<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

    protected function _initDocType() {
        $this->bootstrap('view');
        $view = $this->getResource('view');
        $view->doctype('XHTML1_STRICT');

        $locale = new Zend_Locale('pt_BR');
        Zend_Registry::set('Zend_Locale', $locale);
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

