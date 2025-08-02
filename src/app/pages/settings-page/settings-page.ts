import { Component, effect, inject } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { firstValueFrom, switchMap } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPage {

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
  onSave() {
    console.log('all OK!!!')
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return
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
