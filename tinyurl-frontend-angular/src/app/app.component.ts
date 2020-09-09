import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private httpToken = new Headers();
  gotData: any;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.httpToken.append('Content-Type', 'application/json;charset=utf-8');
  }

  onSubmit(data) {

    this.httpClient
      .post(
        'http://localhost:4000/api/url/item',
        data.value
      )
      .subscribe(
        (result) => {
          this.gotData = result
        },
        (error) => {
          console.log('Error' + error);
        }
      );
  }
}
