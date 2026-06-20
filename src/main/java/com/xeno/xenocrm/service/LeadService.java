package com.xeno.xenocrm.service;

import com.xeno.xenocrm.entity.Customer;
import com.xeno.xenocrm.entity.Lead;
import com.xeno.xenocrm.repository.CustomerRepository;
import com.xeno.xenocrm.repository.LeadRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadService {

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private AIService aiService;



    public Lead saveLead(Lead lead) {

        int score =

                aiService.calculateLeadScore(lead);

        String priority =

                aiService.getPriority(score);

        String summary =

                aiService.generateSummary(lead);



        lead.setAiScore(score);

        lead.setPriority(priority);

        lead.setAiSummary(summary);



        Lead savedLead =

                leadRepository.save(lead);



        activityService.saveActivity(

                "Lead "

                        + savedLead.getCustomerName()

                        + " added with AI Score "

                        + score

        );



        return savedLead;

    }





    public List<Lead> getAllLeads() {

        return leadRepository.findAll();

    }
    public Lead updateLead(Long id, Lead newLead) {

        Lead lead = leadRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Lead Not Found"));

        lead.setCustomerName(
                newLead.getCustomerName());

        lead.setEmail(
                newLead.getEmail());

        lead.setPhone(
                newLead.getPhone());

        lead.setCompany(
                newLead.getCompany());

        lead.setSource(
                newLead.getSource());

        lead.setAssignedTo(
                newLead.getAssignedTo());

        lead.setStatus(
                newLead.getStatus());

        lead.setNotes(
                newLead.getNotes());


        // Recalculate AI Fields

        int score =
                aiService.calculateLeadScore(lead);

        lead.setAiScore(score);

        lead.setPriority(
                aiService.getPriority(score));

        lead.setAiSummary(
                aiService.generateSummary(lead));


        Lead updatedLead =
                leadRepository.save(lead);


        activityService.saveActivity(

                "Lead "

                        + updatedLead.getCustomerName()

                        + " updated"

        );


        return updatedLead;
    }





    public Lead updateStatus(

            Long id,

            String status) {



        Lead lead =

                leadRepository.findById(id)

                        .orElse(null);



        if (lead != null) {

            lead.setStatus(status);



            Lead updatedLead =

                    leadRepository.save(lead);



            activityService.saveActivity(

                    "Lead "

                            + updatedLead.getCustomerName()

                            + " contacted"

            );



            return updatedLead;

        }



        return null;

    }






    public void deleteLead(Long id) {



        Lead lead =

                leadRepository.findById(id)

                        .orElse(null);



        if (lead != null) {



            activityService.saveActivity(

                    "Lead "

                            + lead.getCustomerName()

                            + " deleted"

            );



            leadRepository.deleteById(id);

        }

    }







    public Customer convertLead(Long id) {



        Lead lead =

                leadRepository.findById(id)

                        .orElseThrow(() ->

                                new RuntimeException(

                                        "Lead not found"

                                )

                        );



        Customer customer =

                new Customer();



        customer.setName(

                lead.getCustomerName()

        );



        customer.setEmail(

                lead.getEmail()

        );



        customer.setPhone(

                lead.getPhone()

        );



        customer.setCompany(

                lead.getCompany()

        );



        customer.setStatus(

                "ACTIVE"

        );



        Customer savedCustomer =

                customerRepository.save(customer);




        lead.setStatus(

                "CONVERTED"

        );



        leadRepository.save(lead);




        activityService.saveActivity(

                "Lead "

                        + lead.getCustomerName()

                        + " converted to customer"

        );



        return savedCustomer;

    }

}