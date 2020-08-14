# Desafio Implementador Fullstack

## Dependências

Docker

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
