package com.exampe.smartgrade.service;

import com.exampe.smartgrade.domain.Assignment;
import com.exampe.smartgrade.domain.Comment;
import com.exampe.smartgrade.domain.User;
import com.exampe.smartgrade.dto.CommentDto;
import com.exampe.smartgrade.repository.AssignmentRepository;
import com.exampe.smartgrade.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private AssignmentRepository assignmentRepo;

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        Assignment assignment = assignmentRepo.getById(commentDto.getAssignmentId());

        comment.setAssignment(assignment);
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        comment.setCreatedDate(LocalDateTime.now());

        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        Set<Comment> comments = commentRepo.findByAssignmentId(assignmentId);
        return comments;
    }
}
