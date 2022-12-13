package com.exampe.smartgrade.repository;

import com.exampe.smartgrade.domain.Assignment;
import com.exampe.smartgrade.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;


public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);
}
