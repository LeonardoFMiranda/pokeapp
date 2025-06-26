import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg
  ]
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon: any;

  constructor(private router: Router) { }

  goToDetail(id: number) {
    console.log(`Navegando para o Pokémon com ID: ${id}`);
    this.router.navigate(['/pokemon', id]);
  }

  ngOnInit() { }

  getTypeColor(typeName: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#dcdddd',
      fire: '#ff6900',
      water: '#15b9fe',
      grass: '#b4f000',
      electric: '#ffe100',
      ice: '#15f4ff',
      fighting: '#dc6900',
      poison: '#d28dd3',
      ground: '#fbc85b',
      flying: '#78dcff',
      psychic: '#f08cdc',
      bug: '#46c846',
      rock: '#b48c64',
      ghost: '#a08cff',
      dragon: '#5078dc',
      dark: '#787878',
      steel: '#aac8f0',
      fairy: '#ffafdc'
    };

    return typeColors[typeName] || '#ccc'; // Cor padrão caso o tipo não exista
  }

}
