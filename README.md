# Torrador de café automatizado

Blog de acompanhamento do projeto desenvolvido na disciplina Oficina de
Integração: Eletricidade, Eletrônica e Computação na Prática (ELE41), do curso
de Engenharia Eletrônica da UTFPR, Campus Curitiba.

O projeto transforma uma pipoqueira elétrica de ar quente em um torrador de café
de bancada instrumentado, com controle independente de potência e ventilação,
medição por termopar, controle em malha fechada embarcado em ESP32 e interface
web servida pelo próprio equipamento.

## Equipe

- Pedro Henrique Taschetto de Souza: hardware e potência
- Luiz Alberto Martins Prust: software e controle
- João Victor de Oliveira: mecânica e integração

## Estrutura

```
index.html          página inicial: projeto, decisões técnicas, cronograma
css/style.css       folha de estilo
posts/              registros de acompanhamento, um arquivo por publicação
```

Site estático, sem dependências e sem etapa de build. Publicado via GitHub Pages
a partir da branch `main`.

## Publicar uma nova entrada

1. Copie um arquivo existente de `posts/` e ajuste o conteúdo.
2. Acrescente o link na lista da seção "Registros" do `index.html`.
3. Faça commit e push; o GitHub Pages atualiza sozinho.
