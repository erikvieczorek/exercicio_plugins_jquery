$(document).ready(function() {

    $('#telefone').mask('(00) 00000-0000')
    $('#CPF').mask('000.000.000-00')
    $('#CEP').mask('00000-000')

    // Adicionar uma regra de validação para o CPF
    $.validator.addMethod("validaCPF", function(value, element) {
        // Validação do CPF
        value = value.replace(/[^\d]+/g,'');
        if (value == '') return false;
        if (value.length != 11) return false;
        
        // Elimina CPFs invalidos conhecidos
        if (value == "00000000000" || 
            value == "11111111111" || 
            value == "22222222222" || 
            value == "33333333333" || 
            value == "44444444444" || 
            value == "55555555555" || 
            value == "66666666666" || 
            value == "77777777777" || 
            value == "88888888888" || 
            value == "99999999999") return false;
            
        // Valida o primeiro digito	
        let add = 0;
        for (i=0; i < 9; i ++)		
            add += parseInt(value.charAt(i)) * (10 - i);	
            let rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)		
                rev = 0;	
            if (rev != parseInt(value.charAt(9)))		
                return false;
            
        // Valida o segundo digito	
        add = 0;	
        for (i = 0; i < 10; i ++)		
            add += parseInt(value.charAt(i)) * (11 - i);	
        let rev2 = 11 - (add % 11);	
        if (rev2 == 10 || rev2 == 11)	
            rev2 = 0;	
        if (rev2 != parseInt(value.charAt(10)))
            return false;		
        return true;
    }, "CPF inválido");

    $('form').validate({
        rules: {
            primeiroNome: {
                required: true
            },
            segundoNome: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            telefone: {
                required: true
            },
            CPF: {
                required: true,
                validaCPF: true // Usar a regra de validação personalizada para CPF
            },
            CEP: {
                required: true
            },
            cidade: {
                required: true
            },
            estado: {
                required: true
            },
            bairro: {
                required: true
            },
            numero: {
                required: true
            },
            logradouro: {
                required: true
            }
        },
        messages: {
            primeiroNome: 'Por favor, insira o seu nome',
            segundoNome: 'Por favor, insira o seu sobrenome',
            CPF: 'Por favor, insira um CPF válido',
            email: 'Por favor, insira um e-mail válido',
            telefone: 'Por favor, insira um número de telefone válido'
        },
        submitHandler: function(form) {
            console.log(form),
            alert(`Cadastro efetuado com sucesso!`),
            form.reset()
        },
        invalidHandler: function(evento, validador) {
            let camposIncorretos = validador.numberOfInvalids();
            if (camposIncorretos) {
                alert(`Existem ${camposIncorretos} campos incorretos`)
            }
        }
    })
})