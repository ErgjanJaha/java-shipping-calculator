package com.fortnox.fortnox.api;

import com.fortnox.fortnox.services.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private EntryService entryService;

    @GetMapping("/list")
    public Map<String, Object> list() {
        return entryService.listAllEntries();
    }

    @PostMapping("/add/entry")
    public Map<String, Object> handle(
        @RequestParam String fullname,
        @RequestParam Integer weight,
        @RequestParam String colour,
        @RequestParam String country
    ) {
        return entryService.createEntry(fullname, weight, colour, country);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleArgumentMissmatch(MethodArgumentTypeMismatchException ex) {
        Map<String, String> errors = new HashMap<>();

        errors.put(ex.getName(), ex.getErrorCode());

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getConstraintViolations().forEach(cv -> {
            errors.put((cv.getPropertyPath()).toString(), cv.getMessage());
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
