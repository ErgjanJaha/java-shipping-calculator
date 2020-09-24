package com.fortnox.fortnox.services;

import com.fortnox.fortnox.model.EntryList;
import com.fortnox.fortnox.repositories.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.util.HashMap;
import java.util.Map;

@Service
@Validated
public class EntryService {

    @Autowired
    public EntryRepository entryRepository;

    public Map<String, Object> createEntry(
            @NotEmpty @Size(min = 2, max = 45) String fullname,
            @Valid @PositiveOrZero Integer weight,
            @Pattern(regexp = "rgb\\(\\s*(?:(\\d{1,3})\\s*,?){3}\\)") String colour,
            @Pattern(regexp = "sweden|china|brazil|australia") String country
    ) {
        Double cost;
        switch (country.toLowerCase()) {
            case "sweden":
                cost = weight * 1.3;
                break;
            case "brazil":
                cost = weight * 8.6;
                break;
            case "australia":
                cost = weight * 7.2;
                break;
            case "china":
                cost = weight * 4.0;
                break;
            default:
                cost = Double.valueOf(weight);
                break;
        }
        entryRepository.createEntry(fullname, weight, colour, country, cost);
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);
        return map;
    }

    public Map<String, Object> listAllEntries() {
        Map<String, Object> data = new HashMap<>();
        data.put("entries", entryRepository.listAllEntries());
        data.put("total", entryRepository.getTotals());
        return data;
    }
}
