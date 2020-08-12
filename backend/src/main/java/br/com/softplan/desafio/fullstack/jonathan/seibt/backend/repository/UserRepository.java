package br.com.softplan.desafio.fullstack.jonathan.seibt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.softplan.desafio.fullstack.jonathan.seibt.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { }
