import { Component } from '@angular/core';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { FootballService } from '../../football.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Country, Standings } from './type';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-league-standings-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatTableModule,
  ],
  templateUrl: './league-standings-list.component.html',
  styleUrl: './league-standings-list.component.css',
})
export class LeagueStandingsListComponent {
  countries: Country[] = [
    {
      id: 39,
      name: 'Premier League',
      country: 'England',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
      flag: 'https://media.api-sports.io/flags/gb.svg',
      season: new Date().getFullYear(),
    },
    {
      id: 140,
      name: 'La Liga',
      country: 'Spain',
      logo: 'https://media-4.api-sports.io/football/leagues/140.png',
      flag: 'https://media-4.api-sports.io/flags/es.svg',
      season: new Date().getFullYear(),
    },
    {
      id: 61,
      name: 'Ligue 1',
      country: 'France',
      logo: 'https://media-4.api-sports.io/football/leagues/61.png',
      flag: 'https://media-4.api-sports.io/flags/fr.svg',
      season: new Date().getFullYear(),
    },
    {
      id: 78,
      name: 'Bundesliga',
      country: 'Germany',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
      flag: 'https://media-4.api-sports.io/football/leagues/78.png',
      season: new Date().getFullYear(),
    },
    {
      id: 135,
      name: 'Serie A',
      country: 'Italy',
      logo: 'https://media-4.api-sports.io/football/leagues/135.png',
      flag: 'https://media-4.api-sports.io/flags/it.svg',
      season: new Date().getFullYear(),
    },
  ];
  selectedCountry: string | null = null;
  teams: any[] = [];
  standings: any; //Standings[]
  results: any;
  isHide: boolean = false;

  constructor(private service: FootballService) {}

  ngOnInit(): void {}
  selectCountry(country: any): void {
    this.selectedCountry = country;
    this.service.getStandings(country.id, country.season).subscribe((res) => {
      this.standings = res.response[0].league;
      console.log('Standings ', this.standings);
    });
  }

  teamresults(teamId: string) {
    this.service.getTeamResults(teamId).subscribe((results) => {
      console.log('Results', results);
      this.results = results?.response;
    });
    this.isHide = true;
  }

  goBack() {
    this.isHide = false;
  }
}