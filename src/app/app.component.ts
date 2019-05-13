import { Component, OnInit } from '@angular/core';
import { random } from 'lodash';
import { StarWarsService } from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dreamOfMine';
  number: number;
  list: any = ['apples', 'oranges', 'stuff']
  item: any;
  constructor(public swService: StarWarsService) {}

  ngOnInit(){
    this.swService.fetchCharacters();
  }

  onIncrease(){
    this.number = random(1, 20);
  }
  addItem(){
    this.list.push(this.item);
  }
}
