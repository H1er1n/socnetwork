import { Component, signal } from '@angular/core';
import { Svg } from "../../../common-ui/svg/svg";
import { Dnd } from '../../../common-ui/directives/dnd';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  imports: [Svg, Dnd],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss'
})
export class AvatarUpload {

  preview = signal<string>('/assets/imges/avatar-placeholder.png')
  avatar: File | null = null

  fileBroserHandler(event: Event) {
   const file = (event.target as HTMLInputElement)?.files?.[0]
    this.processFile(file)

  }

   onFileDropped(file: File) {
    this.processFile(file)

  }

  processFile(file: File | null | undefined) {

    if (!file || !file.type.match('image')) return

   const reader = new FileReader()
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
   }

    reader.readAsDataURL(file)
    this.avatar = file

  }
}
