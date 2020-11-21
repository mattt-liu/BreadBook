import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Expense } from './expense';
import { Income } from './income';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url = ""; // temp; change to backend api

  constructor() { }

}
