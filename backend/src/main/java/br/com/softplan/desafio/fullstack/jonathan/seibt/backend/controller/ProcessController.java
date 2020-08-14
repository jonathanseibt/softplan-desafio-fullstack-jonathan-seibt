package br.com.softplan.desafio.fullstack.jonathan.seibt.backend.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.com.softplan.desafio.fullstack.jonathan.seibt.backend.entity.Process;
import br.com.softplan.desafio.fullstack.jonathan.seibt.backend.repository.ProcessRepository;

@RestController
public class ProcessController {
    @Autowired
    private ProcessRepository _processRepository;

    @CrossOrigin
    @RequestMapping(value = "/process", method = RequestMethod.GET)
    public List<Process> Get() {
        return _processRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/process/{id}", method = RequestMethod.GET)
    public ResponseEntity<Process> GetById(@PathVariable(value = "id") long id)
    {
        Optional<Process> process = _processRepository.findById(id);

        if (process.isPresent()) {
            return new ResponseEntity<Process>(process.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/process", method =  RequestMethod.POST)
    public Process Post(@Valid @RequestBody Process process)
    {
        return _processRepository.save(process);
    }

    @CrossOrigin
    @RequestMapping(value = "/process/{id}", method =  RequestMethod.PUT)
    public ResponseEntity<Process> Put(@PathVariable(value = "id") long id, @Valid @RequestBody Process newProcess)
    {
        Optional<Process> oldProcess = _processRepository.findById(id);

        if (oldProcess.isPresent()) {
            Process process = oldProcess.get();
            process.setTitle(newProcess.getTitle());
            process.setDescription(newProcess.getDescription());
            process.setRating(newProcess.getRating());
            process.setUser(newProcess.getUser());

            _processRepository.save(process);

            return new ResponseEntity<Process>(process, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/process/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> Delete(@PathVariable(value = "id") long id)
    {
        Optional<Process> process = _processRepository.findById(id);

        if (process.isPresent()) {
            _processRepository.delete(process.get());

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/process/FindAllByUser/{user}", method = RequestMethod.GET)
    public List<Process> FindAllByUser(@PathVariable(value = "user") long user)
    {
        return _processRepository.findAllByUser(user);
    }

}
