package com.fortnox.fortnox.repositories;

import com.fortnox.fortnox.model.EntryList;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EntryRepository extends CrudRepository<EntryList, Integer> {
    @Query(value = "SELECT SUM(price), SUM(weight) FROM entry_list", nativeQuery = true)
    Object getTotals();

    @Query(value = "SELECT * FROM entry_list", nativeQuery = true)
    EntryList[] listAllEntries();

    @Transactional
    @Modifying
    @Query(
            value = "INSERT INTO entry_list (fullname, weight, colour, country, price) VALUES (:fullname, :weight, :colour, :country, :price)",
            nativeQuery = true
    )
    void createEntry(
            @Param("fullname") String fullname,
            @Param("weight") Integer weight,
            @Param("colour") String colour,
            @Param("country") String country,
            @Param("price") Double price
    );
}