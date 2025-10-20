# Cadastro de Veículos - Teste Técnico Tinnova

Interface para gerenciamento de veículos, desenvolvida como parte do processo seletivo da Tinnova. O projeto permite listar, criar, editar, excluir e filtrar veículos.

## 📸 Capturas de Tela

Aqui estão algumas capturas de tela da aplicação em funcionamento:

## 🛠️ Tecnologias Principais

* **React com Vite**
* **TypeScript**
* **Tailwind CSS** para estilização
* **shadcn/ui** para componentes
* **React Hook Form + Zod** para formulários e validação
* **Axios** para requisições HTTP

## 🚀 Como Executar

1.  **Clone o repositório**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Configure a API**
    Crie um arquivo `.env` na raiz do projeto e adicione a URL da API:
    ```ini
    VITE_API_BASE_URL=http://localhost:8080
    ```

4.  **Execute a aplicação**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## 📜 Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Gera a build de produção.
* `npm run lint`: Executa a análise estática do código.