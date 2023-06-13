package com.pruebatecnica.pruebatecnica.controller;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.pruebatecnica.pruebatecnica.entity.TaskModel;
import com.pruebatecnica.pruebatecnica.service.TaskService;

@ExtendWith(MockitoExtension.class)
public class TaskControllerTests {
    @InjectMocks
    TaskController taskController;

    @Mock
    TaskService taskService;

    @Test
    public void getTaskAPI() throws Exception 
    {
        TaskModel taskModel1 = new TaskModel();
        taskModel1.setDescription("Description task 1");
        taskModel1.setActive(false);

        List<TaskModel> list =  Arrays.asList(taskModel1);

        when(taskService.findAll()).thenReturn(list);

        List<TaskModel> result = taskController.list();
        
        assertThat(result).hasSize(1);

    }

    @Test
    public void createTaskAPIAndReturnOk() throws Exception 
    {
        TaskModel taskModel1 = new TaskModel();
        taskModel1.setDescription("Description task 1");

        when(taskService.save(taskModel1)).thenReturn(taskModel1);

        ResponseEntity<?> responseEntity  = taskController.create(taskModel1);
        
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    public void createTaskAPIAndReturnBadRequest() throws Exception 
    {
        TaskModel taskModel1 = new TaskModel();
        taskModel1.setDescription("");

        ResponseEntity<?> responseEntity  = taskController.create(taskModel1);
        
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

    }

    @Test
    public void putTaskAPIAndReturnOK() throws Exception 
    {
        TaskModel savedTask = new TaskModel();
        savedTask.setId(1L);
        savedTask.setDescription("saved description");
        savedTask.setActive(false);


        TaskModel taskModel = new TaskModel();
        taskModel.setId(1L);
        taskModel.setDescription("update description");
        taskModel.setActive(true);

        Optional<TaskModel> optionalTask=  Optional.of(savedTask);
        when(taskService.findById(Mockito.anyLong())).thenReturn(optionalTask);

        ResponseEntity<?> responseEntity  = taskController.update(taskModel);
        
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    public void putTaskAPIAndReturnErrorTaskDontExists() throws Exception 
    {
        TaskModel taskModel = new TaskModel();
        taskModel.setId(1L);
        taskModel.setDescription("update description");
        taskModel.setActive(true);

        Optional<TaskModel> optionalTask = Optional.empty();
        when(taskService.findById(Mockito.anyLong())).thenReturn(optionalTask);

        ResponseEntity<?> responseEntity  = taskController.update(taskModel);
        
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

    }

    @Test
    public void putTaskAPIAndReturnErrorDescriptionEmpty() throws Exception 
    {
        TaskModel taskModel = new TaskModel();
        taskModel.setId(1L);
        taskModel.setDescription("");
        taskModel.setActive(true);

        ResponseEntity<?> responseEntity  = taskController.update(taskModel);
        
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void deleteTaskAPIAndReturnOK() throws Exception 
    {
        TaskModel savedTask = new TaskModel();
        savedTask.setId(1L);
        savedTask.setDescription("saved description");
        savedTask.setActive(false);


        Optional<TaskModel> optionalTask = Optional.of(savedTask);
        when(taskService.findById(Mockito.anyLong())).thenReturn(optionalTask);

        ResponseEntity<?> responseEntity  = taskController.delete(1L);
        
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    public void deleteTaskAPIAndReturnErrorTaskDontExists() throws Exception 
    {
        
        Optional<TaskModel> optionalTask = Optional.empty();
        when(taskService.findById(Mockito.anyLong())).thenReturn(optionalTask);

        ResponseEntity<?> responseEntity  = taskController.delete(1L);
        
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

    }
    
}
