package br.com.softplan.desafio.fullstack.jonathan.seibt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.softplan.desafio.fullstack.jonathan.seibt.backend.entity.Process;

import java.util.List;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {

  @Query(value = "select * from process where user = ?1", nativeQuery = true)
  List<Process> findAllByUser(long user);

}
