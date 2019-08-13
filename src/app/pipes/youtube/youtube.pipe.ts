import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youtube'
})
export class YoutubePipe {

  constructor(
    private dom: DomSanitizer
  ) {
  }

  transform(value: string) {

    return this.dom.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed"+value)
  }

}
