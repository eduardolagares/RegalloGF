<?php

class Default_CadastroController extends Zend_Controller_Action {

    protected $_request = null;
    protected $_model = null;

    public function init() {
        $front = Zend_Controller_Front::getInstance();
        $this->_request = $front->getRequest();
    }

    public function indexAction() {
        
    }

    public function avisoAction() {
        $namespace = new Zend_Session_Namespace('cadastro');
        $this->view->email = $namespace->email;
        $codigo = $namespace->codigo;
        $nome = $namespace->nome;
        $namespace->setExpirationSeconds(1);

        $link = "http://localhost/asteroid/trunk/web/asteroid/public/cadastro/confirmar/codigo/" . $codigo;

        $config = array('ssl' => 'tls',
                        'port' => 587,
                        'auth' => 'login',
                        'username' => 'noreply@lidersat.com.br',
                        'password' => 'asteroid123'
                   );

        $transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', $config);

        $mail = new Zend_Mail();
        $mail->setBodyHtml($this->gerarHtml($nome, $link));

        $mail
                ->setFrom("naoresponda@lidersat.com.br", "Equipe Asteroid")
                ->addTo("anesthesiabrain@gmail.com", $nome)
                ->setSubject(utf8_decode("Confirmação de email - Conta Asteroid"));

        $mail->send($transport);
    }

    
    
    public function confirmarAction() {
        $codigo = $this->_request->getParam("codigo");

        $this->_model = new DbTable_Cliente();

        $q = $this->_model->select()
                ->setIntegrityCheck(false)
                ->from("cliente as c", "c.*")
                ->where("c.codigo_confirmacao = ?", $codigo);

        $cliente = $this->_model->fetchRow($q)->toArray();
       
        if (!empty($cliente)) {
            $cliente["confirmado"] = 1;
            $where = $this->_model->getAdapter()->quoteInto('codigo_confirmacao = ?', $codigo);
            $this->_model->update($cliente, $where);
            $this->view->msg = "Cadastro aprovado. Por favor faça o login no sistema.";
        } else { 
            $this->view->msg = "Código inválido ou inexistente.";
        }
    }
    
    
    

    public function salvarAction() {
        $this->_model = new DbTable_Cliente();
        $modelEndereco = new DbTable_Endereco();

        if ($this->_request->isPost()) {
            try {
                $endereco = $this->_request->getParam("endereco");
                $cliente = $this->_request->getParam("cliente");
                $confirma = $this->_request->getParam("confirma");
                
                if ($cliente["email"] != $confirma["email"]) {
                    $this->_helper->FlashMessenger(array("error" => "Emails diferentes!"));
                    $this->_redirect("/cadastro/salvar");
                    return;
                }
                
                if ($cliente["senha"] != $confirma["senha"]) {
                    $this->_helper->FlashMessenger(array("error" => "Senhas diferentes!"));
                    $this->_redirect("/cadastro/salvar");
                    return;
                }
                
                
                
                $cliente["confirmado"] = 0;
                $cliente["codigo_confirmacao"] = md5(rand(1, 100) . $cliente["nome"]);

                $modelEndereco->insert($endereco);
                $idEndereco = $modelEndereco->getLastId();
                $cliente["endereco_id"] = $idEndereco;
                $this->_model->insert($cliente);


                $namespace = new Zend_Session_Namespace('cadastro');
                $namespace->email = $cliente["email"];
                $namespace->codigo = $cliente["codigo_confirmacao"];
                $namespace->nome = $cliente["contato"];

                $this->_redirect("/cadastro/aviso");
            } catch (Exception $ex) {
                $this->_helper->FlashMessenger(array("error" => "Falha ao cadastrar sua nova conta. Tente mais tarde"));
            }
        }
    }
    

    
    private function gerarHtml($nome, $link) {
        $html = "<div>
                    Caro <b>{$nome}</b>, para finalizar o seu cadastro no sistema Asteroid é necessário a confirmação deste email.<br>
                    Para confirmar clique no link: <a href='{$link}' alt='Confirmação de conta'>{$link}</a> <br>
                    <br>
                    Caso você não tenha realizado nenhum cadastro, e esta mensagem apareceu para você, fique tranquilo, apenas não <br>
                    confirme o email, nenhum acesso será liberado para este endereço sem a confirmação do mesmo.<br>
                    <br>
                    Dúvidas entre em contato conosco. <br>
                    <a href='http://lidersat.com.br' alt='LiderSat'>http://www.lidersat.com.br</a><br>
                    <hr>
                    Atenciosamente, equipe Asteroid.
                </div>";
        return utf8_decode($html);
    }

}

