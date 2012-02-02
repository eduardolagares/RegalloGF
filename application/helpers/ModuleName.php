<?php
    class Zend_View_Helper_ModuleName {
        public function moduleName() {
            return Zend_Controller_Front::getInstance()->getRequest()->getModuleName();
        }
    }
?>
