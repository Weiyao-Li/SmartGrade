package com.exampe.smartgrade.repository;

import com.exampe.smartgrade.domain.Assignment;
import com.exampe.smartgrade.domain.User;
import com.exampe.smartgrade.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;


public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
//    private final String SUBMITTED  = AssignmentStatusEnum.SUBMITTED.getStatus();
    Set<Assignment> findByUser(User user);

    @Query("select a from Assignment a where a.status = 'submitted'")
    Set<Assignment> findByCodeReviewer(User user);
}
