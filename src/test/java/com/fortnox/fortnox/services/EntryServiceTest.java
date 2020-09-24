package com.fortnox.fortnox.services;

import com.fortnox.fortnox.model.EntryList;
import com.fortnox.fortnox.repositories.EntryRepository;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;

@SpringBootTest
class EntryServiceTest {

    @InjectMocks
    EntryService entryService;

    @Mock
    EntryRepository entryRepository;


    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createEntry() {
        String fullname = "Random Name";
        Integer weight = 19;
        String colour = "rgb(1,1,1)";
        String country = "sweden";
        Double cost = 24.0;
        Mockito.doNothing().when(entryRepository).createEntry(
            anyString(), anyInt(), anyString(), anyString(), anyDouble()
        );
        Map<String, Object> response = entryService.createEntry(
                fullname,
                weight,
                colour,
                country
        );

        assertThat(response.get("success")).isEqualTo(true);
    }

    @Test
    void listAllEntries() {
        ArrayList<Double> data = new ArrayList<>();
        data.add(150.20);
        data.add(23.0);
        Mockito.when(entryRepository.getTotals())
                .thenReturn(data);

        EntryList random = new EntryList();
        random.setFullname("Random Fullname");
        ArrayList<EntryList> data2 = new ArrayList<>();
        data2.add(random);
        Mockito.when(entryRepository.listAllEntries())
                .thenReturn(data2.toArray(new EntryList[]{}));

        Map<String, Object> results = entryService.listAllEntries();
        ArrayList<Double> total = (ArrayList) results.get("total");
        assertThat(total.get(0)).isEqualTo(150.20);
        assertThat(total.get(1)).isEqualTo(23.0);
    }
}