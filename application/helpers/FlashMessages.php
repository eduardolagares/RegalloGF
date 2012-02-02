<?php
class Zend_View_Helper_FlashMessages extends Zend_View_Helper_Abstract
{
    public function flashMessages()
    {
        $messages = Zend_Controller_Action_HelperBroker::getStaticHelper('FlashMessenger')->getMessages();
        $output = '';
        
        if (!empty($messages) && count($messages) > 0) {
//            $output .= '<ul id="messages">';
            foreach ($messages as $message) {
                $class = key($message);
                
                if($class == "error") {
                    $class = "big-message error";
                }
                else if($class == "success") {
                    $class = "big-message success";
                }
                else if($class == "info") {
                    $class = "big-message info";
                }
                else if($class == "notice") {
                    $class = "big-message warning";
                }
                else {
                    $class = "big-message info";
                }
                
                $output = '<div style="margin: 10px;" class="' .$class. '"><h2>' . current($message) . '</h2><p></p></div>';
            }
//            $output .= '</ul>';
        }
       
        return $output;
    }
}