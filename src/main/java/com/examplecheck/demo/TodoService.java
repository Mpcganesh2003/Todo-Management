package com.examplecheck.demo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public Todo createTodo(Todo todo){

        return todoRepository.save(todo);
    }

    public Todo getTodo(Long ID){
        return todoRepository.findById(ID).orElseThrow(() -> new RuntimeException("Todo not Found"));
    }

    public List<Todo> getTodos(){

        return todoRepository.findAll();
    }

    public Todo updateTodo(Todo todo){
        return todoRepository.save(todo);
    }

    public void deleteTodoById(Long id) {

        todoRepository.deleteById(id);
    }

    public void deleteTodo(Todo todo){
        todoRepository.delete(todo);
    }

    public Page<Todo> getAllTodospage(int page,int size){
        Pageable pageable = PageRequest.of(page, size);
        return todoRepository.findAll(pageable);
    }

}