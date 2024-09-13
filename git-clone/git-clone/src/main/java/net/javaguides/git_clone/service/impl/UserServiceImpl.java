package net.javaguides.git_clone.service.impl;


import lombok.AllArgsConstructor;
import net.javaguides.git_clone.Exception.ResourceNotFoundException;
import net.javaguides.git_clone.dto.UserDto;
import net.javaguides.git_clone.entity.User;
import net.javaguides.git_clone.mapper.UserMapper;
import net.javaguides.git_clone.repository.UserRepository;
import net.javaguides.git_clone.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public UserDto createUser(UserDto userDto) {

        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User is not exists with given id : " + userId));


        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream().map((user) -> UserMapper.mapToUserDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long userId, UserDto updatedUser) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exists with given id : " + userId));

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());

        User updatedUserObj = userRepository.save(user);

        return UserMapper.mapToUserDto(updatedUserObj);
    }

    @Override
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exists with given id : " + userId));



        userRepository.deleteById(userId);
    }


    @Override
    public UserDto login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {

            System.out.println("First Name: " + user.getFirstName());
            return new UserDto(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName());
        }
        return null;
    }
}