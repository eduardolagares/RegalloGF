<?php

class Zend_View_Helper_MoneyFormat {

    public function moneyFormat($value) {
        $c = new Zend_Currency();
        $c->setValue($value);
        $c->setFormat(array("display"=> Zend_Currency::NO_SYMBOL));
        return $c->toCurrency();
    }

}

?>
