import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeEdit'
})
export class TimeEditPipe implements PipeTransform {

  transform(timeStamp: number): string {

    if (timeStamp === 0) {
      return '00:00';
    } else {
      const hours = new Date(timeStamp).getHours();
      const minutes = new Date(timeStamp).getMinutes();

      return hours + ':' + minutes;
    }


  }

}
