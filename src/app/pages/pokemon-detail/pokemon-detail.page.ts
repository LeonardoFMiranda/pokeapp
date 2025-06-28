import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonChip, IonList, IonItem, IonProgressBar,
  IonButtons, IonBackButton,IonButton,IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonChip, IonList, IonItem,
    IonProgressBar, HttpClientModule, IonButtons, IonBackButton,IonButton, IonIcon
  ]
})
export class PokemonDetailPage implements OnInit {
  pokemon: any;
  pokemonId: number = 0;
  evolutions: string[] = [];
  evolutionDetails: any[] = [];
  selectedEvolution: any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.pokemonId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPokemon(this.pokemonId);
  }

  goToDetail(id: number) {
    console.log(`Navegando para o Pokémon com ID: ${id}`);
    this.router.navigate(['/pokemon', id]);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  loadPokemon(id: number) {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe(pokeData => {
      this.pokemon = pokeData;
      this.selectedEvolution = pokeData;
      this.loadEvolutionChain(id);
    });
  }

  getAnimatedSprite(): string {
    return this.selectedEvolution?.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default;
  }

  getArtworkSprite(poke: any): string {
    return poke?.sprites?.other?.['official-artwork']?.front_default;
  }

  getTypeColor(typeName: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#dcdddd', fire: '#ff6900', water: '#15b9fe', grass: '#b4f000',
      electric: '#ffe100', ice: '#15f4ff', fighting: '#dc6900', poison: '#d28dd3',
      ground: '#fbc85b', flying: '#78dcff', psychic: '#f08cdc', bug: '#46c846',
      rock: '#b48c64', ghost: '#a08cff', dragon: '#5078dc', dark: '#787878',
      steel: '#aac8f0', fairy: '#ffafdc'
    };
    return typeColors[typeName] || '#ccc';
  }

  async loadEvolutionChain(id: number) {
    try {
      const species: any = await this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).toPromise();
      const evoUrl = species.evolution_chain?.url;
      if (evoUrl) {
        const chain: any = await this.http.get(evoUrl).toPromise();
        this.evolutions = this.extractEvolutions(chain.chain);
        this.fetchEvolutionDetails();
      }
    } catch (error) {
      console.error('Erro ao buscar cadeia de evolução', error);
    }
  }

  extractEvolutions(chain: any, evolutions: string[] = []): string[] {
    if (!chain) return evolutions;
    evolutions.push(chain.species.name);
    if (chain.evolves_to.length > 0) {
      return this.extractEvolutions(chain.evolves_to[0], evolutions);
    }
    return evolutions;
  }

  async fetchEvolutionDetails() {
    try {
      console.log('Buscando detalhes das evoluções:', this.evolutions);
      const requests = this.evolutions.map(name =>
        this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).toPromise()
      );
      const results = await Promise.all(requests);
      this.evolutionDetails = results;
      console.log('Detalhes das evoluções obtidos:', this.evolutionDetails);
    } catch (error) {
      console.error('Erro ao buscar detalhes das evoluções', error);
    }
  }

  setSelectedEvolution(pokemon: any) {
    this.selectedEvolution = pokemon;
  }
}
