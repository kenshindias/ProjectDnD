# Etapa 3A — Campos de campanha e status

Esta etapa adiciona campos para organizar melhor cada ficha por campanha.

## Arquivo alterado

```text
js/storage.js
```

## Patches

```text
patch/campaign-fields-snippet.html
css/campaign-fields-patch.css
```

## Campos adicionados

```text
Campanha
Status
Mestre
Grupo / Mesa
```

O campo **Status** tem as opções:

```text
Ativo
Reserva
Arquivado
Morto
NPC
```

## Como instalar

### 1. Substitua o arquivo

```text
js/storage.js
```

### 2. Inserir o HTML no `index.html`

Abra o `index.html` e procure, dentro do painel **Identidade do Personagem**, o trecho:

```html
<div id="class-race-badges" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;"></div>
```

Logo DEPOIS dele, cole o conteúdo de:

```text
patch/campaign-fields-snippet.html
```

### 3. Inserir CSS

Cole no final do `css/style.css` o conteúdo de:

```text
css/campaign-fields-patch.css
```

## Como testar

1. Abra o app.
2. Preencha Campanha, Status, Mestre e Grupo.
3. Troque para outra ficha.
4. Volte para a ficha anterior.
5. Recarregue a página.
6. Confirme se os campos continuam salvos.
7. Exporte o JSON e confira se esses campos também vão junto.

## Observação

Esta etapa não cria filtro por campanha ainda. Ela apenas adiciona os campos e garante que sejam salvos.
O filtro pode ser a próxima etapa.
