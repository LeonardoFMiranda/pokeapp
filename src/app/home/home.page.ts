import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    PokemonCardComponent,
    HttpClientModule
  ],
})
export class HomePage implements OnInit {
  constructor() { }

  httpClient = inject(HttpClient);


  //   {
  //     id: 1,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  //     forms: [{ name: 'bulbasaur' }],
  //     types: [
  //       { type: { name: 'grass' } },
  //       { type: { name: 'poison' } }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  //     forms: [{ name: 'charmander' }],
  //     types: [
  //       { type: { name: 'fire' } }
  //     ]
  //   },
  //   {
  //     id: 7,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  //     forms: [{ name: 'squirtle' }],
  //     types: [
  //       { type: { name: 'water' } }
  //     ]
  //   },
  //   {
  //     id: 25,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  //     forms: [{ name: 'pikachu' }],
  //     types: [
  //       { type: { name: 'electric' } }
  //     ]
  //   },
  //   {
  //     id: 124,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png',
  //     forms: [{ name: 'jynx' }],
  //     types: [
  //       { type: { name: 'ice' } },
  //       { type: { name: 'psychic' } }
  //     ]
  //   },
  //   {
  //     id: 66,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png',
  //     forms: [{ name: 'machop' }],
  //     types: [
  //       { type: { name: 'fighting' } }
  //     ]
  //   },
  //   {
  //     id: 23,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png',
  //     forms: [{ name: 'ekans' }],
  //     types: [
  //       { type: { name: 'poison' } }
  //     ]
  //   },
  //   {
  //     id: 104,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png',
  //     forms: [{ name: 'cubone' }],
  //     types: [
  //       { type: { name: 'ground' } }
  //     ]
  //   },
  //   {
  //     id: 41,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png',
  //     forms: [{ name: 'zubat' }],
  //     types: [
  //       { type: { name: 'poison' } },
  //       { type: { name: 'flying' } }
  //     ]
  //   },
  //   {
  //     id: 63,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png',
  //     forms: [{ name: 'abra' }],
  //     types: [
  //       { type: { name: 'psychic' } }
  //     ]
  //   },
  //   {
  //     id: 10,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
  //     forms: [{ name: 'caterpie' }],
  //     types: [
  //       { type: { name: 'bug' } }
  //     ]
  //   },
  //   {
  //     id: 95,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png',
  //     forms: [{ name: 'onix' }],
  //     types: [
  //       { type: { name: 'rock' } },
  //       { type: { name: 'ground' } }
  //     ]
  //   },
  //   {
  //     id: 92,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png',
  //     forms: [{ name: 'gastly' }],
  //     types: [
  //       { type: { name: 'ghost' } },
  //       { type: { name: 'poison' } }
  //     ]
  //   },
  //   {
  //     id: 147,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png',
  //     forms: [{ name: 'dratini' }],
  //     types: [
  //       { type: { name: 'dragon' } }
  //     ]
  //   },
  //   {
  //     id: 198,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/198.png',
  //     forms: [{ name: 'murkrow' }],
  //     types: [
  //       { type: { name: 'dark' } },
  //       { type: { name: 'flying' } }
  //     ]
  //   },
  //   {
  //     id: 81,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png',
  //     forms: [{ name: 'magnemite' }],
  //     types: [
  //       { type: { name: 'electric' } },
  //       { type: { name: 'steel' } }
  //     ]
  //   },
  //   {
  //     id: 35,
  //     image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
  //     forms: [{ name: 'clefairy' }],
  //     types: [
  //       { type: { name: 'fairy' } }
  //     ]
  //   }
  // ];
  pokemons: any[] = [];


  ngOnInit() {
    console.log(this.pokemons);
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .subscribe((response: any) => {
        response.results.forEach((pokemon: any, index: number) => {
          this.httpClient.get(pokemon.url).subscribe((pokemonDetails: any) => {
            this.pokemons.push({
              id: pokemonDetails.id,
              image: pokemonDetails.sprites.front_default,
              forms: [{ name: pokemonDetails.name }],
              types: pokemonDetails.types
            });
          });
        });
      });
  }
}
