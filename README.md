# 🚀 Haxball Client Template

Este é um projeto base em **Electron** para criar seu próprio client desktop de Haxball. Ele foi desenvolvido para ser um "esqueleto" funcional, incluindo **Tema Escuro**, **FPS Desbloqueado** e **Discord RPC** pronto para uso.

---

## 🛠️ Requisitos Iniciais

Para usar este template e compilar seu próprio client, você precisa de:

1. **Node.js (LTS)**: [https://nodejs.org/](https://nodejs.org/)
2. **Editor de Código**: Recomendado VS Code.
3. **Ícone**: Um arquivo de imagem chamado `icon.ico` na pasta raiz (essencial para o processo de build).

---

## 📋 Como Criar sua Própria Versão (Passo a Passo)

### 1. Instalação
Abra o terminal (CMD ou PowerShell) dentro da pasta do projeto e instale as bibliotecas necessárias:

```bash
npm install
O comando npm install lê o arquivo package.json, identifica as ferramentas necessárias (Electron, Discord RPC, etc.) e as baixa automaticamente para a pasta node_modules.

2. Personalização
Para deixar o client com o seu nome e sua marca, altere os seguintes arquivos:

No arquivo package.json:

Altere "productName": "MyClient" para o nome do seu projeto.

Altere "name": "haxball-client-template" para o ID do seu app (use letras minúsculas e sem espaços).

No arquivo main.js:

Localize const clientId = ''; e insira o ID da sua aplicação criado no Discord Developer Portal.

Em title: "Client", mude para o nome que aparecerá na barra superior da janela do app.

3. Teste
Antes de gerar o instalador final, você pode ver como o app ficou rodando o comando:

Bash
npm start
🏗️ Gerando o Instalador (.exe)
Siga esta ordem exata no terminal para transformar seu código em um programa instalável:

PASSO 1: Gerar a pasta do Windows

Bash
npm run pack
PASSO 2: Criar o instalador Setup

Bash
npm run winstaller
Atenção: O instalador final (.exe) será gerado automaticamente dentro da pasta dist/installer.

📂 Organização do Projeto
main.js: O "cérebro" do app. Controla a janela, as configurações de FPS, o Discord RPC e a injeção do Tema Escuro.

preload.js: Controla o que acontece dentro do site, como o menu flutuante (HUD), contador de Ping e captura da bola.

build.js: Script responsável por empacotar o projeto em um instalador profissional para Windows.

package.json: Arquivo de configuração que contém os comandos de automação e a lista de dependências.
