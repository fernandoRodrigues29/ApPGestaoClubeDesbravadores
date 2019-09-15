angular.module('starter.controllers',[])
.controller('principalCtrl', function($scope,$location){
    $scope.texto = "Sistema Gestão De Clube!";
    $scope.go = function ( path ) {
        $location.path( path );
      };

})///inserion do a api via service
.controller('dbvCtrl', function($scope,$ionicModal,desbravadorAPI){
    $scope.texto = "desbravadores no scopo!";
        $scope.permitirExcluir = false;
            $scope.btnPermitirExcluir = function(){
                $scope.permitirExcluir = !$scope.permitirExcluir;
            }
            //botao excluir
            $scope.excluirDbv = function(dbv){
                desbravadorAPI.deleteDesbravador(dbv);
                    obterDesbravadores();   
            }
    $scope.dadosDesbravadorEditar = {};
    $scope.resgatarDesbravador = function(desbravadorDado) {
       $scope.dadosDesbravadorEditar = desbravadorDado;
     };     
    ///obter desbravadores, [refatorar isso para um serviço]
    function obterDesbravadores(){
        var ldbv = desbravadorAPI.getDesbravadores();
        var lunid = [{unidade:"F22"},{unidade:"Falcon"},{unidade:"Mirrage"},{unidade:"Legacy"}];
        $scope.dbvs = ldbv;
        $scope.lUnidades = lunid;
        return ldbv;
    };

    obterDesbravadores();
    ///abrir tela modal
    $scope.abirTelaContato = function(){
        $scope.desbravador ={nome:'',idade:'',unidade:''};
        $scope.openModal();
    };
    ///fechar modal
    $scope.fecharTelaContato = function(){
        $scope.closeModal();
    }
    ///editar modal
    ///abrir tela modal
    $scope.abirTelaEdtContato = function(){
        $scope.openEdtModal();
    };
    ///fechar modal
    $scope.fecharTelaEdtContato = function(){
        $scope.closeEdtModal();
    }    
    ///fim editar modal 
    //editar desbravador
    $scope.dadosEditar = function(){
        alert('foi clicado');
         $scope.contexto = "alterado";
     }
    ///salvar desbravador
    $scope.salvarContato = function(desbravador){
      ///call service
       desbravadorAPI.addDesbravador(desbravador);
       obterDesbravadores();
    }     
    ///fim abrir tela modal
   
    ///inicio modal
    $ionicModal.fromTemplateUrl('calebe.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      
      $scope.openModal = function() {
        $scope.modal.show();
      };
      
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
})
.controller('dbvIndividualCtrl', function($scope,$stateParams,desbravadorAPI){
  //função para 
  var numberIndex = $stateParams.ind;
    $scope.dadosDesbravador = {};
        //converte o parametro para inteiro
        var id = parseInt(numberIndex,10);
        ///carregar informações
        carregarDados =function(id){
            var dadosDoBanco = desbravadorAPI.getDesbravador(id);
                dadosDoBanco['id'] = id;
                    $scope.dadosDesbravador=dadosDoBanco;
        }
        carregarDados(numberIndex);    
        ///atualizar desbravador
        $scope.atualizarDesbravador = function(desbravador){
            ///call service
             desbravadorAPI.updateDesbravador(desbravador);
             carregarDados(desbravador.id);
          }         
})
.controller('undCtrl', function($scope,$ionicModal){
        function obterUnidades(){
            var lUnidades = [{nome:"F22"},{nome:"Falcon"},{nome:"Mirrage"},{nome:"lemosele"}];
            $scope.unidades = lUnidades;
            return lUnidades;
        };
            obterUnidades();
                $scope.vaiquedacerto = function(task) {
                    console.log('construido');
                };
                    ///abrir modal
                    $scope.abirTelaApontamento = function(){
                        $scope.desbravador ={nome:'',idade:'',unidade:''};
                        $scope.openModal();
                    };
                        ///fechar modal
                        $scope.fecharTelaApontamento = function(){
                            $scope.closeModal();
                        };
                                
                            $scope.openModal = function() {
                                $scope.modal.show();
                            };
                            
                            $scope.closeModal = function() {
                                $scope.modal.hide();
                            };        
})
.controller('secCtrl', function($scope,$ionicModal){
    function obterUnidades(){
        var lUnidades = [{nome:"F22"},{nome:"Falcon"},{nome:"Mirrage"},{nome:"Legacy"}];
            $scope.unidades = lUnidades;
                return lUnidades;
    };
    obterUnidades();
        ///abrir modal
        $scope.abirTelaApontamento = function(){
            $scope.desbravador ={nome:'',idade:'',unidade:''};
            $scope.openModal();
        };
            ///fechar modal
            $scope.fecharTelaApontamento = function(){
                $scope.closeModal();
            };
                $scope.openModal = function() {
                    $scope.modal.show();
                };
                    $scope.closeModal = function() {
                        $scope.modal.hide();
                    };  
})
.controller('secApontCtrl', function($scope,$stateParams,$ionicModal,desbravadorAPI,apontamentosAPI){
    var numberIndex = $stateParams.ind;
    var id = parseInt(numberIndex,10);
    $scope.idUnidade = id;
    function obterListaApontamentos(){
        console.log('apontamentos');
        console.log(apontamentosAPI.getApontamentosUnidade(id));
            $scope.listaApontamentos = apontamentosAPI.getApontamentosUnidade(id);
    }
    function obterUnidades(){
        var lDesbravadores = desbravadorAPI.pesquisarDesbravadorPorUnidade(id);
           $scope.desbravadores = lDesbravadores;
                return lDesbravadores;
    };

        obterUnidades();
        obterListaApontamentos();
        //deletar apontamento
        $scope.deletarApontamento = function(obj){
            console.log(obj);
            var retornar = apontamentosAPI.excluirApontamento(obj);
            obterListaApontamentos();
            
        }
        //função gerar relatorio
        $scope.funcaoGerarRelatorio = function(){
            var listaItenzApontamento = apontamentosAPI.getApontamentosUnidade(id);
                var textCompartilhar='';
                    for (var item in listaItenzApontamento) {
                      
                        var conteudo =listaItenzApontamento[item];         
                        var diaFormatado = JSON.stringify(conteudo.dia);
                        //console.log(diaFormatado);
                        textCompartilhar +='Dia: '+diaFormatado.substring(1,11)+
                        ' Presença: '+conteudo.presenca+
                        ' Tarefas: '+conteudo.tarefas+
                        ' Material: '+conteudo.material+
                        ' Disciplina: '+conteudo.diciplina+
                        ' Boa Ação: '+conteudo.boaAcao+
                        ' Biblia: '+conteudo.biblia+
                        ' Ano Biblico: '+conteudo.anoBiblico+
                        ' Mensalidade: '+conteudo.mensalidade+
                        ' Unidade: '+conteudo.id+' \n';                    
                    }
            //plugin compartilhar
            var message = {
                text: "Relatorio "+textCompartilhar 
            };
            window.socialmessage.send(message);
        }        
        //abrir modal
        $scope.abirTelaApontamento = function(desbravador,idUnidade) {
            $scope.apontamento ={
                dbv:desbravador,
                dia:null,
                presenca:false,
                tarefas:false,
                material:false,
                disciplina:false,
                boaAcao:false,
                biblia:false,
                anoBiblico:false,
                mensalidade:false,
                unidade:idUnidade
            };
            $scope.openModal();
        };

        $scope.salvarApontamento = function(apontamento){
            ///call service
                apontamentosAPI.addApontamento(apontamento);
                    $scope.listaApontamentos = apontamentosAPI.getApontamentosUnidade(apontamento.unidade);
                        $scope.closeModal();   
        } 
            ///inicio modal
            $ionicModal.fromTemplateUrl('calebe.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });
                ///fechar modal
                $scope.fecharTelaApontamento = function(){
                    $scope.closeModal();
                };
                    $scope.openModal = function() {
                        $scope.modal.show();
                    };
                        $scope.closeModal = function() {
                            $scope.modal.hide();
                        }; 
})
.controller('graficCtrl', function($scope){
    $scope.texto = "grafocps no scopo!";
})
.controller('almocharifadoCtrl', function($scope,$ionicModal,desbravadorAPI,almocharifadoAPI){    
    $scope.permitirExcluir = false;
        $scope.btnPermitirExcluir = function(){
            $scope.permitirExcluir = !$scope.permitirExcluir;
        }
                $scope.texto = "almocharifado!";
                    function obterListaAlmocharifados(){
                        //console.log(almocharifadoAPI.getAlmocharifados());
                        $scope.listaAlmocharifado = almocharifadoAPI.getAlmocharifados();
                    }
                        obterListaAlmocharifados();
        //salvar item
        $scope.salvarItem = function(item){
            almocharifadoAPI.addAlmocharifado(item);
             obterListaAlmocharifados();
        }
        //editar item
        $scope.AtualizarItem = function(item){
           
            almocharifadoAPI.updateAlmocharifado(item);
             obterListaAlmocharifados();
        }        

          $scope.excluirAlmocharifado = function(item){
            almocharifadoAPI.deleteAlmocharifado(item);
                obterListaAlmocharifados();   
        }
          $scope.funcaoGerarRelatorio = function(){
                var listaItensAlmocharifado = almocharifadoAPI.getAlmocharifados();
                    var textCompartilhar='';
                        for (var item in listaItensAlmocharifado) {
                            var conteudo =listaItensAlmocharifado[item];         
                            textCompartilhar +='Item: '+conteudo.item+' Qtd: '+conteudo.quantidade+' Descricao: '+conteudo.descricao+' \n';                    
                        }
                //plugin compartilhar
                alert(textCompartilhar);
                var message = {
                    text: "Relatorio "+textCompartilhar 
                };
                window.socialmessage.send(message);        
                                          
            }
/**/                         
        $scope.abirFormulario = function(){
            $scope.itemNoAlmocharifado ={item:'',quantidade:''};
            $scope.openModal();
        };
            $scope.fecharFormulario = function(){
            $scope.closeModal();
            };
            //formulario cadastar
                $ionicModal.fromTemplateUrl('formAlmocharifado.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.modal_1 = modal;
                });
                    $scope.openModal = function() {
                            $scope.modal_1.show();
                    };
                        $scope.closeModal = function() {
                            $scope.modal_1.hide();
                        };
            //formulario editar
            $ionicModal.fromTemplateUrl('formAlmocharifadoEditar.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal_2 = modal;
            });
                $scope.openModal2 = function() {
                        $scope.modal_2.show();
                };
                    $scope.closeModal2 = function() {
                        $scope.modal_2.hide();
                    };
            //abrir formulario editar
            $scope.editarFormulario = function(itemAlm,numberIndex){
                console.log(itemAlm);
                var id = parseInt(numberIndex,10);
                $scope.itemNoAlmocharifado ={item:itemAlm.item,descricao:itemAlm.descricao,quantidade:itemAlm.quantidade,id:id};
                $scope.openModal2();
            }; 
                $scope.fecharModal2 = function(){
                    $scope.closeModal2();
                };                                         
/**/
})
.controller('plugesCtrl',function($scope, $stateParams){
    $scope.padrao= function(){
        alert('chegou na area de testes');
    }
    $scope.enviarMSG= function(){
        str = JSON.stringify( window.socialmessage);
        
       $scope.textoPrintar = str;
       
        var message = {
            text: "padrão"
        };
        window.socialmessage.send(message); 
    }
   
})
.controller('deufulCtrl', function($scope, $stateParams) {
}); 