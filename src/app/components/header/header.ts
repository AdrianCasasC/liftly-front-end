import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'liftly-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  ngOnInit(): void {
    document.documentElement.classList.add('dark');
  }

}
