import { Component, effect, inject, ViewChild, viewChild } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { firstValueFrom, switchMap } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarUpload } from "./avatar-upload/avatar-upload";

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule, AvatarUpload],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPage {

  @ViewChild(AvatarUpload) avatarUploader!: AvatarUpload

  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  form = this.fb.group( {
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
    this.form.patchValue({
      ...this.profileService.me(),
      //@ts-ignore
    stack: this.mergeStack(this.profileService.me()?.stack)
    })
    });
  }

  ngAfterViewInit() {
    this.avatarUploader.avatar
  }

  onSave() {
    console.log('all OK!!!')
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }
    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,

      stack: this.splitStack(this.form.value.stack)
    }))
  }

  splitStack(stack: string | null | string[] | undefined) {
    if (!stack) return []
    if (Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
