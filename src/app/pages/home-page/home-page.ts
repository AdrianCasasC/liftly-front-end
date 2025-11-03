import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Calendar } from '../../components/calendar/calendar';

@Component({
  selector: 'app-home-page',
  imports: [Calendar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
