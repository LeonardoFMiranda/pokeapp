import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PokemonCardComponent
  ],
})
export class HomePage {
  constructor() {}

  pokemons = [
    {
      id: 1,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      forms: [{ name: 'bulbasaur' }],
      types: [
        { type: { name: 'grass' } },
        { type: { name: 'poison' } }
      ]
    },
    {
      id: 4,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      forms: [{ name: 'charmander' }],
      types: [
        { type: { name: 'fire' } }
      ]
    }
  ];

  ngOnInit() {
    console.log(this.pokemons);
  }
}
