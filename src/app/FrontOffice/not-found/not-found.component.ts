import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {

    this.injectSvgSprite('https://demo.bootstrapious.com/directory/1-4/icons/orion-svg-sprite.svg')
  }
  goToRoute() {
    this.router.navigate(['/Home']);
  }
  injectSvgSprite(path: string): void {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", path, true);
    ajax.send();
    ajax.onload = (e) => {
      const div = document.createElement("div");
      div.className = 'd-none';
      div.innerHTML = ajax.responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);

    }
  }
}
