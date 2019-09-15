angular.module('starter.services',[])
.factory('BlankFactory',[function(){}])
.service('desbravadorAPI',[function(){
    this.getDesbravadores = function(){
        var desbravadores = [];
            if(typeof localStorage.desbravadores != 'undefined'){
                desbravadores = JSON.parse(localStorage.desbravadores);
            }
        return desbravadores;
    }
    this.getDesbravador = function(id){
        var desbravador = [];
            if(typeof localStorage.desbravadores != 'undefined'){
                desbravador = JSON.parse(localStorage.desbravadores);
            }
        return desbravador[id];
    }    
    this.addDesbravador = function(desbravador){
        var desbravadores = [];
            if(typeof localStorage.desbravadores != 'undefined'){
                desbravadores = JSON.parse(localStorage.desbravadores);
            }
                desbravadores.push(desbravador);
                    var textLocalStorage = JSON.stringify(desbravadores); 
                        localStorage.setItem('desbravadores',textLocalStorage);
    }
    this.updateDesbravador = function(desbravador){
        var desbravadores = [];
            if(typeof localStorage.desbravadores != 'undefined'){
                desbravadores = JSON.parse(localStorage.desbravadores);
            }
                desbravadores[parseInt(desbravador.id,10)]=desbravador;
                    var textLocalStorage = JSON.stringify(desbravadores); 
                        localStorage.setItem('desbravadores',textLocalStorage);
    }
    this.deleteDesbravador = function(desbravador){
        var desbravadores = [];
            if(typeof localStorage.desbravadores != 'undefined'){
                desbravadores = JSON.parse(localStorage.desbravadores);
            }
                desbravadores = desbravadores.filter(function (desbravadores){
                    return desbravadores.nome !== desbravador.nome;
                });
                    localStorage.setItem('desbravadores',JSON.stringify(desbravadores));
    }  
    this.pesquisarDesbravadorPorUnidade = function(idUnidade){
        var desbravadores = [];
            var auxiliar = [];
                var lUnidades = [{nome:"F22"},{nome:"Falcon"},{nome:"Mirrage"},{nome:"Legacy"}];
                    //resgatar dados
                    if(typeof localStorage.desbravadores != 'undefined'){
                        desbravadores = JSON.parse(localStorage.desbravadores);
                    }
                        //loop
                        desbravadores.forEach(function(objeto) { 
                            var  nomeUnidade = lUnidades[idUnidade].nome;
                            if(nomeUnidade == objeto.unidade){
                                console.log(objeto.unidade);
                                auxiliar.push(objeto);
                            }
                        });    
                            return auxiliar;
    }            
}])
.service('apontamentosAPI',[function(){
    this.getApontamentos = function(){
        var apontamentos = [];
            if(typeof localStorage.apontamentos != 'undefined'){
                apontamentos = JSON.parse(localStorage.apontamentos);
            }
                    
        return apontamentos;
    }
    this.getApontamentosUnidade = function(idUnidade){
        var apontamentos = [];
            var auxiliar = [];
                var lUnidades = [{nome:"F22"},{nome:"Falcon"},{nome:"Mirrage"},{nome:"Legacy"}];
                    if(typeof localStorage.apontamentos != 'undefined'){
                        apontamentos = JSON.parse(localStorage.apontamentos);
                    }
                    console.log('dentro do service');
                    console.log(apontamentos);
                    //loop
                    apontamentos.forEach(function(objeto) { 
                        var nomeUnidade = lUnidades[idUnidade].nome;
                        if(nomeUnidade == objeto.dbv.unidade){
                            console.log('unidade vai '+nomeUnidade);
                            auxiliar.push(objeto);
                        }
                    }); 
                    console.log('o que esta saindo');
                    console.log(auxiliar);
                        //return apontamentos;
                        return auxiliar;
    }    
    this.addApontamento = function(apontamento){
        var apontamentos = [];
            if(typeof localStorage.apontamentos != 'undefined'){
                apontamentos = JSON.parse(localStorage.apontamentos);
            }
            apontamentos.push(apontamento);
                    var textLocalStorage = JSON.stringify(apontamentos); 
                        localStorage.setItem('apontamentos',textLocalStorage);
                            console.log('area do servico');
                            console.log(apontamentos);
    }
    this.excluirApontamento = function(obj){
        var apontamentos = [];
            if(typeof localStorage.apontamentos != 'undefined'){
                apontamentos = JSON.parse(localStorage.apontamentos);
            }
                var acahaIdApontamento;
                    console.log(apontamentos);
                        for(var pos in apontamentos){
                            if(apontamentos[pos].dbv.$$hashKey === obj.dbv.$$hashKey){
                                acahaIdApontamento = pos;
                            }
                        }
                            apontamentos.splice(acahaIdApontamento, 1); 
                                console.log('servico excluir');
                                console.log(apontamentos);
                                    //var textLocalStorage = JSON.stringify(apontamentos);
                                    localStorage.setItem('apontamentos',JSON.stringify(apontamentos));    
                                        //    return true;
                                        return true;
    }
}])

.service('almocharifadoAPI',[function(){
    this.getAlmocharifado = function(){
        var almocharifados = [];
            if(typeof localStorage.almocharifados != 'undefined'){
                almocharifados = JSON.parse(localStorage.almocharifados);
            }
        return almocharifados;
    }
    this.getAlmocharifados = function(){
    var almocharifados = [];
        var auxiliar = [];
            if(typeof localStorage.almocharifados != 'undefined'){
               almocharifados = JSON.parse(localStorage.almocharifados);
            }
            almocharifados.forEach(function(objeto) { 
                auxiliar.push(objeto);
            }); 
            return auxiliar;
    }       
    this.addAlmocharifado = function(almocharifado){
            var almocharifados = [];
                if(typeof localStorage.almocharifados != 'undefined'){
                    almocharifados = JSON.parse(localStorage.almocharifados);
                }
                almocharifados.push(almocharifado);
                        var textLocalStorage = JSON.stringify(almocharifados); 
                            localStorage.setItem('almocharifados',textLocalStorage);
    }
    this.updateAlmocharifado = function(item){
        console.log(item);
        console.log(item.id);
        var almocharifados = [];
            if(typeof localStorage.almocharifados != 'undefined'){
                almocharifados = JSON.parse(localStorage.almocharifados);
            }
            almocharifados[parseInt(item.id,10)]=item;
                    var textLocalStorage = JSON.stringify(almocharifados); 
                        localStorage.setItem('almocharifados',textLocalStorage);
    }    
    this.deleteAlmocharifado = function(almocharifado){
        var almocharifados = [];
            if(typeof localStorage.almocharifados != 'undefined'){
                almocharifados = JSON.parse(localStorage.almocharifados);
            }
                almocharifados = almocharifados.filter(function (almocharifados){
                    return almocharifados.item !== almocharifado.item;
                });
               
                localStorage.setItem('almocharifados',JSON.stringify(almocharifados));
    }   
}]);