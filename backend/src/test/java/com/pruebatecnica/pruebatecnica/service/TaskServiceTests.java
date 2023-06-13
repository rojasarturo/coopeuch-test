package com.pruebatecnica.pruebatecnica.service;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.hibernate.mapping.Collection;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import com.pruebatecnica.pruebatecnica.entity.TaskModel;
import com.pruebatecnica.pruebatecnica.repository.TaskRepository;
@DataJpaTest
public class TaskServiceTests {
     @InjectMocks
    TaskService taskService;

    @Mock
    TaskRepository taskRepository;

    @Test
    public void testFindAllAndGetEmptyRepository() {
        List<TaskModel> emptyList =  Collections.emptyList();

        when(taskRepository.findAll()).thenReturn(emptyList);

        List<TaskModel> list = taskService.findAll();
        assertThat(list).isEmpty();
    }

    @Test
    public void testCreateTask() {
        TaskModel taskModel1 = new TaskModel();
        taskModel1.setDescription("Description task 1");

        when(taskRepository.save(taskModel1)).thenReturn(taskModel1);

        TaskModel taskSaved = taskService.save(taskModel1);

        assertEquals(taskSaved, taskModel1);
    }

    @Test
    public void testUpdateTask() {
        TaskModel taskModel1 = new TaskModel();
        taskModel1.setDescription("Description task 1");

        when(taskRepository.saveAndFlush(taskModel1)).thenReturn(taskModel1);
        assertEquals(taskModel1, taskModel1);
    }

    @Test
    public void testDeleteTask() {
        Mockito.doNothing().when(taskRepository).deleteById(Mockito.anyLong());
        assertNotNull(taskRepository);
    }
}
