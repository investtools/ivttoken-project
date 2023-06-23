export class Translate {
    private readonly locale: string

    constructor(locale: string) {
        this.locale = locale
    }

    public t(string: string) {
        if (this.locale === "pt-br") {
            switch (string) {
                case "": return ""
                case "-": return "-"
                case "null": return "-"
                case "Year": return "Ano"
                case "Enter": return "Entrar"
                case "Search": return "Procurar"
                case "Loading": return "Carregando"
                case "You are here!": return "Você está aqui!"
                case "Register or Login": return "Entre ou Registre-se"

                // main
                case "Internet Service Providers": return "Provedores de Serviço de Internet"
                case "Connecting schools worldwide": return "Conectando escolas pelo mundo"
                case "Schools Using Connection": return "Escolas Usando Conexão"
                case "Benefited Students": return "Estudantes Beneficiados"
                case "Connected Schools": return "Escolas Conectadas"
                case "Register School": return "Registrar Escola"
                case "Register ISP": return "Registrar Provedor"
                case "About The Project": return "Sobre o Projeto"
                case "Project Giga Token is a blockchain initiative aimed at global connectivity. It uses a digital currency to reward ISP's for connecting schools, promoting equal internet access and enhancing educational opportunities worldwide.": return "O Projeto Giga Token é uma iniciativa de blockchain voltada para a conectividade global. Ele usa uma moeda digital para recompensar os provedores de serviços de Internet por conectar escolas, promovendo acesso igual à internet e aprimorando oportunidades educacionais em todo o mundo."
                case "Diagnosis": return "Diagnóstico"
                case "Through the Connected School Index, we ensure schools are prepared and equipped to participate in the GigaToken program.": return "Por meio do Índice Escola Conectada, garantimos que as escolas estão preparadas e equipadas para participar do programa GigaToken."
                case "Connection": return "Conexão"
                case "We forge connections between schools and local internet providers, thereby ensuring the expansion and sustainability of our project.": return "Criamos conexões entre escolas e provedores de internet locais, garantindo assim a expansão e sustentabilidade do nosso projeto."
                case "Monitoring": return "Monitoramento"
                case "We keep a real-time check on the connectivity in schools using our dedicated platform, ensuring secure and high-quality internet access for students.": return "Fazemos um acompanhamento em tempo real da conectividade nas escolas usando nossa plataforma dedicada, garantindo acesso seguro e de alta qualidade à internet para os alunos."
                case "Measurement": return "Mensuração"
                case "We measure the impact of our efforts through predetermined indicators. This process is vital to demonstrate how high-speed internet can significantly enhance student performance.": return "Medimos o impacto de nossos esforços por meio de indicadores predefinidos. Este processo é vital para demonstrar como a internet de alta velocidade pode melhorar significativamente o desempenho dos alunos."
                case "Our History": return "Nossa História"
                case "We emerged in 2007 with an ambitious goal.": return "Surgimos em 2007 com uma meta ambiciosa."
                case "We are a company focused on the best technology solutions for the financial market, operating with excellence in service and with a high level of technological innovation.": return "Somos uma empresa focada nas melhores soluções tecnológicas para o mercado financeiro, operando com excelência no serviço e com alto nível de inovação tecnológica."
                case "Born with a focus only on solutions for brokerage firms, Investtools has always grown in search of important and unprecedented solutions for the financial market. In 2009, Perform It is developed as an innovative software where the client could have full control of the investment flow of his asset management firm. In 2014, under the command of new partners, the company was re-founded. In 2017, new products and companies emerge, such as Grana Capital, Arcon It and Blockchain Studio. In the last four years, we have considerably increased the number of clients, expanded our team and continued to develop new technological tools. ": return "Nascemos com um foco apenas em soluções para corretoras de valores, a Investtools sempre cresceu em busca de soluções importantes e inéditas para o mercado financeiro. Em 2009, o Perform It é desenvolvido como um software inovador onde o cliente poderia ter controle total do fluxo de investimentos de sua gestora de ativos. Em 2014, sob o comando de novos parceiros, a empresa foi refundada. Em 2017, surgem novos produtos e empresas, como Grana Capital, Arcon It e Blockchain Studio. Nos últimos quatro anos, aumentamos consideravelmente o número de clientes, expandimos nossa equipe e continuamos a desenvolver novas ferramentas tecnológicas."
                case "This is just the beginning of a path with many innovations ahead, always developing the best solutions for the market.": return "Este é apenas o começo de um caminho com muitas inovações pela frente, sempre desenvolvendo as melhores soluções para o mercado."
                case "We are driven by the challenge of constant innovation and user satisfaction. We work to become a reference in the market, as a company of technological excellence and a reference in the financial area.": return "Somos movidos pelo desafio da inovação constante e pela satisfação do usuário. Trabalhamos para nos tornar uma referência no mercado, como uma empresa de excelência tecnológica e uma referência na área financeira."

                // access denied
                case "Access Denied!": return "Acesso Negado!"
                case "You do not have permission to access this page.": return "Você não tem permissão para acessar esta página."

                // navbar 
                case "Institutional": return "Institucional"
                case "Collaboration": return "Colaboração"
                case "Testimonials": return "Depoimentos"
                case "History": return "História"
                case "Join": return "Participe"
                case "About": return "Sobre"

                // filter
                case "Search:": return "Procurar:"
                case "Filter by:": return "Filtrar por:"

                // paginate
                case "Page": return "Página"
                case "of": return "de"
                case "First": return "Primeira"
                case "Previous": return "Anterior"
                case "Next": return "Próxima"
                case "Last": return "Última"
                case "items per page": return "itens por página"

                // register context
                case "Go to Sign-Up": return "Ir Para o Cadastro"
                case "Select Your Role": return "Selecione Sua Posição"
                case "Sign-Up": return "Cadastre-se"
                case "Register Your Credentials": return "Registre Suas Credenciais"
                case "Company Name": return "Nome da Empresa"
                case "Register Provider": return "Cadastrar Provedor"
                case "Register School Admin": return "Cadastrar Admin Escolar"
                case "Register Admin": return "Cadastrar Admin"
                case "Register Internet Provider": return "Cadastrar Provedor"
                case "School's CNPJ": return "CNPJ da Escola"
                case "Select Your Team": return "Selecione Sua Entidade"

                // isp context 
                case "Giga Token - PROVIDER": return "Giga Token - PROVEDOR"
                case "Benefits": return "Benefícios"
                case "Benefit": return "Benefício"
                case "My Contracts": return "Meus Contratos"
                case "My Information": return "Minhas Informações"
                case "Balance": return "Saldo"
                case "Token Amount": return "Total de Tokens"
                case "Unlocked Tokens": return "Tokens Desbloqueados"
                case "Locked Tokens": return "Tokens Bloqueados"
                case "Spent Tokens": return "Tokens Gastos"
                case "Tokens History": return "Histórico de Tokens"
                case "Select a School": return "Selecione Uma Escola"
                case "Selected School": return "Escola Selecionada"
                case "See Contract": return "Ver Contrato"
                case "Price": return "Preço"
                case "Date": return "Data"
                case "Transaction": return "Transação"
                case "Transactions": return "Transações"
                case "History": return "Histórico"
                case "Exchange": return "Trocar"
                case "Tax Break": return "Incentivo Fiscal"
                case "Send Contract": return "Enviar Contrato"
                case "My Schools": return "Minhas Escolas"
                case "Proceed with contract": return "Continuar com o contrato"

                // admin context
                case "Create School": return "Criar Escola"
                case "School Catalog": return "Catálogo de Escolas"
                case "Assign Tokens to School": return "Atribuir Tokens à Escola"
                case "Contracts": return "Contratos"
                case "Contract": return "Contrato"
                case "Unlock ISP Tokens": return "Desbloquear Tokens"
                case "Authorize User": return "Autorizar Usuário"
                case "Authorized Users": return "Usuários Autorizados"
                case "Authorized By": return "Autorizado Por"
                case "Authorized At": return "Data da Autorização"
                case "Select an Administrator": return "Selecione um Administrador"
                case "School's Name": return "Nome da Escola"
                case "Schools": return "Escolas"
                case "School": return "Escola"
                case "Internet Provider": return "Provedor"
                case "Created At": return "Data de Criação"
                case "Create New School": return "Criar Nova Escola"
                case "Reviewed By": return "Revisado Por"
                case "Reviewed At": return "Data de Revisão"
                case "Reviewer Team": return "Entidade"
                case "Pending Contracts": return "Contratos Pendentes"
                case "Approve": return "Aprovar"
                case "Deny": return "Negar"
                case "Assign Tokens": return "Atribuir Tokens"
                case "Schools Without Tokens": return "Escolas Sem Tokens"
                case "Selected School": return "Escola Selecionada"
                case "Select": return "Selecionar"
                case "Assign": return "Atribuir"
                case "Credentials": return "Credenciais"
                case "Role": return "Posição"
                case "Government": return "Governo"
                case "Team": return "Entidade"
                case "Number": return "Número"
                case "Internet Service Provider": return "Provedor de Internet"
                case "School Administrator": return "Administrador Escolar"
                case "Pending Transactions": return "Transações Pendentes"
                case "Sign": return "Assinar"
                case "Signatures": return "Assinaturas"
                case "No signatures": return "Sem assinaturas"

                // school admin context
                case "My School": return "Minha Escola"
                case "Connectivity Report": return "Relatório de Conectividade"
                case "School Details": return "Detalhes da Escola"
                case "Connectivity Reports": return "Relatórios de Conectividade"
                case "Connectivity Chart": return "Gráfico de Conectividade"
                case "Giga Token - SCHOOL": return "Giga Token - ESCOLA"
                case "Got it!": return "Entendi!"
                case "Follow Us!": return "Siga a InvestTools!"
                case "Send Report": return "Enviar Relatório"
                case "Report Connection": return "Reportar Conexão"
                case "Days Without Internet": return "Dias Sem Internet"
                case "Average Speed Mb/s": return "Velocidade Média Mb/s"
                case "Connection Quality": return "Qualidade da Conexão"
                case "Report": return "Relatório"
                case "Connectivity Percentage": return "Conectividade"
                case "No Reports Available": return "Nenhum relatório disponível"
                case "Name": return "Nome"
                case "State": return "Estado"
                case "Municipality": return "Município"
                case "City": return "Cidade"
                case "Zip Code": return "Cep"
                case "Address": return "Endereço"
                case "Cnpj": return "CNPJ"
                case "Inep Code": return "Código Inep"
                case "Administrator": return "Administrador"
                case "E-Mail": return "E-Mail"
                case "Tokens": return "Tokens"
                case "Provider": return "Provedor"
                case "Reports": return "Relatórios"
                case "See Reports": return "Ver Relatórios"

                // contract status
                case "Pending": return "Pendente"
                case "Approved": return "Aprovado"
                case "Denied": return "Negado"

                // failed to sign transaction modal
                case "Oops! The transaction could not be signed...": return "Opa! A transação não pôde ser assinada..."
                case "Either there was a problem with the transaction, or you don't have MetaMask installed on your browser.": return "Houve um problema com a transação, ou você não tem o MetaMask instalado no seu navegador."
                case "Please try again later!": return "Por favor, tente novamente mais tarde!"

                // no transaction modal
                case "Oops! There are no pending transactions...": return "Opa! Não há transações pendentes..."
                case "There are currently no pending transactions to sign.": return "Atualmente não há transações pendentes para assinar."

                // wrong user role modal
                case "Sorry, you do not have the necessary permissions to register with the selected role.": return "Desculpe, você não possui as permissões necessárias para se registrar com a posição selecionada."
                case "Please contact the administrator for more information.": return "Por favor, entre em contato com um administrador para obter mais informações."

                // approve contract modal
                case "Contract Approved!": return "Contrato Aprovado!"
                case "This contract has been approved.": return "Este contrato foi aprovado."

                // deny contract modal
                case "Contract Denied!": return "Contrato Negado!"
                case "This contract has been denied.": return "Este contrato foi negado."

                // invalid email modal
                case "Oops! Invalid e-mail address :(": return "Opa! Endereço de e-mail inválido :("
                case "Please enter a valid e-mail address and try again.": return "Por favor, insira um endereço de e-mail válido e tente novamente."

                // incomplete fields modal
                case "Oops! We couldn't submit your responses :(": return "Opa! Não foi possível enviar suas respostas :("
                case "You didn't fill out all the fields before submitting.": return "Você não preencheu todos os campos antes de enviar."
                case "Please fill out all fields and try again!": return "Por favor, preencha todos os campos e tente novamente!"

                // error message
                case "Oops! Something went wrong :(": return "Opa! Infelizmente algo deu errado :("
                case "We could not access the data you were looking for.": return "Não foi possível acessar os dados que você estava procurando."

                // form sent modal
                case "Responses successfully submitted!": return "Respostas enviadas com sucesso!"
                case "We have received the submitted data and are processing it.": return "Recebemos os dados enviados e estamos processando."
                case "Thank you very much! :)": return "Muito obrigado! :)"

                // giga token title
                case "Giga Token is a social impact project in collaboration with UNICEF that aims to bridge the digital divide by connecting underprivileged schools to the internet.": return "Giga Token é um projeto de impacto social em colaboração com a UNICEF que visa reduzir a divisão digital conectando escolas carentes à internet."
                case "The project uses a blockchain-based token, GigaToken (GIGA), to incentivize internet service providers (ISPs) to connect schools to the internet.": return "O projeto utiliza um token baseado em blockchain, GigaToken (GIGA), para incentivar provedores de serviços de internet (ISPs) a conectar as escolas à internet."
                case "ISPs can earn GigaTokens by connecting schools to the internet and ensuring the quality of the connection.": return "Os ISPs podem ganhar GigaTokens conectando escolas à internet e garantindo a qualidade da conexão."
                case "These tokens can then be exchanged for tax incentives or other rewards.": return "Esses tokens podem ser trocados por incentivos fiscais ou outras recompensas."
                case "The project is designed to improve educational opportunities for underprivileged students by providing access to online resources and promoting digital inclusion.": return "O projeto é pensado para melhorar as oportunidades educacionais para estudantes carentes, fornecendo acesso a recursos on-line e promovendo a inclusão digital."

                // not enough tokens modal
                case "You do not have enough tokens to execute this transaction.": return "Você não tem tokens suficientes para executar esta transação."
                case "Please try again when you have enough tokens to exchange for this benefit.": return "Por favor, tente novamente quando tiver tokens suficientes para trocar por este benefício."

                // no contract modal
                case "Oops! There are no pending contracts...": return "Opa! Não há contratos pendentes..."
                case "There are currently no pending contracts to review.": return "Atualmente não há contratos pendentes para revisar."
                case "Please check back later!": return "Por favor, verifique novamente mais tarde!"

                // add number modal
                case "Don't forget to add the number to the address field.": return "Não esqueça de adicionar o número no campo de endereço."
                case "After the address autocomplete, you need to add the number.": return "Depois do preenchimento automático do endereço, é necessário adicionar o número."
                case "Add the number and create the school.": return "Adicione o número e crie a escola."

                // confirm purchase modal
                case "Are you sure you want to proceed?": return "Tem certeza que deseja prosseguir?"
                case "Proceed with exchange": return "Continuar com a troca"
                case "Cancel": return "Cancelar"

                // purchased benefit modal
                case "Benefit successfully purchased!": return "Benefício adquirido com sucesso!"
                case "We have received your exchange and are processing it.": return "Recebemos sua troca e estamos processando."
                case "Thank you very much! :)": return "Muito obrigado! :)"

                // contract send modal
                case "Contract successfully sent!": return "Contrato enviado com sucesso!"
                case "We have sent your contract for review.": return "Enviamos seu contrato para avaliação."
                case "One of the administrators will review it shortly.": return "Em breve um dos administradores irá revisá-lo."
                case "Check the status of your contract in the 'My Contracts' menu.": return "Fique atento ao status do seu contrato no menu 'Meus Contratos'."

                // no schools isp modal
                case "Oops! It seems like you don't have any contracts with schools yet :(": return "Ops! Parece que você ainda não possui nenhum contrato com escolas."
                case "In order to access the school reports, you need to have at least one active contract.": return "Para ter acesso aos relatórios das escolas, você precisa ter pelo menos um contrato ativo."
                case "Please select one school to send a contract.": return "Por favor, selecione uma escola para enviar um contrato."

                // school has no provider modal
                case "Sorry, you cannot submit a connectivity report as your school has no internet provider yet.": return "Desculpe, você não pode enviar um relatório de conectividade pois a sua escola ainda não tem nenhum provedor de internet."

                // duplicated report modal
                case "A connectivity report for this month has already been created.": return "Já foi criado um relatório de conectividade para este mês."
                case "Please select another month or contact the administrator for assistance.": return "Por favor, selecione outro mês ou entre em contato com o administrador para obter ajuda."

                // months
                case "Month": return "Mês"
                case "January": return "Janeiro"
                case "February": return "Fevereiro"
                case "March": return "Março"
                case "April": return "Abril"
                case "May": return "Maio"
                case "June": return "Junho"
                case "July": return "Julho"
                case "August": return "Agosto"
                case "September": return "Setembro"
                case "October": return "Outubro"
                case "November": return "Novembro"
                case "December": return "Dezembro"

                // connection quality
                case "Select connection quality": return "Selecione a qualidade da conexão"
                case "Low": return "Baixa"
                case "Medium": return "Mediana"
                case "High": return "Alta"

                default: return string
            }
        } else return string
    }
}