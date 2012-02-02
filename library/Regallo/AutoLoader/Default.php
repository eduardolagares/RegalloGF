<?php

class Regallo_AutoLoader_Default extends Zend_Loader_Autoloader_Resource {

    public function __construct($options) {
        parent::__construct($options);
        $this->initDefaultResourceTypes();
    }

    public function initDefaultResourceTypes() {

        $this->addResourceTypes(array(
            'dbtable' => array(
                'namespace' => 'DbTable',
                'path' => "dbtables"
            )
//            ,
//            'helpers_action' => array(
//                'namespace' => 'Helper_Action',
//                'path' => 'helpers'
//            ),
//            'helpers_view' => array(
//                'namespace' => 'Helper_',
//                'path' => 'helpers'
//            )
        ));
        $this->setDefaultResourceType('dbtable');
    }

}

?>
