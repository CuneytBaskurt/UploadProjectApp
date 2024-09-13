package net.javaguides.git_clone.controller;




import lombok.AllArgsConstructor;
import net.javaguides.git_clone.dto.UserDto;
import net.javaguides.git_clone.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId){

        UserDto userDto = userService.getUserById(userId);

        return ResponseEntity.ok(userDto);

    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<UserDto>> getAllUsers(){

        List<UserDto> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userId,
                                              @RequestBody UserDto updatedUser){


        UserDto userDto = userService.updateUser(userId, updatedUser);

        return ResponseEntity.ok(userDto);

    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){

        userService.deleteUser(userId);

        return  ResponseEntity.ok("User Deleted With Id : " + userId);

    }


    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody UserDto userDto) {
        UserDto user = userService.login(userDto.getEmail(), userDto.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user); // Başarılı giriş
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Yetkisiz erişim
        }
    }





}
