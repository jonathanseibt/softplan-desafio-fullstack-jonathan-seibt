package br.com.softplan.desafio.fullstack.jonathan.seibt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.softplan.desafio.fullstack.jonathan.seibt.backend.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  @Query(value = "select * from user where email = ?1", nativeQuery = true)
  List<User> findFirstByEmail(String email);

  @Query(value = "select * from user where role = ?1", nativeQuery = true)
  List<User> findAllByRole(long role);

}
