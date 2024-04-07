# Guia de Configuração do Ambiente

Este guia detalha os passos necessários para configurar o ambiente de desenvolvimento para este projeto.

## Instalação do Node.js utilizando NVM (Node Version Manager)

Para ter múltiplas versões do Node.js instaladas e alternar entre elas facilmente, recomendamos o uso do NVM. Siga os passos abaixo:

1. Acesse o [link do NVM para Windows](https://github.com/coreybutler/nvm-windows/releases/tag/1.1.12).

2. Baixe o arquivo `nvm-setup.exe`.

3. Execute o arquivo baixado e siga as instruções de instalação.

4. Abra o CMD (Command Prompt) ou o PowerShell.

5. Execute os seguintes comandos, substituindo `14.17.5` pela versão do Node.js desejada:

```bash
nvm install 14.17.5

nvm use 14.17.5
```
## Instalação das Dependências do Projeto

Após configurar o Node.js com sucesso, siga os passos abaixo para instalar as dependências deste projeto:

1. Navegue até o diretório raiz do projeto.

2. Execute o seguinte comando para instalar as dependências:

```bash
npm install ou npm i
```

## Execução do Projeto

Para iniciar o projeto, execute o seguinte comando:

```bash
npm run start
```

Isso iniciará a aplicação, que deve abrir automaticamente a aplicação electron.

---
**Observação**: Certifique-se de que todas as dependências estão corretamente instaladas e configuradas antes de executar o projeto.
