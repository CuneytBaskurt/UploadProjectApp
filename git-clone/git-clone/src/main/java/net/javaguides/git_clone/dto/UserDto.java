package net.javaguides.git_clone.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    public UserDto(Long id, String email, String firstName, String lastName) {

        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;

    }



}

