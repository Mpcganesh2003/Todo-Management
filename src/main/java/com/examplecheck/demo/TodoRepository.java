package com.examplecheck.demo;
import org.springframework.data.jpa.repository.JpaRepository;


// CRUD - Create , Read , Update , Delete

public interface TodoRepository extends JpaRepository<Todo, Long>  {

}

 