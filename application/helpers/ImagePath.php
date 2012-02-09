<?php

class Zend_View_Helper_ImagePath {

    public function imagePath($src) {
//        var_dump(file_exists($src));
//        var_dump(is_dir($src));
        if(file_exists($src) && is_dir($src) === false) {
            return $src;
        }
        else {
            return "img/warning.jpg";
        }
    }

}

?>
