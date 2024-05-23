# Eventos em nodejs

O javascript é uma linguagem orientada a eventos, no exemplo de um browser, sempre que um usuário realizar uma ação, ele gera um evento, onde o NodeJS recebe esse evento e executa uma ação a partir do evento que recebeu.

## Eventos x Promisse

Geralmente pessoas novas no ecosistema javascript usam bastante promisses para realizar uma ação a partir de um comportamento, ou seja, espera algo acontecer para chamar a promisse, o problema de usar promisses é que uma promisse tem um escopo delimitado, quero dizer que, quando usamos promisse, ao finalizar seu escopo ela finaliza, diferente de um evento no javascript. Podemos dizer que usar um emissor de eventos para tarefas corriqueiras é mais adequado.

### Event Emitter
- Usado para ações contínuas
- Node.js usa para quase tudo em seu ecosistema
- Bastante usado em browsers. Ex: `.onClick()`
- Trabalha sobre o Design Pattern Observer/PubSub
