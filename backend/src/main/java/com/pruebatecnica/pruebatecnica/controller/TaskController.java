package com.pruebatecnica.pruebatecnica.controller;

import com.pruebatecnica.pruebatecnica.entity.TaskModel;
import com.pruebatecnica.pruebatecnica.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TaskModel task) {
        if(task.getDescription().isEmpty()){
            return ResponseEntity.badRequest().body("Description field is mandatory");
        }
        return new ResponseEntity<>(taskService.save(task), HttpStatus.OK);
    }

    @GetMapping
    public List<TaskModel> list() {
        return taskService.findAll();
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody TaskModel task) {	
        if(task.getDescription().isEmpty()){
            return ResponseEntity.badRequest().body("Description field is mandatory");
        }

        Optional<TaskModel> optionalTask = taskService.findById(task.getId());
        if (!optionalTask.isPresent()) {
            return ResponseEntity.badRequest().body("Task id dont exists");
        }

        TaskModel updateTask = optionalTask.get();
        updateTask.setDescription(task.getDescription());
        updateTask.setActive(task.getActive() ?  task.getActive() : updateTask.getActive());
        return new ResponseEntity<>(taskService.saveAndFlush(updateTask), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestParam Long id){
        Optional<TaskModel> optionalTask = taskService.findById(id);
        if (!optionalTask.isPresent()) {
            return ResponseEntity.badRequest().body("Task id dont exists");
        }
    	taskService.deleteById(id);
    	return ResponseEntity.ok("Entity deleted");
    }
}
