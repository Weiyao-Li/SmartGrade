package com.exampe.smartgrade.service;

import com.exampe.smartgrade.domain.User;
import com.exampe.smartgrade.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public Optional<User> findUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

}
