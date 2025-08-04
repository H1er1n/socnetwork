import { Component, inject, signal } from '@angular/core';
import { ProfileCard } from "../../common-ui/profile-card/profile-card";
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileFilters } from "./profile-filters/profile-filters";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
protected readonly title = signal('socnetwork');
  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles


  constructor() {

  }
}
