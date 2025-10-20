# Cadastro de Veículos - Teste Técnico Tinnova

Interface para gerenciamento de veículos, desenvolvida como parte do processo seletivo da Tinnova. O projeto permite listar, criar, editar, excluir e filtrar veículos.

## 📸 Capturas de Tela

Aqui estão algumas capturas de tela da aplicação em funcionamento:

<img width="1829" height="860" alt="image" src="https://github.com/user-attachments/assets/29aeace7-385f-4e72-a668-c8a5b6b702b5" />
<img width="1831" height="766" alt="image" src="https://github.com/user-attachments/assets/22512489-9216-401f-a84e-74c4ca3c04ca" />
<img width="1906" height="900" alt="image" src="https://github.com/user-attachments/assets/8833c3ec-2622-49d6-ab55-c7aca9de0224" />
<img width="1907" height="896" alt="image" src="https://github.com/user-attachments/assets/00ed1d65-2653-405e-8fd0-9129d91e8e90" />

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
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências**
    ```bash
    # Com npm
    npm install
    ```
    ```bash
    # Com Bun
    bun install
    ```

3.  **Configure a API**
    Crie um arquivo `.env` na raiz do projeto e adicione a URL da API:
    ```ini
    VITE_API_VEHICLE_URL=http://localhost:8080
    ```

4.  **Execute a aplicação**
    ```bash
    # Com npm
    npm run dev
    ```
    ```bash
    # Com Bun
    bun run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## 📜 Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Gera a build de produção.
* `npm run lint`: Executa a análise estática do código.
