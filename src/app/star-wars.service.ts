import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' },
    { name: 'Luke Warm', side: '' }
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  // http: HttpClient;

  constructor(logService: LogService, private http: HttpClient){
    this.logService = logService;
  }

  fetchCharacters() {
    this.http.get('https://cors-anywhere.herokuapp.com/http://swapi.co/api/people')
    // .pipe(
    //   map((response: Response) => {
    //     return response.json();
    //   })
    // )
    .subscribe(
      (response) => {
        const data: any = response;
        const extractedChars = data.results;
        const chars = extractedChars.map((char) => {
          return {name: char.name, side: ''};
        });
        this.characters = chars;
        this.charactersChanged.next();
        console.log(chars);

    });
  }

  getCharacters(chosenList) {
    if(chosenList === 'all'){
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo){
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side )
  }
  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    if(pos !== -1){
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}
