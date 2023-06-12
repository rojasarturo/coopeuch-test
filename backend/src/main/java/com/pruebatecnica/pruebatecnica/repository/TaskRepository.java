package com.pruebatecnica.pruebatecnica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pruebatecnica.pruebatecnica.entity.TaskModel;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {}