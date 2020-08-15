# Desafio Implementador Fullstack

- Início em: 10/08/2020 às 12:00
- Entregue em: 14/08/2020 às 22:00

## Introdução

Devido ao curto tempo disponível que eu tive para o desafio durante essa semana, tive que escolher deixar algumas coisas de fora. O critério que eu usei foi: dar atenção às coisas que eu ainda NÃO sabia, e deixar em segundo plano o que eu JÁ sei. Me dedicar ao que eu já sei não representaria muito aprendizado.

Por exemplo: eu ~~ainda~~ não tenho familiaridade com Spring e Docker. Eu sabia da existência deles e tudo mais, mas nunca havia utilizado na prática. Então resolvi começar por eles. E aprendi muito (eu já sei que Docker vou usar pra sempre). Já React e desenvolvimento web no geral, eu já domino. Então optei por deixar em segundo plano. Até mesmo utilizei Material UI, que vem com praticamente todos os componentes visuais e responsividade prontos, aliados ao design system já validado da Google.

Algo interessante que fiz foi utilizar o VSCode para o desenvolvimento em Java, algo que nunca havia feito. Até então, só utilizava Eclipse. Inclusive, utilizei a ferramenta a extensão Spring Initializr do VSCode para dar start no back-end (HIPER ÚTIL).

Já com relação aos testes automatizados, fiquei dividido. Conheço bem testes automatizados em React e Node. Mas eles de fato tomam mais tempo do que conhecimento em si. E tempo era algo que eu não tinha. Ainda assim, testes automatizados com Spring, eu nunca havia feito. Infelizmente não houve tempo hábil para acrescentar.

Eu utilizei MobX no lugar de Redux, porque o MobX não impõe um arquitetura rígida de implementação, o que faz ele ser muito mais rápido e flexível de usar. O front-end e o back-end se comunicam apenas por meio de APIs. O login é só fictício. E devido ao tempo, deixei a possibilidade de apenas uma pessoa fazer um parecer no processo. Como de costume, procurei deixar o código o mais legível e óbvio possível, dispensando comentários inline. Não houve tempo hábil para fazer uma documentação do sistema.

Ah, deixei no final alguns links das referências que utilizei. 🤜

## Dependências

Docker (no meu caso, o Docker Desktop do Windows)

## Como rodar

_**Opcional:** como eu ainda não tenho familiaridade com Docker, usei bastante o seguinte comando para zerar todas as imagens e containers que eu criava até finalmente acertar a configuração correta. Cuidado se você já usa Docker e tem imagens e/ou containers de outros projetos, pois serão apagados também._

```
docker system prune -a -f
```

Agora sim! Primeiro inicie o Docker, e então execute os seguintes comandos, um por um, na raiz do projeto:

1. ### Banco de dados MySQL

```
docker build -t mysql-image-softplan-desafio-fullstack-jonathan-seibt -f db/Dockerfile .
```

```
docker run -d -v "/$(pwd)/db/mysql/data:/var/lib/mysql" -p 3306:3306 --rm --name mysql-container-softplan-desafio-fullstack-jonathan-seibt mysql-image-softplan-desafio-fullstack-jonathan-seibt
```

```
docker exec -i mysql-container-softplan-desafio-fullstack-jonathan-seibt mysql -uroot -psoftplan < db/startup.sql
```

2. ### Back-end Sprint Boot

```
cd backend && mvnw clean package && cd ..
```

```
cd backend && docker build -t spring-boot-image-softplan-desafio-fullstack-jonathan-seibt . && cd ..
```

```
docker run -d -v "/$(pwd)/backend:/home/spring-boot-softplan-desafio-fullstack-jonathan-seibt" -p 8080:8080 --link mysql-container-softplan-desafio-fullstack-jonathan-seibt --rm --name spring-boot-container-softplan-desafio-fullstack-jonathan-seibt spring-boot-image-softplan-desafio-fullstack-jonathan-seibt
```

3. ### Front-end React

```
cd frontend && docker build -t react-image-softplan-desafio-fullstack-jonathan-seibt . && cd ..
```

```
docker run -d -v "/$(pwd)/frontend:/home/react-softplan-desafio-fullstack-jonathan-seibt" -p 80:80 --rm --name react-container-softplan-desafio-fullstack-jonathan-seibt react-image-softplan-desafio-fullstack-jonathan-seibt
```

4. ### Restaurar os usuários cadastrados no banco de dados

```
docker exec -i mysql-container-softplan-desafio-fullstack-jonathan-seibt mysql -uroot -psoftplan < db/restore.sql
```

👏 Feito!

## Referências utilizadas

- https://www.percona.com/blog/2019/11/19/installing-mysql-with-docker/
- https://github.com/programadorabordo/docker-introducao
- https://mkyong.com/docker/docker-spring-boot-examples/
- https://www.treinaweb.com.br/blog/criando-uma-api-rest-com-o-spring-boot/
- https://levelup.gitconnected.com/dockerizing-a-react-application-using-nginx-and-react-router-43154cc8e58c
- https://github.com/atmosmps/dockerized-react-app
