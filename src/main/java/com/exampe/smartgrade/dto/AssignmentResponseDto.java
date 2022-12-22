package com.exampe.smartgrade.dto;

import com.exampe.smartgrade.domain.Assignment;
import com.exampe.smartgrade.enums.AssignmentEnum;
import com.exampe.smartgrade.enums.AssignmentStatusEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponseDto {

    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }

        public Assignment getAssignment() {
            return assignment;
        }

        public void setAssignment(Assignment assignment){
            this.assignment = assignment;
        }

        public AssignmentEnum[] getAssignmentEnums() {
            return assignmentEnums;
        }
        public AssignmentStatusEnum[] getStatusEnums() {
            return statusEnums;
    }


    }



