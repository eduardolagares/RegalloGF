<?php

class DbTable_Endereco extends Zend_Db_Table_Abstract {

    protected $_name = "endereco";

    public function getLastId() {
        $select = $this->select();
        $select->from($this, array('max(id) as max'));
        $row = $this->fetchRow($select)->toArray();
        return $row["max"];
    }
}

?>
