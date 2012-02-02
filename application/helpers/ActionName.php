<?php

class Zend_View_Helper_ActionName {
    public function actionName() {
        return Zend_Controller_Front::getInstance()->getRequest()->getActionName();
    }
}

?>
