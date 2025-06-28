import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonRange } from '@ionic/angular/standalone';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

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
    HttpClientModule,
    IonButton,
    IonRange,
    NgxSliderModule,
    FormsModule,

  ],
})
export class HomePage implements OnInit {
  constructor(private loadingController: LoadingController) { }


  httpClient = inject(HttpClient);

  totalPokemons = 0;
  buscaCompleta = false;
  searchTerm: string = '';
  minValue = 0;
  maxValue = 1025;

  newLowerValue = 0;
  newUpperValue = 1025;

  async presentPokemonLoading() {
    const loading = await this.loadingController.create({
      message: this.getRandomLoadingMessage(),
      spinner: 'dots',
      cssClass: 'pokemon-loading',
      backdropDismiss: false
    });

    await loading.present();
    return loading;
  }

  getRandomLoadingMessage() {
    const messages = [
      'Capturando Pokémons...',
      'Consultando a Pokédex...',
      'O Professor Oak está preparando os dados...',
      'Jogando Pokébolas...',
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }

  pokemons: any[] = [];
  originalPokemonList: any[] = [];
  valorInvalido = false;
  private inputTimeout: any;

  onRangeChange(event: any) {
    const rangeValue = event.detail.value;
    this.newLowerValue = rangeValue.lower;
    this.newUpperValue = rangeValue.upper;
    this.fetchPokemons();
  }


  onInputChange(event: any, type: 'lower' | 'upper') {
    const value = Number(event.target.value);

    if (type === 'lower') {
      this.newLowerValue = value;
      console.log('Lower value changed:', this.newLowerValue);
    } else {
      this.newUpperValue = value;
    }

    if (this.inputTimeout) {
      clearTimeout(this.inputTimeout);
    }
    this.inputTimeout = setTimeout(() => {
      this.fetchPokemons();
    }, 1000);
  }

  onPokemonSearch(event: Event) {
    event.preventDefault();

    const search = this.searchTerm.trim().toLowerCase();

    console.log('Search term:', search);

    if (search) {
      this.pokemons = this.originalPokemonList.filter(pokemon =>
        pokemon.forms.some((form: any) => form.name.toLowerCase().includes(search)) ||
        pokemon.id.toString() === search
      );
    } else {
      this.fetchPokemons();
    }
  }

  sortDirection: 'asc' | 'desc' = 'asc';

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    console.log('Sort direction:', this.sortDirection);
    this.sortPokemons();
  }


  ngOnInit() {
    console.log(this.pokemons);
    this.fetchPokemons();
  }

  onStateChange() {
    if (this.buscaCompleta) {
      this.fetchPokemons();
    }
  }


  sortPokemons() {
    this.pokemons.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }

  async fetchPokemons() {
    const offset = this.newLowerValue;
    const limit = this.newUpperValue - this.newLowerValue;

    console.log(this.newUpperValue, this.newLowerValue)

    this.pokemons = [];

    if (offset > this.newUpperValue) {
      console.log(offset, this.newUpperValue);
      console.error('Valor inválido: o offset não pode ser maior que o limite.');
      return;
    }

    const loading = await this.presentPokemonLoading();

    if (offset === 0) {
      this.httpClient
        .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .subscribe(async (response: any) => {
          const requests = response.results.map((pokemon: any) =>
            this.httpClient.get(pokemon.url).toPromise()
          );

          const pokemonDetailsArray = await Promise.all(requests);

          pokemonDetailsArray.forEach((pokemonDetails: any) => {
            this.pokemons.push({
              id: pokemonDetails.id,
              image: pokemonDetails.sprites.front_default,
              forms: [{ name: pokemonDetails.name }],
              types: pokemonDetails.types
            });
          });

          this.originalPokemonList = [...this.pokemons];
          this.sortPokemons();
          await loading.dismiss();
        });
    } else {
      this.httpClient
        .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset - 1}&limit=${limit}`)
        .subscribe(async (response: any) => {
          const requests = response.results.map((pokemon: any) =>
            this.httpClient.get(pokemon.url).toPromise()
          );

          const pokemonDetailsArray = await Promise.all(requests);

          pokemonDetailsArray.forEach((pokemonDetails: any) => {
            this.pokemons.push({
              id: pokemonDetails.id,
              image: pokemonDetails.sprites.front_default,
              forms: [{ name: pokemonDetails.name }],
              types: pokemonDetails.types
            });
          });
          this.originalPokemonList = [...this.pokemons];
          this.sortPokemons();
          await loading.dismiss();
        });
    }
  }
}
