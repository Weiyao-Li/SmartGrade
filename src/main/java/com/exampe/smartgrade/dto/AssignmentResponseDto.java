package com.exampe.smartgrade.dto;

import com.exampe.smartgrade.domain.Assignment;
import com.exampe.smartgrade.enums.AssignmentEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponseDto {

    private Assignment assignment;

        private List<AssignmentEnumDto> assignmentEnums = new ArrayList<>();
//    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
        Arrays.stream(AssignmentEnum.values())
                .forEach(assignmentEnum -> {
                    assignmentEnums.add(new AssignmentEnumDto(assignmentEnum.getAssignmentName(), assignmentEnum.getAssignmentNum()));
                });
    }

        public Assignment getAssignment() {
            return assignment;
        }

        public void setAssignment(Assignment assignment){
            this.assignment = assignment;
        }

    public List<AssignmentEnumDto> getAssignmentEnums() {
        return assignmentEnums;
    }
//        public AssignmentEnum[] getAssignmentEnums() {
//            return assignmentEnums;
//        }

    }



