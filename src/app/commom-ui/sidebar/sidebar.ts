import { Component, inject } from '@angular/core';
import { Svg } from "../../common-ui/svg/svg";
import { SubscriberCard } from "../../common-ui/sidebar/subscriber-card/subscriber-card";
import { ProfileService } from '../../data/services/profile.service';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';
import { AsyncPipe } from '@angular/common'; 
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  imports: [Svg, SubscriberCard, RouterLink, AsyncPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me
  
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
       {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats'
    },
       {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }

}
