# Desafio Implementador Fullstack

## Dependências

Docker

## Como rodar

Primeiro inicie o Docker, e então execute os seguintes comandos, um por um, na raiz do projeto:

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

3. ### Front-end React
