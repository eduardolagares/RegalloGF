<?php
    class Zend_View_Helper_ControllerName {
        public function controllerName() {
            return Zend_Controller_Front::getInstance()->getRequest()->getControllerName();
        }
    }
?>
