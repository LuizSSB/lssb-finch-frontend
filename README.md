
# Teste Finch
Aplicação AngularJS de teste para a vaga de *Desenvolvedor/Analista*, na empresa Finch.

A aplicação possui autenticação/cadastro e permite a visualização, edição e upload de registros de protestos de títulos de pagamento.

## Características
 - Linguagens: HTML5/JavaScript/CSS;
 - Framework: AngularJS 1.7.5;
 - Dependências:
  - angular: "^1.7.5"
  - angular-input-masks: "^4.2.1",
  - angular-loader: "^1.7.5",
  - angular-local-storage: "^0.7.1",
  - angular-route: "^1.7.5",
  - angular-sweetalert: "^1.1.2",
  - html5-boilerplate: "0.0.1".

Projeto criado a partir do angular-seed. Usa a referência inclusa do bootstrap incluso para UI.

Tela de login com dupla função: funciona para cadastro também. Além disso, permite definir o endereço do servidor.

Listagem de protestos permite filtragem por faixa de valor do protesto, código do banco e nome do devedor.

Edição de protestos exibe também o usuários responsável pela criação do protesto, bem como as datas de criação e última alteração.

Alertas de erro/sucesso usam lib SweetAlert, para maior elegância visual.

## Composição principal
### Data Transfer Objects
O arquivo *DTO.js* contém os DTOs do projeto, i.e., mapeamento dos objetos JSON, envolvidos nas requisições.

São eles:

 - `User`: usuário que é registrado ou que faz login.
 - `SearchProtestsRequest`: dados de requisição para busca de protestos.
 - `UpdateProtestRequest`: dados de requisição para atualização de protesto específico.
 - `UploadProtestsRequest`: dados de inclusão de novos protestos lidos de arquivo.

### Serviços
O diretório *core* contém vários serviços AngularJS utilizados para acessar e manipular os dados da aplicação, bem como utilitários;

Inclui os seguintes serviços:
 - `ServiceClient`: consumo dos web services em maior baixo-nível.
 - `Auth`: gestão da autenticação e cadastro, bem como lidar com situações.
 - `ProtestDataCtrl`: gestão da busca, aquisição, alteração e upload de novos protestos.
 - `Config`: gestão de dados genéricos que precisam ser armazenados pela aplicação (usuário logado e endereço do servidor).
 - `AlertUtil`: utilitário de alerta, para evitar referenciar o módulo ngSweetAlert.

### Componentes e Templates
O diretório raiz contém subdiretórios com os componentes e templates utilizados para gerenciar as telas da aplicação.

Inclui os seguintes componentes:
 - `login`: tela padrão da aplicação, cuida de definir o endereço do servidor, autenticação e cadastro.
 - `protests`: tela de listagem e filtragem dos protestos cadastrados, com opção de logout.
 - `protestsUpload`: tela de upload de novos protestos a partir de arquivo.
 - `protestEdit`: tela de edição de protesto, título de pagamento e devedor.

### TODO

 - Testes de unidade;
 - Paginação na listagem de protestos;
 - Mais filtros na busca.
 - Cabeçalho nas telas logadas.

-- Luiz Soares dos Santos Baglie (luizssb.biz *at* gmail *dot* com)
