package com.pruebatecnica.pruebatecnica.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.pruebatecnica.pruebatecnica.entity.TaskModel;

@DataJpaTest
public class TaskRepositoryTests {
    @Autowired
    TaskRepository taskRepository;

    @Test
    public void testFindAllAndGetEmptyRepository() {
        List<TaskModel> list = taskRepository.findAll();
        assertThat(list).isEmpty();
    }

    @Test
    public void testCreateTask() {
        TaskModel taskModel1 = new TaskModel();
        taskModel1.setDescription("Description task 1");
        taskRepository.save(taskModel1);
        List<TaskModel> list = taskRepository.findAll();
        assertThat(list).hasSize(1).contains(taskModel1);
    }

    @Test
    public void testUpdateTask() {
        TaskModel taskModel1 = new TaskModel();
        taskModel1.setDescription("Description task 1");
        taskModel1.setActive(false);
        taskRepository.save(taskModel1);

        List<TaskModel> list = taskRepository.findAll();
        assertThat(list).hasSize(1).contains(taskModel1);

        taskModel1.setActive(true);
        taskRepository.saveAndFlush(taskModel1);

        List<TaskModel> updateList = taskRepository.findAll();
        assertThat(updateList).hasSize(1).contains(taskModel1);
    }

    @Test
    public void testDeleteTask() {
        TaskModel taskModel1 = new TaskModel();
        taskModel1.setDescription("Description task 1");
        taskModel1.setActive(false);
        taskRepository.save(taskModel1);

        List<TaskModel> list = taskRepository.findAll();
        assertThat(list).hasSize(1).contains(taskModel1);

        taskModel1.setActive(true);
        taskRepository.deleteById(taskModel1.getId());

        List<TaskModel> updateList = taskRepository.findAll();
        assertThat(updateList).hasSize(0);
    }
}
