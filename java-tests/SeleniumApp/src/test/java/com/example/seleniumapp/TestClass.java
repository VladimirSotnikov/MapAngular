package com.example.seleniumapp;

import com.codeborne.selenide.Selenide;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Selectors.*;
import static com.codeborne.selenide.Selenide.*;

public class TestClass {

    @Test
    public void checkToolbar() {
        open("http://localhost:8000/");
        $(".mat-button-wrapper").shouldHave(text("Angular Map"));
    }

    @Test
    public void checkOpenedAndCancelCard() {
        open("http://localhost:8000/");
        $(byText("Add Place")).click();
        $(".mat-card-title.ng-star-inserted").shouldHave(text("Add new place"));
        $(byText("Cancel")).click();
    }

    @Test
    public void positiveCheckFillingFields() {
        open("http://localhost:8000/");
        $(byText("Add Place")).click();
        $(".mat-card-title.ng-star-inserted").shouldHave(text("Add new place"));
        $(By.id("mat-input-0")).setValue("Moscow");
        $(By.id("mat-input-1")).setValue("55.45");
        $(By.id("mat-input-2")).setValue("37.36");
        $(byText("Submit")).click();
    }

    @Test
    public void checkAddingPlace() {
        open("http://localhost:8000/");
        $(byTagAndText("small", "55.45, 37.36")).click();
    }
}