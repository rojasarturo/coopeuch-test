package com.pruebatecnica.pruebatecnica.entity;

// import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "task")
@Entity
public class TaskModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  @Column(name = "description", nullable=false)
  private String description;
  @Column(name = "createat", nullable=false, columnDefinition = "timestamp", updatable = false)
  @CreationTimestamp
  private LocalDateTime createAt;
  @Column(name = "active")
  private Boolean active;

  public long getId() {
    return id;
  }

	public void setId(long id) {
		this.id = id;
	}

  public String getDescription() {
    return description;
  }

	public void setDescription(String description) {
		this.description = description;
	}
  
  public LocalDateTime getCreateAt() {
    return createAt;
  }

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}

  public Boolean getActive() {
    return active;
  }

	public void setActive(Boolean active) {
		this.active = active;
	}
}