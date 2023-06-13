package com.pruebatecnica.pruebatecnica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pruebatecnica.pruebatecnica.entity.TaskModel;
import com.pruebatecnica.pruebatecnica.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    public TaskModel save(TaskModel task){
        return taskRepository.save(task);
    }
    public List<TaskModel> findAll(){
        return taskRepository.findAll();
    } 
    public Optional<TaskModel> findById(Long id){
        return taskRepository.findById(id);
    }
    public TaskModel saveAndFlush(TaskModel task){
        return taskRepository.saveAndFlush(task);
    }
    public void deleteById(Long id){
        taskRepository.deleteById(id);
    }
}
