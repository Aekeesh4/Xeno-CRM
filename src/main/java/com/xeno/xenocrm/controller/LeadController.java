package com.xeno.xenocrm.controller;

import com.xeno.xenocrm.entity.Lead;
import com.xeno.xenocrm.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import com.xeno.xenocrm.entity.Customer;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/lead")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping("/add")
    public Lead addLead(@RequestBody Lead lead) {
        return leadService.saveLead(lead);
    }

    @GetMapping("/all")
    public List<Lead> getAllLeads() {
        return leadService.getAllLeads();
    }
    @PutMapping("/status/{id}")
    public Lead updateLeadStatus(
            @PathVariable Long id,
            @RequestBody Lead lead) {

        return leadService.updateStatus(
                id,
                lead.getStatus());
    }
    @DeleteMapping("/delete/{id}")
    public String deleteLead(@PathVariable Long id) {

        leadService.deleteLead(id);

        return "Lead Deleted Successfully";
    }
    @PostMapping("/convert/{id}")
    public Customer convertLead(@PathVariable Long id) {

        return leadService.convertLead(id);
    }
}
