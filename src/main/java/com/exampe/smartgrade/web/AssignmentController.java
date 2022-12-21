package com.exampe.smartgrade.web;

import com.exampe.smartgrade.domain.Assignment;
import com.exampe.smartgrade.domain.User;
import com.exampe.smartgrade.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment (@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        Set<Assignment> assignmentsbyUser = assignmentService.findByUser(user);
        return ResponseEntity.ok(assignmentsbyUser);

    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignments(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));

    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignments(@PathVariable Long assignmentId,
                                               @RequestBody Assignment assignment,
                                               @AuthenticationPrincipal User user) {
        Assignment updatedAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }

    }
