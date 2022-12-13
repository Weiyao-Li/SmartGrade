package com.exampe.smartgrade.service;

import com.exampe.smartgrade.domain.Assignment;
import com.exampe.smartgrade.domain.User;
import com.exampe.smartgrade.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepo;
    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus("Need to be submitted");
        assignment.setUser(user);
        return assignmentRepo.save(assignment);
    }
    public Set<Assignment> findByUser (User user) {
        return assignmentRepo.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepo.findById(assignmentId);
    }
}